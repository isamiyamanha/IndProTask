const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
const { username, password } = req.body;
const hashedPwd = await bcrypt.hash(password, 10);
try {
    await User.create({ username, password: hashedPwd });
    res.json({ message: 'User created!' });
} catch {
    res.status(400).json({ message: 'Username already exists' });
}
};

exports.login = async (req, res) => {
const { username, password } = req.body;
const user = await User.findOne({ where: { username } });
if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
}
const token = jwt.sign({ id: user.id }, 'secretkey');
res.json({ token });
};
