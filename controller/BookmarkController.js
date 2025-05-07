const { request, response } = require("express");
const BookmarkSchema = require("../model/BookmarkSchema");

const createBookmark = async (request, response) => {
  try {
    const { userId, createdDate, productId } = request.body;
    if (!userId || !createdDate || !productId) {
      return response.status(400).json({
        code: 400,
        message: "some fields are missing",
        data: null,
      });
    }

    const bookmark = new BookmarkSchema({
      userId: userId,
      productId: productId,
      createdDate: createdDate,
    });

    const saveData = await bookmark.save();
    return response.status(201).json({
      code: 201,
      message: "bookmark has been saved",
      data: saveData,
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};

const findBookmarkById = async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({
        code: 400,
        message: "id required",
        error: null,
      });
    }
    const bookmarkData = await BookmarkSchema.findById({
      _id: request.params.id,
    });
    return response.status(200).json({
      code: 200,
      message: "bookmark data found",
      data: bookmarkData,
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};

const findAllBookmarks = async (request, response) => {
  try {
    const { searchText, page = 1, size = 10 } = request.query;
    const pageIndex = parseInt(page);
    const pageSize = parseInt(size);

    const query = {};
    if (searchText) {
      query.$text = {
        $search: searchText,
      };
    }

    const skip = (pageIndex - 1) * pageSize;

    const bookmarkList = await BookmarkSchema.find(query)
      .limit(pageSize)
      .skip(skip);
    return response.status(200).json({
      code: 200,
      message: "bookmark data",
      data: { list: bookmarkList },
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};

const updateBookmark = async (request, response) => {
  try {
    const { userId, productId, createdDate } = request.body;
    if (!request.params.id) {
      return response.status(400).json({
        code: 400,
        message: "id required",
        error: null,
      });
    }

    if (!userId || !productId || !createdDate) {
      return response.status(400).json({
        code: 400,
        message: "some fields are missing",
        error: null,
      });
    }
    const updateData = await BookmarkSchema.findByIdAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          userId: userId,
          createdDate: createdDate,
          productId: productId,
        },
      },
      { new: true }
    );
    return response.status(200).json({
      code: 200,
      message: "updated",
      data: updateData,
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};

const deleteBookmark = async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({
        code: 400,
        message: "id missing",
        error: null,
      });
    }
    const deleteBookmark = await BookmarkSchema.findByIdAndDelete({
      _id: request.params.id,
    });
    return response.status(200).json({
      code: 200,
      message: "deleted",
      error: deleteDiscount,
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};

module.exports = {
  createBookmark,
  findAllBookmarks,
  findBookmarkById,
  updateBookmark,
  deleteBookmark,
};
