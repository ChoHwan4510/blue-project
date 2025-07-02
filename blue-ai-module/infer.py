import os
import torch
import clip
from PIL import Image
import shutil
import csv
from tqdm import tqdm
import argparse

# 명령줄 인자 처리
parser = argparse.ArgumentParser(description="CLIP 기반 이미지 폴더 분류기")
parser.add_argument("--image_dir", type=str, default="unsorted", help="이미지가 있는 폴더 경로")
parser.add_argument("--labels", type=str, default="labels.txt", help="CLIP 라벨(캐릭터명 리스트) 파일")
parser.add_argument("--tags", type=str, default="tags.txt", help="폴더명 리스트 파일")
parser.add_argument("--output_dir", type=str, default="sorted", help="분류 결과 저장 폴더")
parser.add_argument("--output_csv", type=str, default="result.csv", help="결과 CSV 파일 경로")
parser.add_argument("--threshold", type=float, default=0.3, help="신뢰도 임계값")
args = parser.parse_args()

# 환경 설정
IMAGE_DIR = args.image_dir
LABEL_FILE = args.labels
TAG_FILE = args.tags
OUTPUT_DIR = args.output_dir
CSV_OUTPUT = args.output_csv
CONFIDENCE_THRESHOLD = args.threshold

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# 텍스트 파일 불러오기 (주석, 빈 줄 필터링)
def load_texts(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return [
            line.strip()
            for line in f
            if line.strip() and not line.strip().startswith("#")
        ]

label_texts = load_texts(LABEL_FILE)
folder_tags = load_texts(TAG_FILE)

assert len(label_texts) == len(folder_tags), "❌ labels.txt와 tags.txt 줄 수가 일치해야 합니다."

# 분류 대상 폴더 생성
for tag in folder_tags + ["unknown"]:
    os.makedirs(os.path.join(OUTPUT_DIR, tag), exist_ok=True)

# 텍스트 임베딩
with torch.no_grad():
    text_tokens = clip.tokenize(label_texts).to(device)
    text_features = model.encode_text(text_tokens)
    text_features /= text_features.norm(dim=-1, keepdim=True)

# 이미지 분류
results = []
image_files = [f for f in os.listdir(IMAGE_DIR) if f.lower().endswith((".jpg", ".jpeg", ".png"))]

for filename in tqdm(image_files, desc="🔍 이미지 분류 중"):
    try:
        image_path = os.path.join(IMAGE_DIR, filename)
        image = preprocess(Image.open(image_path).convert("RGB")).unsqueeze(0).to(device)

        with torch.no_grad():
            image_features = model.encode_image(image)
            image_features /= image_features.norm(dim=-1, keepdim=True)
            similarity = (100.0 * image_features @ text_features.T).softmax(dim=-1)
            confidence, index = similarity[0].max(0)

        conf_val = round(confidence.item(), 4)

        if conf_val >= CONFIDENCE_THRESHOLD:
            label = label_texts[index]
            tag = folder_tags[index]
        else:
            label = "unknown"
            tag = "unknown"

        shutil.copy(image_path, os.path.join(OUTPUT_DIR, tag, filename))

        results.append({
            "filename": filename,
            "predicted_label": label,
            "predicted_tag": tag,
            "confidence": conf_val
        })

    except Exception as e:
        print(f"❌ {filename} 처리 오류: {e}")

# ------------------------------
# 결과 CSV 저장
# ------------------------------
with open(CSV_OUTPUT, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["filename", "predicted_label", "predicted_tag", "confidence"])
    writer.writeheader()
    writer.writerows(results)

print(f"\n✅ 분류 완료: {len(results)}개 이미지 → {CSV_OUTPUT} 저장됨")