import express from "express";
export const userRouter = express.Router();

import { handleCreateNewPostUser, handleLoginPostUser, handleLogoutUser } from "../Controllers/user.js";

//PoST -  For User Form Data Registration i.e Creation -
userRouter.post("/signup", handleCreateNewPostUser ) ;
userRouter.post("/login", handleLoginPostUser ) ;
userRouter.post("/logout", handleLogoutUser);

export default userRouter  