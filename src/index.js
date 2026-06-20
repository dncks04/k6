const express = require('express');
const app = express();

// 헬스체크 엔드포인트 — k6 부하테스트가 이 엔드포인트를 두드립니다.
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 간단한 예시 엔드포인트 (필요시 확장용)
app.get('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello from cicd-k6-demo!' });
});

const PORT = process.env.PORT || 3000;

// 테스트 환경(jest+supertest)에서는 서버를 직접 listen하지 않도록 분리
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
  });
}

module.exports = app;
