import express from "express";
export const staticRouter = express.Router();
import urlModel from "../Models/url-Shortener.js";
import { checkAuthAtStaticLoginAndSignup, restrictToLoggedinUserOnly } from "../Middlewares/jwtAuth.js";


//All FrontEnd Pages for UI Routes -

//Signup Page UI API -
staticRouter.get("/signup", checkAuthAtStaticLoginAndSignup, async (req, res) => {

    // const allDocs = await urlModel.find({});
    res.render('signup.ejs');

});


//Login Page UI API -
staticRouter.get("/login", checkAuthAtStaticLoginAndSignup, async (req, res) => {

    // const allDocs = await urlModel.find({});
    res.render('login.ejs');

});


//HomePage UI API -
staticRouter.get("/", restrictToLoggedinUserOnly, async (req, res)=> {

    const baseUrl = req.protocol + "://" + req.get("host");
    const loggedInUserId = req.verifiedJWTUserId?.id;
    const allDocs = await urlModel.find({
      createdBy: loggedInUserId,
      shortenerId: { $exists: true, $ne: "" },
      redirectURL: { $exists: true, $ne: "" },
    }).sort({ createdAt: -1 });
    const loggedInUserName = req.verifiedJWTUserId?.name || req.verifiedJWTUserId?.email || "User";

    res.render('home.ejs', { allDocs, baseUrl, loggedInUserName });

  //res.render('Home.ejs', {allDocs : allDocs, PORT : PORT }); //We can send a single object with key-value pair or only value.

});


export default staticRouter