const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    name:{
        type:String,
        required: true
    }
},{
    timestamps:true
});

// telling mongoose that this is a model.
const User = mongoose.model('User',userSchema);

module.exports = User;