const { Task } = require('../models');

exports.createTask = async (req, res) => {
  const { title, category, dueDate, priority } = req.body;
  const task = await Task.create({ 
    title, 
    category, 
    dueDate, 
    priority, 
    userId: req.user.id 
  });
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, category, completed, dueDate, priority } = req.body;
  const task = await Task.findByPk(id);

  if (!task || task.userId !== req.user.id) return res.sendStatus(404);

  if (title !== undefined) task.title = title;
  if (category !== undefined) task.category = category;
  if (completed !== undefined) task.completed = completed;
  if (dueDate !== undefined) task.dueDate = dueDate;
  if (priority !== undefined) task.priority = priority;

  await task.save();
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);

  if (!task || task.userId !== req.user.id) return res.sendStatus(404);

  await task.destroy();
  res.json({ message: 'Task deleted' });
};
