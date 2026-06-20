import http from 'k6/http';
import { check, sleep } from 'k6';

// 부하 단계 정의: 20초간 20명까지 증가 -> 30초간 50명 유지 -> 10초간 0명으로 감소
export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '30s', target: 50 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<300'], // 응답시간 95%가 300ms 이내여야 통과
    http_req_failed: ['rate<0.01'],   // 에러율 1% 미만이어야 통과
  },
};

export default function () {
  const res = http.get('http://localhost:3000/api/health');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
