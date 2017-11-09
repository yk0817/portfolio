const express = require('express');
const photoModel = require('../model/photo');
const { savePhotoFromRequest } = require('../util');
const router = express.Router();

// export our router to be mounted by the parent application
module.exports = router;

// get one random photo - GET /photo/random
router.get('/random', async (req, res) => {
  try {
    const photo = await photoModel.getRandom();
    res.send(photo);
  } catch (e) {
    console.error(e);
    res.status(500).send('something went wrong');
  }
});

// get photos list - GET /photo/
// all photos unless 'from' parameter is specified
router.get('/', async (req, res) => {
  const offset = 0 || req.query.from;
  try {
    // get first 5 photos, starting from 'offset'
    const photos = await photoModel.get(5, offset);
    res.send(photos);
  } catch (e) {
    console.error(e);
    res.status(500).send('something went wrong');
  }
});

// photo upload - POST /photo/
router.post('/', (req, res) => {
  savePhotoFromRequest(req, (photo) => {
    // add new photo to the database
    try {
      photoModel.add(photo);
    } catch (e) {
      console.error(e);
      res.status(500).send('something went wrong');
    }
  });

  res.end();
});
