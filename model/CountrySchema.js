const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    countryName: {
        type: String,
        require: true
    },

    countryCode: {
        type: String
    },

    flag: {
        type: Object

    }

})

module.exports = mongoose.model('countries', CountrySchema);

