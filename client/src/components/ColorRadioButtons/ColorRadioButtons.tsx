import { useState } from "react";
import { pink } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import "../../App.css";
import { CustomFormLabel } from "../../styles/globalStyles";

export default function ColorRadioButtons() {
  const [selectedValue, setSelectedValue] = useState("a");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-buttom-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <CustomFormLabel
        id="demo-radio-buttons-group-label"
        sx={{
          textAlign: "center",
          color: "#0288d1",
          fontFamily: "Source Code Pro, monospace",
        }}
      >
        Color
      </CustomFormLabel>
      <div>
        <Radio
          {...controlProps("a")}
          sx={{
            //   paddingLeft: "0px",
            "& .MuiSvgIcon-root": {
              // fontSize: 28,
              // paddingLeft: "0px",
            },
          }}
        />
        <Radio {...controlProps("b")} color="secondary" />
        <Radio {...controlProps("c")} color="success" />
        <Radio {...controlProps("d")} color="default" />
        <Radio
          {...controlProps("e")}
          sx={{ color: pink[800], "&.Mui-checked": { color: pink[600] } }}
        />
      </div>
    </div>
  );
}
