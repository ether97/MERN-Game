import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { setTitle } from "../../features/title/titleSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Box from "@mui/material/Box";

type DeckInputProps = {
  handleEnter: (params: React.KeyboardEvent<HTMLDivElement>) => void;
  handleSubmit: (params: React.FormEvent) => void;
};

export function DeckInput({ handleEnter, handleSubmit }: DeckInputProps) {
  const title = useAppSelector((state) => state.title.value);
  const dispatch = useAppDispatch();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextField
        required
        id="outlined-basic"
        label="Folder"
        variant="outlined"
        value={title}
        multiline={true}
        sx={{
          width: "100%",
          input: { color: "white" },
          "& label": {
            color: "#0288d1",
            fontFamily: "Source Code Pro, monospace",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#0288d1",
            },
          },
          "& .MuiInputBase-input": {
            color: "white",
            fontFamily: "Source Code Pro, monospace",
          },
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setTitle(e.target.value));
        }}
        onKeyDown={(e) => handleEnter(e)}
      />
      <Button
        // variant="contained"
        sx={{
          width: "100%",
          textAlign: "left",
          justifyContent: "flex-start",
          backgroundColor: "rgba(2, 136, 209, 0.1)",
        }}
        onClick={(e) => handleSubmit(e)}
      >
        <Typography
          sx={{
            textAlign: "left",
            fontFamily: "Source Code Pro, monospace",
          }}
        >
          Create Folder
        </Typography>
      </Button>
    </div>
  );
}
