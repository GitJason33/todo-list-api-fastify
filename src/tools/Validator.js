const { compareSync } = require('bcryptjs');

const AppError = require("./AppError.js");
const { isName, isPassword, isEmail, isTitle, isPriority } = require("./ValidInput.js");


class UserValidator{
  static registerData({ name, password, email }){
    if (!isName(name) || !isPassword(password) || !isEmail(email))
      throw new AppError(400, 'Please provide a valid name, email and password to register');
  }



  static loginData({ email, password }){
    if(!isEmail(email) || !isPassword(password))
      throw new AppError(400, 'Please provide a valid email and password to login');
  }



  static correctLoginCredentials({ user, givenPassword }){
    if(!user || !compareSync(givenPassword, user.password))
      throw new AppError(400, "Incorrect email or password");
  }



  static alreadyExists(user){
    if(user)
      throw new AppError(409, 'A user with the same email already exists');
  }



  static notFound(user){
    if(!user)
      throw new AppError(404, "User not found");
  }



  static notLoggedIn(token){
    if(!token)
      throw new AppError(401, "Unauthorized, you are logged out");
  }
}



class TaskValidator {
  static todoData({ title, priority }){
    if(!isTitle(title))
      throw new AppError(400, "Please provide a valid title with a size lower than 200");

    if(priority && !isPriority(priority))
      throw new AppError(400, "Please provide a valid priority: low, medium or high");
  }



  static notFound(todo){
    if(!todo)
      throw new AppError(404, "Todo not found");
  }
}


module.exports = { UserValidator, TaskValidator };