const UserModel = require("../models/user-model");
const { UserValidator } = require('../tools/Validator');
const { createJWToken } = require("../tools/functions");


class UserController {
  /**
   * route:  GET /user/info
   * desc:   retrieve logged-in user info
   * access: PRIVATE
   */
  static getUser(req, reply){
    const user = { ...req.user };
    delete user.password;

    console.log('GET /user/info')

    reply.send(user);
  }



  /**
   * route:  POST /user/login
   * desc:   login a user
   * access: PUBLIC (with correct credentials)
   */
  static async loginUser(req, reply) {
    console.log('POST /user/login')

    const { email, password } = req.body;
    UserValidator.loginData(req.body);


    const user = await UserModel.findByEmail(email);
    UserValidator.correctLoginCredentials({
      user,
      givenPassword: password
    });
    delete user.password;


    const token = createJWToken(user['_id']);
    reply.code(200).send({ token, user });
  }



  /**
   * route:  POST /user/register
   * desc:   create new user
   * access: PUBLIC
   */
  static async registerUser(req, reply) {
    console.log('POST /user/register')

    const { email } = req.body;
    UserValidator.registerData(req.body);


    const alreadyUser = await UserModel.findByEmail(email);
    UserValidator.alreadyExists(alreadyUser);


    const user = await UserModel.register(req.body);
    delete user.password;


    const token = createJWToken(user['_id']);
    reply.code(201).send({token, user});
  }
}


module.exports = UserController;