var mongoose = require('mongoose');
const Schema = mongoose.Schema;



const todoSchema = new Schema({


  imageUrl:{
    type:String,
    required:true
  },
  Product_Name:{
    type:String,
    required:true
  },
  Product_Price:{
    type:String,
    required:true
  },
  Product_Barcode:{
    type:String,
    required:true
  },
  Product_Title:{
    type:String,
    required:true
  },
  Product_Details:{
    type:String,
    required:true
  }
});

var MegaSale =  mongoose.model('megasale',todoSchema);

module.exports={MegaSale}