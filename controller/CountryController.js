const { response, request } = require("express");
const CountrySchema = require("../model/CountrySchema");

const createCountry = async (request, response) => {
  try {
    const { countryName, file, countryCode } = request.body;

    if (!countryName || !countryCode || !file) {
      return response.status(400).json({
        code: 400,
        message: "some fields are empty",
        data: null,
      });
    }

    const country = new CountrySchema({
      countryName: countryName,
      flag: {
        hash: "temp-hash",
        resourceUrl: "url",
        directory: "directory",
        fileName: "file-name",
      },
      countryCode: countryCode,
    });

    const saveData = await country.save();

    response.status(201).json({
      code: 201,
      message: "country has been saved",
      data: saveData,
    });
  } catch (error) {
    response.status(500).json({
      code: 500,
      message: "something went wrong",
      data: `${error}`,
    });
  }
};

const findCountryById = async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({
        code: 400,
        message: "id required",
        error: null,
      });
    }

    const countryData = await CountrySchema.findById({
      _id: request.params.id,
    });

    if (countryData) {
      return response.status(200).json({
        code: 200,
        message: "country data found",
        data: countryData,
      });
    }
    return response.status(404).json({
      code: 404,
      message: "country data not found",
      data: null,
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};
const findAllCountries = async (request, response) => {
  try {
    const { searchText, page = 1, size = 1 } = request.query;
    const pageIndex = parseInt(page);
    const pageSize = parseInt(size);

    const query = {};
    if (searchText) {
      query.$text = { $search: searchText };
    }

    const skip = (pageIndex - 1) * pageSize;
    const countryList = await CountrySchema.find(query)
      .limit(pageSize)
      .skip(skip);
    return response.status(200).json({
      code: 200,
      message: "country data",
      data: { list: countryList },
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "something went wrong",
      error: `${error}`,
    });
  }
};
const updateCountry = async (request, response) => {
  try {
    const { countryName, countryCode } = request.body;
    if (!countryName || !countryCode) {
      return response.status(400).json({
        code: 400,
        message: "some fields are missing",
        error: null,
      });
    }

    const updateData = await CountrySchema.findOneAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          countryName: countryName,
          countryCode: countryCode,
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
const deleteCountryById = async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({
        code: 400,
        message: "id missing",
        error: null,
      });
    }

    const deleteCountry = await CountrySchema.findByIdAndDelete({
      _id: request.params.id,
    });
    return response.status(204).json({
      code: 204,
      message: "deleted",
      data: deleteCountry,
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
  createCountry,
  findCountryById,
  findAllCountries,
  updateCountry,
  deleteCountryById,
};
