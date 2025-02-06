const db = require('../config/db');

const getServices = () => {
  return new Promise((resolve, reject) => {

    db.query('SELECT service_code, service_name, service_icon, service_tariff FROM services', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { getServices };
