import express, { urlencoded } from "express";
import { createServer } from "node:http";

import mongoose from "mongoose";

import dotenv from "dotenv";
import cors from "cors";
import connectToSocket from "./controllers/socketManager.js";
import routes from "./routes/user.js";

// load environment modules
dotenv.config();

const app = express();
const server = createServer(app);
export const io = connectToSocket(server);

app.set("port", process.env.port || 5000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

//sample code to test the server
app.get("/home", (req, res) => {
  return res.json({ name: "Ayush Ghole" });
});

//Routes Declaration
app.use("/api/v1/users", routes);

const start = async () => {
  //MongoDB Connection
  const connectionDb = await mongoose.connect(process.env.ATLAS_URL);
  console.log(`MongoDb Connected on Host : ${connectionDb.connection.host}`);

  //Port Declaration
  server.listen(app.get("port"), (req, res) => {
    console.log(`Server is listening on port ${app.get("port")}`);
  });
};

start();
