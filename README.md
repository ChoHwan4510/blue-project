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
├── front-blue/ # React 앱
├── back-blue/ # NestJS API
├── ai-module/ # AI 이미지 분류 모듈 (Python 기반)
│   ├── infer.py # 이미지 추론
│   ├── model.pt # 모델 가중치 파일 (하단 설명 참조)
│   ├── labels.txt # 캐릭터 태그 리스트
│   ├── train.py # 재학습 스크립트
│   ├── persona_prompts.json # 캐릭터 별 대화 프롬프트
│   └── requirements.txt # Python 의존성
├── Dockerfile
├── docker-compose.yml
└── README.md
```


## 🚀 설치 및 실행

### 1. 프로젝트 클론

```bash
git clone https://github.com/your-username/project-name.git
cd project-name

#docker로 실행
docker-compose up --build -d
```
- React: http://localhost:6974
- NestJs API도 같은 포트에서 제공


## 🔍주 명령어

```bash
npm run dev #React 개발 서버실행

npm run start:dev #NestJs 개발서버 실행

docker-compose up #전체 앱 컨테이너 실행
```

## 📌기타 참고 사항
- ```.env```파일을 통해 환경변수 설정 가능
- NestJs는 에서 모든 라우팅은 React ```index.html```로 리다이렉트 (SPA)

## 📦 모델 가중치 파일 안내 (`model.pt`)
- `model.pt`는 용량이 커서 GitHub에는 포함되지 않습니다.
- 아래 링크에서 다운로드한 후, `ai-module/model.pt` 위치에 수동으로 넣어주세요.
- Google Drive 링크: 

## ✍️ 프로젝트 참여
- HwanRyang - cagameku3842@naver.com
- solbeing - mhj1527@gmail.com







