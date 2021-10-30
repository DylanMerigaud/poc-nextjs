import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log(
      `\
Website coded with ❤️ by Dylan Merigaud
Contact: dylanmerigaud@gmail.com`
    );
  }, []);

  const theme = createTheme({});
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
