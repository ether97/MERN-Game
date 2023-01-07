import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {
  CustomFormControlLabel,
  CustomFormLabel,
} from "../../styles/globalStyles";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setFilter } from "../../features/filters/filterSlice";

export function RadioGroupFilter() {
  const filter = useAppSelector((state) => state.filter.value);
  const folders = useAppSelector((state) => state.folders.value);
  const dispatch = useAppDispatch();
  function handleFilterFolders(check: boolean) {
    dispatch(setFilter(check));
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormControl sx={{ width: "100%", gap: "10px" }}>
        <CustomFormLabel
          id="demo-radio-buttons-group-label"
          sx={{
            textAlign: "left",
            color: "#0288d1",
            fontFamily: "Source Code Pro, monospace",
            fontSize: "1rem",
          }}
        >
          Filter
        </CustomFormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Folders"
          name="radio-buttons-group"
        >
          <CustomFormControlLabel
            value="Folders"
            control={<Radio />}
            label="Folders"
            disabled={folders.length === 0 ? true : false}
            onClick={() => handleFilterFolders(true)}
          />
          <CustomFormControlLabel
            value="Files"
            control={<Radio />}
            label="Files"
            disabled={folders.length === 0 ? true : false}
            onClick={() => handleFilterFolders(false)}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
