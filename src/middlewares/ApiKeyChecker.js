const AppError = require('../tools/AppError.js');


function APIKeyChecker(req, reply, done){
  if(req.headers["api-key"] !== process.env.API_KEY)
    done(new AppError(403, "Access denied!"));

  else
    done();
}


module.exports = APIKeyChecker;