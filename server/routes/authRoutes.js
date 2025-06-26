import express from "express";
import {signupUser, loginUser} from "../controllers/authController.js";

const router = express.Router(); 

//Signup
router.post("/signup", signupUser);

//Logib
router.post("/login", loginUser)

export default router;

