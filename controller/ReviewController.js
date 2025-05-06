const { request, response } = require("express");
const ReviewSchema = require("../model/ReviewSchema");

const createReview = async (request, response) => {
  try {
    const {
      orderId,
      message,
      createdDate,
      userId,
      userName,
      ratings,
      products,
    } = request.body;
    if (
      !orderId ||
      !message ||
      !createdDate ||
      !userId ||
      !userName ||
      !ratings ||
      !products
    ) {
      return response.status(400).json({
        code: 400,
        message: "some fields are missing",
        error: null,
      });
    }
    const review = new ReviewSchema({
      orderId: orderId,
      message: message,
      createdDate: createdDate,
      userId: userId,
      userName: userName,
      ratings: ratings,
      products: products,
    });

    const saveData = await review.save();
    return response.status(200).json({
      code: 200,
      message: "review saved",
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
const findReviewById = async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({
        code: 400,
        message: "id required",
        error: null,
      });
    }
    const reviewData = ReviewSchema.findById(
      {_id: request.params.id}
    )
    return response.status(200).json({
      code: 200,
      message: "review data found",
      data: reviewData,
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};
const findAllReviews = async (request, response) => {
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

    const reviewList = await CountrySchema.find(query).limit(pageSize);
    return response.status(200).json({
      code: 200,
      message: "review data",
      data: { list: reviewList },
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};
const updateReview = async (request, response) => {
  try {
      const {
        message,
        ratings
      } = request.body;
      if (!request.params.id) {
        return response.status(400).json({
          code: 500,
          message: "id required",
          error: null,
        });
      }
      if (!message || !ratings) {
        return response.status(400).json({
          code: 500,
          message: "some fields are missing",
          error: null,
        });
      }
      const updateData = ReviewSchema.findByIdAndUpdate(
        { _id: request.params.id },
        {
          $set: {
            message:message,
            ratings:ratings,
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
const deleteReview = async (request, response) => {
  try {
      if (!request.params.id) {
        return response.status(400).json({
          code: 400,
          message: "id missing",
          error: null,
        });
      }
      const deleteReview = await ReviewSchema.findByIdAndDelete({
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
  createReview,
  findReviewById,
  findAllReviews,
  updateReview,
  deleteReview,
};
