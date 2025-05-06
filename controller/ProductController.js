const { request, response } = require("express");
const ProductSchema = require("../model/ProductSchema");
const createProduct = async (request, response) => {
  try {
    const { productName, actualPrice, qty, description, file, discount, category } = request.body;
    if (!productName || !actualPrice || !qty || !description || !file ||!category) {
      return response.status(400).json({
        code: 400,
        message: "some fields are missing",
        error: null,
      });
    }

    const product = new ProductSchema({
      productName: productName,
      actualPrice: actualPrice,
      qty: qty,
      description: description,
      images:file,
      discount:discount,
      category:category
    });

    const saveData = await product.save();
    return response.status(200).json({
      code: 200,
      message: "product saved",
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

const findProductById = async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({
        code: 400,
        message: "id required",
        error: null,
      });
    }

    const productData = await ProductSchema.findById({
      _id: request.params.id,
    });
    return response.status(200).json({
      code: 200,
      message: "product data found",
      data: productData,
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};

const findAllProducts = async (request, response) => {
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

    const productList = await CountrySchema.find(query).limit(pageSize);
    return response.status(200).json({
      code: 200,
      message: "product data",
      data: { list: productList },
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};

const updateProduct = async (request, response) => {
  try {
    const { productName, actualPrice, qty, description, oldPrice, file, discount, category } = request.body;
    if (!request.params.id) {
      return response.status(400).json({
        code: 400,
        message: "id required",
        error: null,
      });
    }
    const updateData = ProductSchema.findByIdAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          productName: productName,
          actualPrice: actualPrice,
          qty: qty,
          description: description,
          oldPrice:oldPrice,
          images:file,
          discount:discount,
          category:category
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

const deleteProductById = async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({
        code: 400,
        message: "id missing",
        error: null,
      });
    }
    const deleteProduct = await ProductSchema.findByIdAndDelete({
      _id: request.params.id,
    });
    return response.status(200).json({
      code: 200,
      message: "deleted",
      error: deleteProduct,
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
  createProduct,
  findAllProducts,
  findProductById,
  updateProduct,
  deleteProductById,
};
