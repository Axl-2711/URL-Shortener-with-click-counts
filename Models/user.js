import mongoose from "mongoose";


// all new entry Users Schema -
const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },

}, {timestamps : true})

const userModel = mongoose.model("users", userSchema);

export default userModel;