const mongoose = require("mongoose");
const DiscountSchema = new mongoose.Schema({
  discountName: {
    type: String,
    require: true,
  },

  percentage: {
    type: Number,
    require: true,
  },

  startDate: {
    type: Date,
    require: true,
  },

  endDate: {
    type: Date,
    require: true,
  },

  lastUpdate: {
    type:Date
  }

});

module.exports = mongoose.model('discounts', DiscountSchema);
