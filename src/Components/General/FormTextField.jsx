import * as React from "react";
import { TextField } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  // Components
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            fontFamily: "'Rubik', sans-serif",
            fontSize: "14px",

            // set some styles for the label if need it
          },
          "& legend": {
            fontFamily: "'Rubik', sans-serif",

            // set some styles for the legend if need it
          },

          // this is styles for the new variants
          "&.subvariant-hovered": {
            "& fieldset": {
              borderRadius: "20px",
            },
            "& .MuiInputBase-input:hover + fieldset": {},
            "& .MuiInputBase-input:focus + fieldset": {},
          },
        },
      },
    },
  },
});

function FormInput(props) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <TextField
          margin="normal"
   
          sx={{ fontFamily: "'Rubik', sans-serif" }}
          inputProps={{
            autoComplete: "off",
            form: {
              autocomplete: "off",
            },
          }}
          error={props.error}
          {...props}
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default FormInput;
