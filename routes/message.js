import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import { getMyMessages, getMySentMessages, getTransReply, getTransporters, newmanMessage, newtranMessage } from "../controllers/message.js";



const router  =  express.Router();


//apis for manufacturer
router.post("/api/v1/man/message",isAuthenticated,newmanMessage)
router.get("/api/v1/gettransporters",getTransporters)
router.get("/api/v1/getmysentmessages",isAuthenticated,getMySentMessages)


router.get("/api/v1/getTransReply",isAuthenticated,getTransReply)

//apis for transporter
router.get("/api/v1/messages/my",isAuthenticated,getMyMessages)
router.post("/api/v1/tran/message",isAuthenticated,newtranMessage)

export default router;

