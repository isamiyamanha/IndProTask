const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
dialect: 'sqlite',
storage: 'todoapp.sqlite'
});

module.exports = sequelize;
