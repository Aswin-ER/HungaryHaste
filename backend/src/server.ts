import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import routes from "./routes/userRoute";
import dotenv from "dotenv";
import client from './utils/redisConfig';
dotenv.config();

const prisma = new PrismaClient();
import cors from "cors"; // Import cors middleware

const app = express();

// Middleware
app.use(cookieParser());
const allowedOrigins = ["http://localhost:3000"];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowed list
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use("/api", routes);

// Example usage of the Redis client
client.set('hello', 'hello').then((res)=> {
  console.log(res,"sdfsdf");
  
}).catch((err)=> {
  console.log(err, "redis error!!!");
  
})


app.use((err: any, req: any, res: any, next: any) => {
  if (err) {
    console.table(err);
    res.status(500).json({
      message: err.message,
    });
  } else {
    next();
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default prisma;
