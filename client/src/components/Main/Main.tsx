import { Box, Container } from "@mui/material";
import { DeckGrid } from "../DeckGrid/DeckGrid";
import { DeckInput } from "../Inputs/DeckInput";
import { useAppSelector } from "../../app/hooks";
import { RadioGroupFilter } from "../RadioGroupFilter/RadioGroupFilter";
import ColorRadioButtons from "../ColorRadioButtons/ColorRadioButtons";

type MainProps = {
  handleEnter: (params: React.KeyboardEvent<HTMLDivElement>) => void;
  handleSubmit: (params: React.FormEvent) => void;
  handleDelete: (params: string) => void;
  handleChangeFileCount: (
    param1: string,
    param2: string,
    param3: string
  ) => void;
};

export function Main({
  handleEnter,
  handleSubmit,
  handleDelete,
  handleChangeFileCount,
}: MainProps) {
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
          height: "100vh",
          gap: "50px",
          // overflow: "scroll",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifySelf: "flex-start",
            height: "80%",
            gap: "20px",
            width: "30%",
          }}
        >
          <DeckInput handleEnter={handleEnter} handleSubmit={handleSubmit} />
          <RadioGroupFilter />
          {/* <ColorRadioButtons /> */}
        </Box>
        {/* <Divider /> */}
        <DeckGrid
          handleDelete={handleDelete}
          handleChangeFileCount={handleChangeFileCount}
        />
      </Container>
    </div>
  );
}
