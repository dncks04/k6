# CI/CD + Docker + k6 부하테스트 데모

GitHub Actions, Docker, k6를 연동해 **부하테스트까지 통과해야 배포되는 CI/CD 파이프라인**을 구현한 실습 프로젝트입니다.

## 파일 구조

```
cicd-k6-demo/
├── src/
│   └── index.js              # Express API
├── tests/
│   └── app.test.js           # Jest 단위 테스트
├── .github/
│   └── workflows/
│       └── ci-cd.yml         # CI/CD 파이프라인 정의
├── Dockerfile                # 멀티스테이지 빌드
├── docker-compose.yml        # 로컬에서 app + k6 같이 실행
├── load-test.js              # k6 부하테스트 스크립트
├── package.json
├── .gitignore
└── .dockerignore
```

## 로컬 실행 방법

### 1. 의존성 설치 & 단위 테스트
```bash
npm install
npm test
```

### 2. Docker 이미지 빌드 & 실행
```bash
docker build -t cicd-k6-demo .
docker run -d -p 3000:3000 --name app cicd-k6-demo
curl http://localhost:3000/api/health
```

### 3. k6 부하테스트 (k6 CLI 로컬 설치 시)
```bash
k6 run load-test.js
```

### 4. docker-compose로 한 번에 실행 (앱 + k6)
```bash
docker-compose up --build
```

## GitHub Actions 세팅

레포 Settings → Secrets and variables → Actions에서 아래 2개 등록 필요:

| Secret 이름 | 값 |
|------------|-----|
| `DOCKERHUB_USERNAME` | Docker Hub 아이디 |
| `DOCKERHUB_TOKEN` | Docker Hub Access Token |

`main` 브랜치에 push하면 자동으로:
1. Docker 이미지 빌드 + 단위 테스트
2. k6 부하테스트 (응답시간 p95 < 300ms, 에러율 < 1%)
3. 통과 시에만 Docker Hub에 이미지 push

부하테스트 기준을 못 넘기면 3단계는 실행되지 않습니다.
