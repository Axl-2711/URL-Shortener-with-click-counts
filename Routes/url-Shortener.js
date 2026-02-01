import express from "express";

export const urlRouter = express.Router();


import { handleGenerateShortenerID, reDirectToURL, handleGetAnalytics } from "../Controllers/url-Shortener.js";

urlRouter.post("/", handleGenerateShortenerID); //for creating the url shortener ID for each entered website
urlRouter.get("/:shortID", reDirectToURL);
urlRouter.get("/analytics/:shortID", handleGetAnalytics);

export default urlRouter ;

// console.log("ALL OKKKK");