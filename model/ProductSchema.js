const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    productName:{
        type:String,
        require:true
    },
    actualPrice:{
        type:Number,
        require:true
    },
    oldPrice:{
        type:Number
    }
})