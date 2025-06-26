import express from "express";
import {signupUser, loginUser, getUserProfile} from "../controllers/authController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router(); 

//Signup
router.post("/signup", signupUser);

//Login
router.post("/login", loginUser)

//Get User Profile
router.get("/profile", verifyToken, getUserProfile);

export default router;

