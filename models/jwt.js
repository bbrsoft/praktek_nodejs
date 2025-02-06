const db = require('../config/db');

const getjwtByToken = (token) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM jwt_tokens WHERE token = ?', [token], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};

module.exports = { getjwtByToken };
