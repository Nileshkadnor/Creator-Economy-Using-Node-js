const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone_number: { type: Number, required: true, unique: true },
  priority: { type: Number, required: true, default: 2 },
});

const User = mongoose.model('User', userSchema);

// Task Model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  due_date: { type: Date, required: true },
  priority: { type: Number, required: true, default: 2 },
  status: { type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE'], default: 'TODO' },
  deleted_at: { type: Date },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

const Task = mongoose.model('Task', taskSchema);

// Subtask Model
const subTaskSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Task' },
  status: { type: Number, required: true, default: 0 }, // 0 - incomplete, 1 - complete
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date },
});

const SubTask = mongoose.model('SubTask', subTaskSchema);

module.exports = { User, Task, SubTask };
