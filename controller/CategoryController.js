const { request, response } = require('express');
const CategorySchema = require('../model/CategorySchema');

//create    (post)
const createCategory = async (request, response)=>{
    console.log("data test")
    console.log(request.body);
}

//update    (put)
const updateCategory = async (request, response)=>{
    console.log(request.body);
}

//delete    (delete)   
const deleteCategory = async (request, response)=>{
    console.log(request.body);
}

//search by id
const findCategoryById = async (request, response)=>{
    console.log(request.body);
}

//get all
const findAllCategories = async (request, response)=>{
    console.log(request.body);
}


module.exports = {
    createCategory, updateCategory, deleteCategory, findAllCategories, findCategoryById
}

