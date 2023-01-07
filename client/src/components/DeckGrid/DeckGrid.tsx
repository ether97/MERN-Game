import { Button, Grid, TextField, Typography } from "@mui/material";
import { CustomTypography, CustomItem } from "../../styles/globalStyles";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { changeFileCount } from "../../features/folders/folderSlice";
import { setFilter } from "../../features/filters/filterSlice";

type DeckGridProps = {
  handleDelete: (params: string) => void;
  handleChangeFileCount: (
    param1: string,
    param2: string,
    param3: string,
    param4?: number
  ) => void;
};

export function DeckGrid({
  handleDelete,
  handleChangeFileCount,
}: DeckGridProps) {
  const [note, setNote] = useState("");
  const folders = useAppSelector((state) => state.folders.value);
  const filter = useAppSelector((state) => state.filter.value);
  const dispatch = useAppDispatch();

  function handleKeyDown(
    e: React.KeyboardEvent,
    operation: string,
    folderId: string
  ) {
    if (e.key === "Enter") {
      dispatch(changeFileCount({ folderId, operation, note }));
      setNote("");
    }
  }

  function handleNote(
    folderId: string,
    operation: string,
    note: string,
    index?: number
  ) {
    handleChangeFileCount(folderId, operation, note, index);
    setNote("");
    // dispatch(setFilter(true));
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: "80%",
        overflowY: "auto",
        padding: "20px",
        backgroundColor: "rgba(2, 136, 209, 0.1)",
        borderRadius: "10px",
      }}
    >
      {folders.map((folder, index) => (
        <Grid item key={index} xs={4}>
          <CustomItem sx={{ zIndex: "10" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomTypography
                sx={{
                  fontSize: { xs: "0.5rem", md: "1.5rem", lg: "1.5rem" },
                }}
              >
                {(filter && folder.title) ||
                  (folder.fileArray.length === 0 && folder.title)}
              </CustomTypography>
              {/* <CustomTypography>{deck.message}</CustomTypography> */}
            </div>
            {/* {folder.fileArray.length === 0 ? (
              <>
                <Button
                  onClick={() => handleDelete(folder._id)}
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "0px",
                    width: "10px",
                  }}
                >
                  <DoDisturbOnIcon />
                </Button>
                <Button
                  onClick={() => handleNote(folder._id, "increment", "")}
                  sx={{
                    position: "absolute",
                    top: "10px",
                    left: "0px",

                    borderLeftColor: "0px",
                    width: "10px",
                  }}
                >
                  <AddCircleIcon />
                </Button>
              </>
            ) :  */}
            {!filter && folder.fileArray.length === 0 ? (
              <>
                <Button
                  onClick={() => handleDelete(folder._id)}
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "0px",
                    width: "10px",
                  }}
                >
                  <DoDisturbOnIcon />
                </Button>
                <Button
                  onClick={() => handleNote(folder._id, "increment", "")}
                  sx={{
                    position: "absolute",
                    top: "10px",
                    left: "0px",

                    borderLeftColor: "0px",
                    width: "10px",
                  }}
                >
                  <AddCircleIcon />
                </Button>
              </>
            ) : !filter && folder.fileArray.length !== 0 ? (
              ""
            ) : (
              ""
            )}

            {!filter &&
              folder.fileArray.map((_file, i) => (
                <CustomItem
                  key={i}
                  sx={{
                    position: "absolute",
                    top: `${i * 5 + 5}px`,
                    left: `${i * 5 + 5}px`,
                    zIndex: `10 + ${i * 5}`,
                  }}
                >
                  {i === folder.fileArray.length - 1 && (
                    <>
                      <Button
                        onClick={() => handleNote(folder._id, "increment", "")}
                        sx={{
                          position: "absolute",
                          top: "10px",
                          left: "0px",

                          borderLeftColor: "0px",
                          width: "10px",
                        }}
                      >
                        <AddCircleIcon />
                      </Button>
                      <Button
                        onClick={() => handleNote(folder._id, "decrement", "")}
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "0px",
                          width: "10px",
                        }}
                      >
                        <DoDisturbOnIcon />
                      </Button>
                      {_file.note === "" ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "5px",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Note"
                            multiline={true}
                            variant="outlined"
                            // value={note}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setNote(e.target.value)}
                            onKeyDown={(e) =>
                              handleKeyDown(e, "increment", folder._id)
                            }
                          />
                          <Button
                            onClick={() =>
                              handleNote(folder._id, "increment", note, i)
                            }
                            variant="contained"
                          >
                            Remind me
                          </Button>
                        </div>
                      ) : (
                        _file.note
                      )}
                    </>
                  )}
                </CustomItem>
              ))}
          </CustomItem>
        </Grid>
      ))}
    </Grid>
  );
}
