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
import React, {
  Component,
  ComponentType,
  useCallback,
  useEffect,
  useState,
} from "react";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import BugReportIcon from "@mui/icons-material/BugReport";
import HideSourceIcon from "@mui/icons-material/HideSource";
import CloseIcon from "@mui/icons-material/Close";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import Timer3Icon from "@mui/icons-material/Timer3";
import KeyboardHideIcon from "@mui/icons-material/KeyboardHide";
import ApiIcon from "@mui/icons-material/Api";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import SignalWifiConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiConnectedNoInternet4";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface TimerState {
  name: string;
  icon: ComponentType;
  duration: number;
  index: number;
}
const timerStates: Array<TimerState> = [
  { name: "NO_TIMER", icon: TimerOffIcon, duration: 0, index: 0 },
  { name: "THREE_SECONDS", icon: Timer3Icon, duration: 3000, index: 1 },
];

interface DebugMenuOption<T = boolean> {
  value: T;
  set: React.Dispatch<React.SetStateAction<T>>;
}
interface DebugMenuState {
  debugVisible: DebugMenuOption;
  makeRequestsFail: DebugMenuOption;
  requestTimer: DebugMenuOption<TimerState>;
  fakeOffline: DebugMenuOption;
}
export const useDebugMenu = () => {
  const [debugVisible, setDebugVisible] = useState(false);
  const [makeRequestsFail, setMakeRequestsFail] = useState(false);
  const [requestTimer, setRequestTimer] = useState<TimerState>(timerStates[0]);
  const [fakeOffline, setFakeOffline] = useState(false);

  return {
    debugVisible: {
      value: debugVisible,
      set: setDebugVisible,
    },
    makeRequestsFail: {
      value: makeRequestsFail,
      set: setMakeRequestsFail,
    },
    requestTimer: {
      value: requestTimer,
      set: setRequestTimer,
    },
    fakeOffline: {
      value: fakeOffline,
      set: setFakeOffline,
    },
  };
};

const DebugMenu: React.FunctionComponent<{ debugMenuState: DebugMenuState }> =
  ({
    debugMenuState: {
      debugVisible,
      makeRequestsFail,
      requestTimer,
      fakeOffline,
    },
  }) => {
    const handleDebugHideButtonClick = useCallback(() => {
      debugVisible.set(false);
    }, [debugVisible]);

    const onKeyPress = useCallback(
      (e) => {
        if (e.key === "F9") {
          debugVisible.set((e) => !e);
        }
      },
      [debugVisible]
    );
    useEffect(() => {
      window.addEventListener("keydown", onKeyPress);
      return () => {
        window.removeEventListener("keydown", onKeyPress);
      };
    }, [onKeyPress]);

    const handleMakeRequestsFailClick = useCallback(() => {
      makeRequestsFail.set(!makeRequestsFail.value);
    }, [makeRequestsFail]);

    const handleRequestTimerClick = useCallback(() => {
      requestTimer.set(
        timerStates[
          requestTimer.value.index + 1 === Object.keys(timerStates).length
            ? 0
            : requestTimer.value.index + 1
        ]
      );
    }, [requestTimer]);
    const TimerDurationIcon = requestTimer.value.icon;

    const handleFakeOfflineClick = useCallback(() => {
      fakeOffline.set(!fakeOffline.value);
    }, [fakeOffline]);

    return !debugVisible.value ? null : (
      <SpeedDial
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        hidden={!debugVisible.value}
        ariaLabel="Debug menu"
        icon={
          <SpeedDialIcon
            icon={<DeveloperBoardIcon />}
            openIcon={<CloseIcon />}
          />
        }
      >
        <SpeedDialAction
          onClick={handleMakeRequestsFailClick}
          FabProps={{ color: "primary" }}
          icon={
            <ApiIcon color={makeRequestsFail.value ? "error" : "success"} />
          }
          tooltipTitle={`${
            makeRequestsFail.value ? "Unforces" : "Forces"
          } resquests to fail`}
          key="1"
        />

        <SpeedDialAction
          onClick={handleRequestTimerClick}
          icon={<TimerDurationIcon />}
          tooltipTitle={"Change request timer duration"}
          key="2"
        />
        <SpeedDialAction
          onClick={handleFakeOfflineClick}
          icon={
            !fakeOffline.value ? (
              <SignalWifiStatusbar4BarIcon color="success" />
            ) : (
              <SignalWifiConnectedNoInternet4Icon color="error" />
            )
          }
          tooltipTitle={""}
          key="3"
        />
        <SpeedDialAction
          onClick={handleDebugHideButtonClick}
          icon={<KeyboardHideIcon />}
          tooltipTitle={"Hide debug menu button (F9)"}
          key="4"
        />
      </SpeedDial>
    );
  };

export default DebugMenu;
