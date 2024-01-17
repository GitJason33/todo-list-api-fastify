const corsOptions = {
  origin: JSON.parse(process.env.ALLOWED_CLIENTS),
}


module.exports = { corsOptions }