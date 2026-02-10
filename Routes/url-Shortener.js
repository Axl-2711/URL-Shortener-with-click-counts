import express from "express";

export const urlRouter = express.Router();


import { handleGenerateShortenerID, reDirectToURL, handleGetAnalytics } from "../Controllers/url-Shortener.js";
import { restrictToLoggedinUserOnly } from "../Middlewares/jwtAuth.js";
import { analyticsLimiter, createUrlLimiter, redirectLimiter } from "../Middlewares/rateLimit.js";

urlRouter.post("/", restrictToLoggedinUserOnly, createUrlLimiter, handleGenerateShortenerID); //for creating the url shortener ID for each entered website
urlRouter.get("/analytics/:shortID", restrictToLoggedinUserOnly, analyticsLimiter, handleGetAnalytics);
urlRouter.get("/:shortID", redirectLimiter, reDirectToURL);

export default urlRouter ;

// console.log("ALL OKKKK");