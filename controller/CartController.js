const { request, response } = require("express");
const CartSchema = require("../model/CartSchema");

const createCart = async (request, response) => {
  try {
    const { userId, createdDate, productId, qty } = request.body;
    if (!userId || !createdDate || !productId || !qty) {
      return response.status(400).json({
        code: 400,
        message: "some fields are missing",
        data: null,
      });
    }

    const cart = new CartSchema({
      userId: userId,
      productId: productId,
      createdDate: createdDate,
    });

    const saveData = await cart.save();
    return response.status(201).json({
      code: 201,
      message: "Cart has been saved",
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

const findCartById = async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({
        code: 400,
        message: "id required",
        error: null,
      });
    }
    const cartData = await CartSchema.findById({
      _id: request.params.id,
    });
    return response.status(200).json({
      code: 200,
      message: "discount data found",
      data: cartData,
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};

const findAllCarts = async (request, response) => {
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

    const cartList = await CartSchema.find(query).limit(pageSize).skip(skip);
    return response.status(200).json({
      code: 200,
      message: "Cart data",
      data: { list: cartList },
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};

const updateCart = async (request, response) => {
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
    const updateData = await CartSchema.findByIdAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          userId: userId,
          createdDate: createdDate,
          productId: productId,
          qty: qty,
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

const deleteCart = async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({
        code: 400,
        message: "id missing",
        error: null,
      });
    }
    const deleteCart = await CartSchema.findByIdAndDelete({
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
  createCart,
  findAllCarts,
  findCartById,
  updateCart,
  deleteCart,
};
