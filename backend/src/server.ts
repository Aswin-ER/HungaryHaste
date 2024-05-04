import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client'
import cookieParser from 'cookie-parser';
import routes from './routes/userRoute';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient()
import cors from 'cors'; // Import cors middleware

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000'})); // Enable CORS
app.use(bodyParser.json());
app.use('/api', routes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  export default prisma;