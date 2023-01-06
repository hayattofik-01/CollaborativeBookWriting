//common js importing method
const mongoose = require('mongoose');

const Shcema = new mongoose.Schema({
    // _id: {
    //     type: Number,
    //   },
    name:{
    type:String
    },
    description:{
        type:String
    },image:{
        type:String
        ,default:'Assets/some.png'

    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    Authors:[{
        
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    content:{
        type: String
    }

},{timestamps: true});

const Book = mongoose.model("Book",Shcema) 
module.exports = Book;