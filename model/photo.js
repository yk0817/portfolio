const db = require('../db-orm');
const Sequelize = require('sequelize');

const Photo = db.define('photo', {
  id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  label: {
      type: Sequelize.STRING
  },
  url: {
      type: Sequelize.STRING
  }
});

// recreate table
// (async () => await Photo.sync({force: true}))();

const add = async function (photo) {
    await Photo.create(photo);
}

const get = async function (n, from) {
    const result = await Photo.findAll({
      order: ['id'],
      offset: from,
      limit: n
    });
    const photos = result.map(p => p.toJSON());
    return photos;
}

const getRandom = async function (n) {
    const result = await Photo.findOne({
      order: [
        Sequelize.fn('random')
      ]
    });

    return result.toJSON();
}

module.exports = { add, get, getRandom };
