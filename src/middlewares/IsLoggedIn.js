const jwt = require('jsonwebtoken');
const UserModel = require('../models/user-model.js');

const { UserValidator } = require('../tools/Validator');


async function isLoggedIn(req) {
  const token = req.headers['x-auth-token'];
  UserValidator.notLoggedIn(token);


  const decodedToken = jwt.verify(token, process.env.jwtSecret);
  const user_id = decodedToken.id;


  const user = await UserModel.findById(user_id);
  UserValidator.notFound(user);


  req.user = user;
}


module.exports = isLoggedIn;
