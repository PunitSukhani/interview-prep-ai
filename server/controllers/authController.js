import User from '../models/UserModel.js';

const signupUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate input
    if(!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = await User.create({
      fullName,
      email,
      password
    });

    res.status(201).json({
      _id : newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    })
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Server error" });
  }
} 

export { signupUser };