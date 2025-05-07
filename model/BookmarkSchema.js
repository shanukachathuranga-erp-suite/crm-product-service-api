const mongoose = require("mongoose");
const BookmarkSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    require: true,
  },
  products: {
    type: Object,
    require: true,
  },
});
module.exports = mongoose.model("bookmarks", BookmarkSchema);
