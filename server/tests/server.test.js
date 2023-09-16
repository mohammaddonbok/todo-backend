const request = require('supertest');
const express = require('express');
const taskRoutes = require('../routes/tasks.route');
const app = express();
const { createTask } = require('../controller/tasks.controller');

jest.mock('express');
const mockExpress = require('express');
const mockRouter = {
  post: jest.fn(),
};
const mockApp = {
    use: jest.fn()
};
mockExpress.Router.mockImplementation(() => mockRouter);
mockExpress.mockReturnValue(mockApp);

app.use(express.json());
app.use('/api/tasks', taskRoutes);

describe('POST /api/tasks', () => {
    it('should create a new task with title and description', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'This is a test task description',
      };
  
      const req = {
        body: taskData,
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await createTask(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'New Task Created'
      });
    },10000)
    });