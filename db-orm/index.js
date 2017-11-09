const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = new Sequelize('portfoliodb', 'valera', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: { $and: Op.and }
});

module.exports = sequelize;
