const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Task, SubTask } = require('./models');
const cron = require('node-cron');
const twilio = require('twilio');

const app = express();

// Middleware
app.use(express.json());
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.user_id);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

// Create Task
app.post('/tasks', async (req, res) => {
  const { title, description, due_date } = req.body;
  const task = new Task({ title, description, due_date, user_id: req.user._id });
  await task.save();
  res.json(task);
});

// Create Subtask
app.post('/tasks/:taskId/subtasks', async (req, res) => {
  const { taskId } = req.params;
  const subTask = new SubTask({ task_id: taskId });
  await subTask.save();
  res.json(subTask);
});

// Get User Tasks
const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Task, SubTask } = require('./models');
const cron = require('node-cron');
const twilio = require('twilio');

const app = express();

// Middleware
app.use(express.json());
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.user_id);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

// Create Task
app.post('/tasks', async (req, res) => {
  const { title, description, due_date } = req.body;
  const task = new Task({ title, description, due_date, user_id: req.user._id });
  await task.save();
  res.json(task);
});

// Create Subtask
app.post('/tasks/:taskId/subtasks', async (req, res) => {
  const { taskId } = req.params;
  const subTask = new SubTask({ task_id: taskId });
  await subTask.save();
  res.json(subTask);
});

// Get User Tasks
app.get('/tasks', async (req, res) => {
  const { priority, due_date, page, limit } = req.query;
  const query = { user_id: req.user._id, deleted_at: null };
  if (priority) query.priority = priority;
  if (due_date) {
    const today = new Date();
    if (due_date === 'today') query.due_date = { $gte: today, $lte: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1) };
    else if (due_date === 'tomorrow') query.due_date = { $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1), $lte: new Date(today.getFullYear(), today.getMonth(), today
