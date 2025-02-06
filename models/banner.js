const db = require('../config/db');

const getBanners = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT banner_name, banner_image, description FROM banners', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { getBanners };
