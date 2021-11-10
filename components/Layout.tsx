import { Box } from "@mui/system";
import React from "react";

const Layout: React.FunctionComponent = ({ children }) => {
  return <Box sx={{ minHeight: "100vh" }}>{children}</Box>;
};

export default Layout;
