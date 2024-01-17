const AppError = require('../tools/AppError.js');
const jwt = require("jsonwebtoken");


const ErrorHandler = (err, req, reply) => {
  if(err instanceof AppError)
    reply.code(err.status).send(err.message);

  else if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError)
    reply.code(401).send("Unauthorized, you are logged out");

  else
    reply.code(500).send(`Server error: ${err}`);
}

module.exports = ErrorHandler;