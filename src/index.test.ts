import request from 'supertest';
import app from './index';

describe('Simple API Tests', () => {
  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('environment');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('environment');
    });

    it('should return numeric uptime', async () => {
      const response = await request(app).get('/health');
      
      expect(typeof response.body.uptime).toBe('number');
      expect(response.body.uptime).toBeGreaterThanOrEqual(0);
    });
  });

  describe('GET /api/message', () => {
    it('should return API message', async () => {
      const response = await request(app).get('/api/message');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('version', '1.0.0');
    });

    it('should include environment in data', async () => {
      const response = await request(app).get('/api/message');
      
      expect(response.body.data).toHaveProperty('environment');
    });
  });

  // Example of a failed test case (commented out)
  // Uncomment this to see a test failure in GitHub Actions
  
  describe('Failing Test Example', () => {
    it('should fail intentionally for demo purposes', async () => {
      const response = await request(app).get('/');
      
      // This will fail because we expect 'wrong message'
      expect(response.body.message).toBe('wrong message');
    });
  });
  
});
