import express from "express";
export const userRouter = express.Router();

import { handleCreateNewPostUser, handleLoginPostUser, handleLogoutUser } from "../Controllers/user.js";
import { authLimiter } from "../Middlewares/rateLimit.js";

//PoST -  For User Form Data Registration i.e Creation -
userRouter.post("/signup", authLimiter, handleCreateNewPostUser ) ;
userRouter.post("/login", authLimiter, handleLoginPostUser ) ;
userRouter.post("/logout", handleLogoutUser);

export default userRouter  