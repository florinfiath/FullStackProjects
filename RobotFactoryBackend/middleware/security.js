exports.setCors = (req, res, next) => {
  // set header in the response for CORS Settings
  // allow http://localhost:3000 to access my backend

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  // localhost:3000 can only send these headers with the request

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept"
  );

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // next will delegate the request to my router
 next()
}   
