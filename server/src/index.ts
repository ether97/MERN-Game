import express, { Request, Response } from "express";
import mongoose, { Error, Document } from "mongoose";
import cors from "cors";
import bodyParser from "express";

const app = express();

import { config } from "dotenv";

config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

import Folder from "./models/Folder";

const PORT = 5000;

app.post("/folders", async (req: Request, res: Response) => {
  console.log("hi");
  //   console.log(req.body);
  const newFolder = new Folder({
    title: req.body.title,
  });
  const createdFolder = await newFolder.save();
  res.json(createdFolder);
});

app.put("/folders/:folderId/:operator", async (req: Request, res: Response) => {
  console.log(req.body.note);
  console.log(req.body.index);
  //   console.log(req.body);
  const note = req.body.note;
  const index = req.body.index;
  const operator = req.params.operator;
  const folderId = req.params.folderId;
  const filter = { _id: folderId };
  const data =
    note === "" && operator === "increment"
      ? {
          $inc: { files: 1 },
          $push: { fileArray: { note: "" } },
        }
      : note === "" && operator === "decrement"
      ? {
          $inc: { files: -1 },
          $pop: { fileArray: 1 },
        }
      : {
          $set: { [`fileArray.${index}.note`]: note },
        };

  await Folder.findOneAndUpdate(filter, data, {
    new: true,
  });

  res.json(folderId);
});

app.put("/folders/:folderId/:fileId", async (req: Request, res: Response) => {
  console.log(req.body.note);
  //   console.log(req.body);
  const note = req.body.note;
  const index = req.body.index;
  const folderId = req.params.folderId;
  const filter = { _id: folderId };
  const data =
    note === ""
      ? {
          $inc: { files: 1 },
          $push: { fileArray: { note: "" } },
        }
      : {
          $set: { "fileArray.$[index]": { note: note } },
        };

  await Folder.findOneAndUpdate(filter, data, {
    new: true,
  });

  res.json(folderId);
});

app.get("/folders", async (req: Request, res: Response) => {
  const folders = await Folder.find();

  res.json(folders);
});

app.delete("/folders/:folderId", async (req: Request, res: Response) => {
  const folderId = req.params.folderId;

  const folder = await Folder.findByIdAndDelete(folderId);

  res.json(folder);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
