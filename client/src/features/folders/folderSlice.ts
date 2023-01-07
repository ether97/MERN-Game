import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type File = {
  note: string;
};

type Folder = {
  title: string;
  _id: string;
  files: number;
  fileArray: { note: string }[];
};

interface FoldersState {
  value: Folder[];
}

const initialState = {
  value: [{ title: "", _id: "", files: 0, fileArray: [] }],
} as FoldersState;

const FoldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder(state, action: PayloadAction<Folder>) {
      state.value.push(action.payload);
    },
    removeFolder(state, action: PayloadAction<string>) {
      state.value = state.value.filter((Deck) => Deck._id !== action.payload);
    },
    setFolders(state, action: PayloadAction<Folder[]>) {
      state.value = action.payload;
    },
    changeFileCount(
      state,
      action: PayloadAction<{
        folderId: string;
        operation: string;
        note: string;
        index?: number;
      }>
    ) {
      state.value.map((folder) => {
        if (folder._id === action.payload.folderId) {
          switch (action.payload.operation) {
            case "increment":
              if (action.payload.note !== "") {
                if (!action.payload.index) break;
                folder.fileArray[action.payload.index].note =
                  action.payload.note;
                break;
              } else {
                folder.fileArray.push({ note: "" });
                folder.files += 1;
                break;
              }
            case "decrement":
              folder.files -= 1;
              break;
          }
        }
      });
    },
  },
});

export const { addFolder, removeFolder, setFolders, changeFileCount } =
  FoldersSlice.actions;
export default FoldersSlice.reducer;
