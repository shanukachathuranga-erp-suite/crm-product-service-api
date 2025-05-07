const express = require("express");
const BookmarkController = require("../controller/BookmarkController");
const router = express.Router();

router.post("/create-bookmark", BookmarkController.createBookmark);
router.get("/find-bookmark-by-id/:id", BookmarkController.findBookmarkById);
router.get("/find-all-bookmarks", BookmarkController.findAllBookmarks);
router.put("/update-bookmark/:id", BookmarkController.updateBookmark);
router.delete("/delete-bookmark/:id", BookmarkController.deleteBookmark);

module.exports = router;
