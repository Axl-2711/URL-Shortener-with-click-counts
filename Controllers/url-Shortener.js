
import ShortUniqueId from 'short-unique-id';
const { randomUUID } = new ShortUniqueId({ length: 8 });

import urlModel from "../Models/url-Shortener.js";


//POST - Create the Shortener URL Random Unique ID Creation -

//We basically creating a unique id for each new long url entered by user and stores that unique id corresponding to long-url so to redirect to user to that original site by respective generated unique id -

const handleGenerateShortenerID = async (req, res) => {

    // console.log(req.body.url); //here 'url' is coming from client machine ie from front which user entered, for POST method we can test this using POST man where we send data in 'url' key to see that data created or not and stors at database or not.

    try{

        const rawUrl = req.body?.url ?? "";
        const normalizedUrl = rawUrl.trim();
        const loggedInUserName = req.verifiedJWTUserId?.name || req.verifiedJWTUserId?.email || "User";

        //Adding this function to get current protocol and host -
        const baseUrl = req.protocol + "://" + req.get("host");

        const allDocs = await urlModel.find({
            shortenerId: { $exists: true, $ne: "" },
            redirectURL: { $exists: true, $ne: "" },
        }).sort({ createdAt: -1 });

        if (!normalizedUrl) {
            return res.status(400).render("home.ejs", {
                errorMsg: "URL is required.",
                allDocs,
                baseUrl,
                loggedInUserName,
            });
        }

        try {
            new URL(normalizedUrl);
        } catch {
            return res.status(400).render("home.ejs", {
                errorMsg: "Please enter a valid URL (include http:// or https://).",
                allDocs,
                baseUrl,
                loggedInUserName,
            });
        }

        const existingDoc = await urlModel.findOne({ redirectURL: normalizedUrl });
        if (existingDoc) {
            return res.render("home.ejs", {
                shortenerId: existingDoc.shortenerId,
                allDocs,
                baseUrl,
                loggedInUserName,
            });
        }

        const id = randomUUID();
    
        await urlModel.create({
            shortenerId : id,
            redirectURL : normalizedUrl,
            // visitHistory : 
    
        })
    
        const latestDocs = await urlModel.find({
            shortenerId: { $exists: true, $ne: "" },
            redirectURL: { $exists: true, $ne: "" },
        }).sort({ createdAt: -1 });

        // return res.status(200).json({generated_Id : id})
        //we send addition data to UI side for rendering all these data there aprat from 'home.ejs' which is required and 2nd parameter is optional. 
        return res.render('home.ejs', {shortenerId : id, allDocs : latestDocs , baseUrl : baseUrl, loggedInUserName}); 

    }catch(err){
        console.log("Got Error : ", err)
        return res.redirect('/');
    }
   
    
}




//Get - Redirecting To Orginal Site From "url/unique-id" API -

const reDirectToURL = async (req, res) => {

    const shortId = req.params.shortID;
    const entry = await urlModel.findOneAndUpdate( {
        shortenerId : shortId} , {
        
        $inc: { clicks: 1 },
        
        $push : { visitHistory : {
            timestamp : Date.now()
        }  }   


    }, { new: true } )

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }


    // res.json(entry)
    res.redirect(302, entry.redirectURL); 
}

// Get - Disaplying API of The Json Data analytics -

const handleGetAnalytics = async (req, res) => {

    const shortID = req.params.shortID;
    const result = await urlModel.findOne({shortenerId  : shortID});//retuns that single object which matched the shortID.
        res.json({
            totalClicks : result.clicks ?? result.visitHistory.length,
            analytics : result.visitHistory
        })
    
}


export { handleGenerateShortenerID, reDirectToURL, handleGetAnalytics };