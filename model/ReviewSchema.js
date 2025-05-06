const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
  orderId: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
  },
  ratings: {
    type: Number,
    require: true,
  },
  products: {
    type: Object,
    require: true,
  },
});

module.exports = mongoose.model('review',ReviewSchema);
