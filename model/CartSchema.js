const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
  },
  productId: {
    type: Object,
  },
  qty: {
    type: Number,
  },
});

module.exports = mongoose.model("carts", CartSchema);
