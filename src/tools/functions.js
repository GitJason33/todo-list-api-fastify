const jwt = require('jsonwebtoken');


const createJWToken = function (user_id) {
  const payload = {
    id: toInt(user_id)
  }

  const token = jwt.sign(payload, process.env.jwtSecret, {
    expiresIn: "7d"
  });

  return token;
}



const toInt = function (num, fallback = 0){
  const n = parseInt(num);
  return isNaN(n) ? fallback : n;
}


module.exports = {
  createJWToken,
  toInt,
}