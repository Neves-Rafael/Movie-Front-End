import React from "react";
import ReactDOM from "react-dom/client";

// import { Routes } from "./routes";
import { CreateMovie} from "./pages/CreateMovie";

import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import theme from "./styles/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CreateMovie/>
    </ThemeProvider>
  </React.StrictMode>
);
