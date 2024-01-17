// enable environment variables
require('dotenv').configDotenv();

const fastify = require('fastify');
const cors = require('@fastify/cors');

const ErrorHandler = require('./src/middlewares/ErrorHandler');
const APIKeyChecker = require("./src/middlewares/ApiKeyChecker");
const { corsOptions } = require("./src/middlewares/MiddieOptions");

const Routes = require('./src/routes');



const app = fastify();
const PORT = process.env.PORT ?? 12_000;


// global middlewares
app.addHook('onRequest', APIKeyChecker);
app.register(cors, corsOptions);
app.setErrorHandler(ErrorHandler);


// api routes
app.register(Routes);


app.listen({
  port: PORT,
}, (err, addr) => {
  if(err) console.error(err.message);

  console.log(`API running on ${addr}`);
})