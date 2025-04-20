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
      response.status(400).json({
        code: 400,
        message: "some fields are missing...",
        data: result,
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
      message: "customer has been saved...",
      data: saveData,
    });
  } catch (err) {
    response
      .status(500)
      .json({ code: 500, message: "something went wrong...", error: err });
  }
};

//update    (put)
const updateCategory = async (request, response) => {
  console.log(request.body);
};

//delete    (delete)
const deleteCategory = async (request, response) => {
  console.log(request.body);
};

//search by id
const findCategoryById = async (request, response) => {
  console.log(request.body);
};

//get all
const findAllCategories = async (request, response) => {
  console.log(request.body);
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  findAllCategories,
  findCategoryById,
};
