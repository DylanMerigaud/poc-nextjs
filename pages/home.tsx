import {
  emphasize,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import type { NextPage } from "next";
import { Box } from "@mui/system";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import DownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useCallback, useEffect, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BugReportIcon from "@mui/icons-material/BugReport";
import HideSourceIcon from "@mui/icons-material/HideSource";
import CloseIcon from "@mui/icons-material/Close";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import Timer3Icon from "@mui/icons-material/Timer3";
import KeyboardHideIcon from "@mui/icons-material/KeyboardHide";
import ApiIcon from "@mui/icons-material/Api";

enum TimerStates {
  noTimer = 0,
  threeSeconds,
}

const TimerStatesIcons = {
  [TimerStates.noTimer]: TimerOffIcon,
  [TimerStates.threeSeconds]: Timer3Icon,
};

const Home: NextPage = () => {
  const [debugVisible, setDebugVisible] = useState(true);
  const handleDebugHideButtonClick = useCallback(() => {
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

  const [makeRequestsFail, setMakeRequestsFail] = useState(false);
  const handleMakeRequestsFailClick = useCallback(() => {
    setMakeRequestsFail(!makeRequestsFail);
  }, [makeRequestsFail]);

  const [requestTimer, setRequestTimer] = useState<TimerStates>(
    TimerStates.noTimer
  );
  const handleRequestTimerClick = useCallback(() => {
    setRequestTimer(
      requestTimer + 1 === Object.keys(TimerStates).length / 2 //https://stackoverflow.com/questions/38034673/determine-the-number-of-enum-elements-typescript/38034825
        ? 0
        : requestTimer + 1
    );
  }, [requestTimer]);
  console.log(requestTimer);
  const TimerDurationIcon = TimerStatesIcons[requestTimer];

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
                onClick={handleMakeRequestsFailClick}
                FabProps={{ color: "primary" }}
                icon={
                  <ApiIcon color={makeRequestsFail ? "error" : "success"} />
                }
                tooltipTitle={"Make resquests fail"}
                key="1"
              />,
              <SpeedDialAction
                onClick={handleRequestTimerClick}
                icon={<TimerDurationIcon />}
                tooltipTitle={"Change request timer duration"}
                key="2"
              />,
              <SpeedDialAction
                onClick={handleDebugHideButtonClick}
                icon={<KeyboardHideIcon />}
                tooltipTitle={"Hide debug menu button (F9)"}
                key="3"
              />,
            ]
          : null}
      </SpeedDial>
    </Box>
  );
};

export default Home;
