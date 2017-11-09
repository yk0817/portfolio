const formidable = require('formidable');
const randomstring = require("randomstring");
const path = require('path');
const fs = require('fs');

// generates something like 'b75c804505bc6305'
const randomHexString = () => randomstring.generate({
  length: 16,
  charset: 'hex'
});

// saves file from http request
function savePhotoFromRequest(req, callback) {
  const FS_PATH = 'C:/data/images/';
  const SERVER_BASE_URL = 'static.domain.com/images/';

  // parse files and fields from incoming form
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) throw err;
    const oldPath = files.fancyPhoto.path;
    const fileName = randomHexString() + path.extname(files.fancyPhoto.name);
    const newPath = FS_PATH + fileName;
    const photo = {
      label: fields.label,
      url: SERVER_BASE_URL + fileName
    };

    // save file
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err;
      callback(photo);
    });
  });
}

module.exports = { savePhotoFromRequest };
