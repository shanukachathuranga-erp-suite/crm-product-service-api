const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const serverPort = process.env.SERVER_PORT || 3004; // Use port from env or default to 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//========================
const CategoryRoute = require('./route/CategoryRoute');
const CountryRoute = require('./route/CountryRoute');
const DiscountRoute = require('./route/DiscountRoute');
const ReviewRoute = require('./route/ReviewRoute');
//========================

try {

  mongoose.connect(`${process.env.DATABASE_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
  app.listen(serverPort, () => {
    console.log(`server up & running on port ${serverPort}`);
  });

} catch (e) {
  console.log(e);
}

app.get("/test-api", (req, res) => {
  return res.json({ message: "Hi the server is working" });
});

//========================
app.use('/api/v1/categories', CategoryRoute);
app.use('/api/v1/countries',CountryRoute);
app.use('/api/v1/discount',DiscountRoute);
app.use('/api/v1/review',ReviewRoute);
//========================

