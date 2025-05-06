const { request, response } = require("express");
const DiscountSchema = require("../model/DiscountSchema");
const createDiscount = async (request, response) => {
  try {
    const { discountName, percentage, startDate, endDate } = request.body;
    if (!discountName || !percentage || !startDate || !endDate) {
      return response.status(400).json({
        code: 400,
        message: "some fields are missing",
        error: null,
      });
    }

    const discount = new DiscountSchema({
      discountName: discountName,
      percentage: percentage,
      startDate: startDate,
      endDate: endDate,
    });

    const saveData = await discount.save();
    return response.status(200).json({
      code: 200,
      message: "discount saved",
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

const findDiscountById = async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({
        code: 400,
        message: "id required",
        error: null,
      });
    }

    const discountData = await DiscountSchema.findById({
      _id: request.params.id,
    });
    return response.status(200).json({
      code: 200,
      message: "discount data found",
      data: discountData,
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};

const findAllDiscounts = async (request, response) => {
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

    const discountList = await CountrySchema.find(query).limit(pageSize);
    return response.status(200).json({
      code: 200,
      message: "discount data",
      data: { list: discountList },
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};

const updateDiscount = async (request, response) => {
  try {
    const { discountName, percentage, startDate, endDate } = request.body;
    if (!request.params.id) {
      return response.status(400).json({
        code: 500,
        message: "id required",
        error: null,
      });
    }
    if (!discountName || !percentage || !startDate || !endDate) {
      return response.status(400).json({
        code: 400,
        message: "some fields are missing",
        error: null,
      });
    }
    const updateData = DiscountSchema.findByIdAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          discountName: discountName,
          percentage: percentage,
          startDate: startDate,
          endDate: endDate,
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

const deleteDiscountById = async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({
        code: 400,
        message: "id missing",
        error: null,
      });
    }
    const deleteDiscount = await DiscountSchema.findByIdAndDelete({
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
  createDiscount,
  findAllDiscounts,
  findDiscountById,
  updateDiscount,
  deleteDiscountById,
};
