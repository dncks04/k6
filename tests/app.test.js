const request = require('supertest');
const app = require('../src/index');

describe('GET /api/health', () => {
  test('200 상태코드와 status: ok를 반환해야 한다', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /api/hello', () => {
  test('200 상태코드와 메시지를 반환해야 한다', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });
});
