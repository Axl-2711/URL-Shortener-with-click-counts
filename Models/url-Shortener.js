import mongoose from "mongoose";


//URl Schema -
const urlSchema = new mongoose.Schema({

    shortenerId: {
        type: String,
        required: true,
        unique: true
    },

    redirectURL: {
        type: String,
        required: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: false,
    },

    expiresAt: {
        type: Date,
        default: null,
    },

    clicks: {
        type: Number,
        default: 0,
    },

    visitHistory: [{ timestamp: { type: Date, default: Date.now } }] //Array of Objects


}, { timestamps: true });

//Model-
const urlModel = mongoose.model("urls", urlSchema); // keep the name of collection under database/ If you keep colletion name in capital letter and singular form, mongoose automcatically converts the collection name in all lowercase and with its plural form while registering at the database.

export default urlModel;