import express from "express";
import {signupUser} from "../controllers/authController.js";

const router = express.Router(); 

// Route for user signup
router.post("/signup", signupUser);

export default router;

