import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import pool from './db';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
import cors from 'cors'; // Import cors middleware

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });