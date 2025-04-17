const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { syncDb } = require('./models');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = 3000;
app.listen(PORT, async () => {
await syncDb();
console.log(`Server running on http://localhost:${PORT}`);
});
