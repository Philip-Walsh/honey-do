import request from 'supertest';
import server from 'src/server';

// Mock the data module
jest.mock('src/data', () => ({
  initDb: jest.fn(),
  todosDb: {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn(),
    insertOne: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  },
}));

describe('Server', () => {
  afterAll(() => {
    // server.close(); // Server is not started when imported
  });

  it('should respond with 404 for unknown routes', async () => {
    const response = await request(server.getApp()).get('/unknown-route');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Not Found');
  });

  it('should handle CORS headers', async () => {
    const response = await request(server.getApp()).options('/');
    expect(response.headers).toHaveProperty('access-control-allow-origin', '*');
  });

  it('should use the API routes', async () => {
    const response = await request(server.getApp()).get('/');
    expect(response.status).toBe(200);
  });
});
