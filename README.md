# 블루아카이브 팬아트 분류 앱

AI 모듈을 이용한 블루아카이브 팬아트 모듈앱

## 📦 기술 스택

- 백엔드 : NestJS 11.0.1
- 프론트엔드 : React 19.1.0
- AI 모듈 : Python 3.13, PyTorch, CLIP ViT-B/32
- 데브옵스 : Docker, Docker Compose

## 📁 프로젝트 구조
```
project-root/
├── blue-front/ # React 앱
├── blue-back/ # NestJS API
├── blue-ai-module/ # AI 이미지 분류 모듈 (Python 기반)
│   ├── infer.py # 이미지 추론
│   ├── labels.txt # 캐릭터 라벨 리스트
│   ├── tags.txt # 캐릭터 태그 리스트
│   ├── train.py # 모델 학습 코드
│   ├── model.pt # 모델 가중치 파일 (하단 설명 참조)
│   ├── persona_prompts.json # 캐릭터 별 대화 프롬프트
│   └── requirements.txt # Python 라이브러리
├── Dockerfile
├── docker-compose.yml
└── README.md
```


## 🚀 설치 및 실행

### 1. 프로젝트 클론

```bash
git clone https://github.com/ChoHwan4510/blue-project.git
cd project-name

#docker로 실행
docker-compose up --build -d
```
- React: http://localhost:6974
- NestJs API도 같은 포트에서 제공

### 2. AI 모듈 실행 준비

AI 이미지 분류 모듈(blue-ai-module)은 PyTorch 및 CLIP 기반으로 작성되어 있으며, 다음 명령어로 필요한 라이브러리를 설치할 수 있습니다.

```bash
# blue-ai-module 디렉토리로 이동
cd blue-ai-module

# Python 라이브러리 설치
pip install -r requirements.txt

# torch만 따로 설치(cpu 사용 버전)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# 분류기 실행 명령어 예시
python infer.py --image_dir "분류할 폴더 경로명" --output_dir "분류 후 저장할 경로명"
```

## 🔍주 명령어

```bash
npm run dev #React 개발 서버실행

npm run start:dev #NestJs 개발서버 실행

docker-compose up #전체 앱 컨테이너 실행
```

## 📌기타 참고 사항
- ```.env```파일을 통해 환경변수 설정 가능
- NestJs는 에서 모든 라우팅은 React ```index.html```로 리다이렉트 (SPA)

## 📦 모델 가중치 파일 안내 (model.pt)
- model.pt는 용량이 커서 GitHub에는 포함되지 않습니다.
- 아래 링크에서 다운로드한 후, ai-module/model.pt 위치에 수동으로 넣어주세요.
- Google Drive 링크:

## ✍️ 프로젝트 참여
- HwanRyang - cagameku3842@naver.com
- solbeing - mhj1527@gmail.com







