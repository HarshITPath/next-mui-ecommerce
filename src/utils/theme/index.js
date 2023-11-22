import { createTheme } from "@mui/material/styles";

import { palette } from "./palette";
import { typography } from "./typography";
// import { componentsStyle } from "./components-style";

const themeConfig = createTheme({
  palette,
  typography,
});

export const theme = {
  ...themeConfig,
//   components: componentsStyle(themeConfig),
};
