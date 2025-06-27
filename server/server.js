import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from './config/db.js'; 
import authRoutes from './routes/authRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';  
import questionRoutes from './routes/questionRoutes.js';


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/test', (req,res) => {
  res.send("API is running...");
}) ;
app.use('/api/auth', authRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/questions', questionRoutes);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
