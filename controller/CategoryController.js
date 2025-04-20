const { request, response } = require("express");
const CategorySchema = require("../model/CategorySchema");

//create    (post)
const createCategory = async (request, response) => {
  /*  const category = new CategorySchema({
    // client side must send the file resource
    // upload the icon to S3 bucket and get the response body
    // client send the ids of all the available countries, and the system must find all the countries for that ids

    categoryName: request.body.categoryName,
    icon: {
      hash: "temp-hash",
      resourceUrl: "temp-url",
      directory: "temp-directory",
      fileName: "temp-file-name",
    },
    availableCountries: [
      {
          countryId: 'temp-id-1',
          countryName: 'Sri Lank'
      },
      {
          countryId: 'temp-id-2',
          countryName: 'Switzerland'
      }
    ]
  });

  category.save().then(result=>{
      response.status(201).json({code:201, message:'customer has been saved...', data:result});
  }).catch(err=>{
      response.status(500).json({code:500, message:'something went wrong', error:err});
  })
  */

  try {
    const { categoryName, file, countryIds } = request.body;
    //check data is not Null
    if (!categoryName || !file || !countryIds) {
      return response.status(400).json({
        code: 400,
        message: "some fields are missing...",
        data: null,
      });
    }

    const category = new CategorySchema({
      categoryName: request.body.categoryName,
      icon: {
        hash: "temp-hash",
        resourceUrl: "temp-url",
        directory: "temp-directory",
        fileName: "temp-file-name",
      }, // files stored in a S3 bucket
      availableCountries: [
        {
          countryId: "temp-id-1",
          countryName: "Sri Lank",
        },
        {
          countryId: "temp-id-2",
          countryName: "Switzerland",
        },
      ],
    });

    const saveData = await category.save();

    response.status(201).json({
      code: 201,
      message: "category has been saved...",
      data: saveData,
    });
  } catch (e) {
    response
      .status(500)
      .json({ code: 500, message: `something went wrong...`, error: `${e}` });
  }
};

//update    (put)
const updateCategory = async (request, response) => {
  try {
    const { categoryName } = request.body;
    if (!categoryName) {
      return response
        .status(400)
        .json({ code: 400, message: "fields are missing...", error: null });
    }

    const updateData = await CategorySchema.findOneAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          categoryName: categoryName,
        },
      },
      { new: true }
    );
    return response
      .status(200)
      .json({ code: 200, message: "updated...", data: updateData });
  } catch (e) {
    return response
      .status(500)
      .json({ code: 500, message: "something went wrong...", error: `${e}` });
  }
};

//delete    (delete)
const deleteCategory = async (request, response) => {
  try {
    if (!request.params.id) {
      return response
        .status(400)
        .json({ code: 400, message: "id required...", error: null });
    }
    const deletedData = await CategorySchema.findOneAndDelete({
      _id: request.params.id,
    });
    return response
      .status(204)
      .json({ code: 204, message: "deleted...", data: deletedData });
  } catch (e) {
    return response
      .status(500)
      .json({ code: 500, message: "something went wrong...", error: `${e}` });
  }
};

//search by id
const findCategoryById = async (request, response) => {
  try {
    if (!request.params.id) {
      return response
        .status(400)
        .json({ code: 400, message: "id required...", error: null });
    }
    const categoryData = await CategorySchema.findById({
      _id: request.params.id,
    });
    if (categoryData) {
      return response
        .status(200)
        .json({ code: 200, message: "category data...", data: categoryData });
    }
    return response
      .status(404)
      .json({ code: 404, message: "not found...", data: null });
  } catch (e) {
    return response
      .status(500)
      .json({ code: 500, message: "something went wrong...", error: `${e}` });
  }
};

// get all
// PAGINATION
const findAllCategories = async (request, response) => {
  try {
    const { searchText, page = 1, size = 10 } = request.query;
    const pageIndex = parseInt(page);
    const pageSize = parseInt(size);

    const query = {};
    if (searchText) {
      query.$text = { $search: searchText };
    }

    const skip = (pageIndex - 1) * pageSize;
    const categoryList = await CategorySchema.find(query).limit(pageSize).skip(skip);
    const categoryListCount = await CategorySchema.countDocuments(query);
    return response
      .status(200)
      .json({ code: 200, message: "category data...", data: {list: categoryList, dataCount: categoryListCount} });
  } catch (e) {
    return response
      .status(500)
      .json({ code: 500, message: "something went wrong...", error: `${e}` });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  findAllCategories,
  findCategoryById,
};
