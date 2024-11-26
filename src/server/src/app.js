import http from "http";
import express from "express";

import cors from 'cors';

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "https://drugboard.vercel.app"
  ];
  
  // CORS options
   const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
  
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Welcome to drugboard.ai API..."
    });
})

const drugboardServer = http.createServer(app);

export default drugboardServer;