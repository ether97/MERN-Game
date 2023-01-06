import { Container, Grid, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "./App.css";
import { alpha, styled } from "@mui/material/styles";

const CustomItem = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: 250,
  // margin: 10,
  backgroundColor: `${alpha(theme.palette.info.dark, 0.16)}`,
  boxShadow: "0px 0px 0px 1px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.info.light,
  "&:hover": {
    backgroundColor: `${alpha(theme.palette.info.light, 0.16)}`,
  },
  "&:active": {
    boxShadow: `0px 0px 0px 100px ${alpha(theme.palette.info.light, 0.16)}`,
  },
}));

function App() {
  const [title, setTitle] = useState("");
  const [deleteTitle, setDeleteTitle] = useState("");
  const [decks, setDecks] = useState<{ title: string; id: string }[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTitle("");
  }

  async function handleDeleteDeck(e: React.FormEvent) {
    e.preventDefault();

    await fetch("http://localhost:5000/decks", {
      method: "DELETE",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let deepCopy = [...decks];
    deepCopy.filter((deck) => deck.title !== deleteTitle);
    setDecks(deepCopy);
    setDeleteTitle("");
  }

  useEffect(() => {
    async function awaitDecks() {
      const response = await fetch("http://localhost:5000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    }

    awaitDecks();
  }, []);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            // textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80%",
          }}
        >
          {decks.map((deck) => {
            return (
              <Grid item key={deck.id} xs={2}>
                <CustomItem>
                  <Typography>{deck.title}</Typography>
                </CustomItem>
              </Grid>
            );
          })}
        </Grid>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="deck-title">Deck Title </label>
          <input
            value={title}
            id="deck-title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <button type="submit">Create Deck</button>
        </form>
        <form onSubmit={(e) => handleDeleteDeck(e)}>
          <label htmlFor="delete-deck">Deck Title </label>
          <input
            value={deleteTitle}
            id="delete-deck"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDeleteTitle(e.target.value);
            }}
          />
          <button type="submit">Delete Deck</button>
        </form>
      </Container>
    </div>
  );
}

export default App;
