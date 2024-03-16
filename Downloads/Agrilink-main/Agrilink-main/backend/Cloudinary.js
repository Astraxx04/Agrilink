const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'anjali27cloud',
  api_key: '876231847267227',
  api_secret: 'rdjcROKicIs7sOql3xuJFp1sVnM'
});

module.exports = cloudinary;