import express from "express"

import {  loginUser, myAddress, newUser , checkAuth, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";



const router = express.Router();


router.post("/user/new",newUser)
router.post('/user/login',loginUser )
router.get('/user/manufacturer/address',isAuthenticated,myAddress )
router.get("/logout",logout)
router.get("/checkAuth",isAuthenticated,checkAuth)



export default router;
    
