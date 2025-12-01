import { errorHandler } from 'src/middlewares/error-handler';
import { Request, Response, NextFunction } from 'express';

describe('Error Handler Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { method: 'GET' };
    res = {
      statusCode: 200,
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should handle errors and return 500 for unexpected success status', () => {
    const err = new Error('Test error');
    errorHandler(err, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Error: Test error' }));
  });

  it('should return original status if it is an error status', () => {
    const err = new Error('Test error');
    res.statusCode = 400;
    errorHandler(err, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Error: Test error' }));
  });
});
