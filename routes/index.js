const photos = require('./photos');

module.exports = (app) => {
  app.get('/', function (req, res) {
    console.log('here');
  })
  app.use('/photos', photos)
};
