const mongoose = require('mongoose');


mongoose.Promise=global.Promise;
mongoose.connect('mongodb://vidlyuser:anisa123@ds227322.mlab.com:27322/jishan1');

module.exports={
    mongoose
};