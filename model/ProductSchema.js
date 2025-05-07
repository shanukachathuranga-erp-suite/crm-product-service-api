const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  actualPrice: {
    type: Number,
    require: true,
  },
  oldPrice: {
    type: Number,
  },
  qty: {
    type: Number,
  },
  description: {
    type: String,
  },
  images: {
    type: Array,
  },
  discount: {
    type: Object,
  },
  category: {
    type: Object,
  },
});

module.exports = mongoose.model("products", ProductSchema);
