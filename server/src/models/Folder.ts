import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const FolderSchema = new Schema({
  title: String,
  files: Number,
  fileArray: [{ note: String }],
});

const FolderModel = mongoose.model("Folder", FolderSchema);

export default FolderModel;
