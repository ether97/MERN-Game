import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import { Main } from "../components/Main/Main";
import filterSlice from "../features/filters/filterSlice";
import folderSlice, {
  addFolder,
  removeFolder,
  setFolders,
  changeFileCount,
} from "../features/folders/folderSlice";
import { setTitle } from "../features/title/titleSlice";

export function AsyncControllers() {
  const title = useAppSelector((state) => state.title.value);
  const folders = useAppSelector((state) => state.folders.value);
  const filter = useAppSelector((state) => state.filter.value);
  const dispatch = useAppDispatch();

  async function handleSubmit(e: React.FormEvent) {
    if (!title) return;
    e.preventDefault();

    const response = await fetch("http://localhost:5000/folders", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newFolder = await response.json();
    dispatch(addFolder(newFolder));

    dispatch(setTitle(""));
  }

  async function handleChangeFileCount(
    folderId: string,
    operation: string,
    note: string,
    index?: number
  ) {
    const response = await fetch(
      `http://localhost:5000/folders/${folderId}/${operation}`,
      {
        method: "PUT",
        body: JSON.stringify({
          note,
          index,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(changeFileCount({ folderId, operation, note, index }));

    dispatch(setTitle(""));
  }

  async function handleEnter(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!title) return;

    if (e.key === "Enter") {
      const response = await fetch("http://localhost:5000/folders", {
        method: "POST",
        body: JSON.stringify({
          title,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newFolder = await response.json();
      dispatch(addFolder(newFolder));

      dispatch(setTitle(""));
    }
  }

  async function handleDeleteDeck(folderId: string) {
    const response = await fetch(`http://localhost:5000/folders/${folderId}`, {
      method: "DELETE",
    });
    dispatch(removeFolder(folderId));
  }

  useEffect(() => {
    async function awaitDecks() {
      const response = await fetch("http://localhost:5000/folders");
      const newFolders = await response.json();
      dispatch(setFolders(newFolders));
    }

    awaitDecks();
  }, [folders, filter]);

  return (
    <Main
      handleEnter={handleEnter}
      handleSubmit={handleSubmit}
      handleDelete={handleDeleteDeck}
      handleChangeFileCount={handleChangeFileCount}
    />
  );
}
