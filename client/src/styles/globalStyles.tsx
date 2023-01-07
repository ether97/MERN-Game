import { alpha, styled } from "@mui/material/styles";
import { Paper, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

export const CustomItem = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: 250,
  // margin: 10,
  backgroundColor: `${alpha(theme.palette.info.dark, 0.16)}`,
  boxShadow: "0px 0px 0px 0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  color: theme.palette.info.light,
  "&:hover": {
    backgroundColor: `${alpha(theme.palette.info.light, 0.16)}`,
  },
  // "&:active": {
  //   boxShadow: `0px 0px 0px 100px ${alpha(theme.palette.info.light, 0.16)}`,
  // },
}));

export const CustomTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.info.light,
  fontFamily: "Source Code Pro, monospace",
  width: "100%",
  textAlign: "center",
  wordWrap: "break-word",
}));

export const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  "& .MuiTypography-root": {
    color: "white",
    fontFamily: "Source Code Pro, monospace",
  },
  "& .MuiFormLabel-root": {
    color: "white",
    fontFamily: "Source Code Pro, monospace",
  },
  "& .MuiSvgIcon-root": {
    // fontSize: 28,
    // paddingLeft: "0px",
  },
}));

export const CustomFormLabel = styled(FormLabel)(({ theme }) => ({
  "& .MuiFormLabel-root": {
    color: "white",
    fontFamily: "Source Code Pro, monospace",
    // fontWeight: "",
  },
}));
