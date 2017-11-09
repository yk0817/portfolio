const db = require('../db-orm');
const Sequelize = require('sequelize');

const photoModel = db.define('photo', {
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

class Photo {
  constructor(label, url) {
    this.label = label;
    this.url = url;
  }

  // reset table (removes all data!)
  // async createTable() { await photoModel.sync({force: true}) };

  static async add(photo) {
    await photoModel.create(photo);
  }

  static async get (n, from) {
    const result = await photoModel.findAll({
      order: ['id'],
      offset: from,
      limit: n
    });
    const photos = result.map(p => p.toJSON());
    return photos;
  }

  static async getRandom(n) {
    const result = await photoModel.findOne({
      order: [
        Sequelize.fn('random')
      ]
    });

    return result.toJSON();
  }
}

module.exports = Photo;
