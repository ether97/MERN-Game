import express, { Request, Response } from "express";
import mongoose from "mongoose";
const app = express();

app.use(express.json());

import Deck from "./models/Deck";

const PORT = 5000;

app.post("/decks", async (req: Request, res: Response) => {
  //   console.log(req.body);
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose
  .connect(
    "mongodb+srv://mongodb_flashcards:jGJofd3HF4QtBbIR@cluster0.wukoaqp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
  });
