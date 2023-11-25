import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";
import cors from "cors";
import { getDeckController } from "./controllers/getDeckController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
const PORT = 5000;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/decks", getDeckController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log("listening to port {PORT}");
  app.listen(PORT);
});
