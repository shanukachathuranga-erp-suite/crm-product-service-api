const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    
    categoryName:{
        type:String,
        require:true
    },
    icon:{
        type:Object
    },
    availableCountries:{
        type:Array
    }

})

module.exports = mongoose.model('category', CategorySchema);
