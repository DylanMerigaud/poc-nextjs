import { Fab, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import type { NextPage } from "next";
import { Box } from "@mui/system";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import DownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useCallback, useEffect, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BugReportIcon from "@mui/icons-material/BugReport";
import HideSourceIcon from "@mui/icons-material/HideSource";
import CloseIcon from "@mui/icons-material/Close";

const Home: NextPage = () => {
  const [debugVisible, setDebugVisible] = useState(true);
  const debugHideButtonClick = useCallback(() => {
    setDebugVisible(false);
  }, []);
  const onKeyPress = useCallback((e) => {
    if (e.key === "F9") {
      setDebugVisible((e) => !e);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
      }}
    >
      <SpeedDial
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        hidden={!debugVisible}
        ariaLabel="Debug menu"
        icon={
          <SpeedDialIcon icon={<BugReportIcon />} openIcon={<CloseIcon />} />
        }
      >
        {debugVisible
          ? [
              <SpeedDialAction
                icon={<ErrorOutlineIcon />}
                tooltipTitle={"Make resquests fail"}
                key="1"
              />,
              <SpeedDialAction
                onClick={debugHideButtonClick}
                icon={<HideSourceIcon />}
                tooltipTitle={"Hide debug menu button"}
                key="2"
              />,
            ]
          : null}
      </SpeedDial>
    </Box>
  );
};

export default Home;
