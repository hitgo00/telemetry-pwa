import { useEffect, useState } from "react";
import CpuInfo from "../../components/CpuInfo";
import { CircularProgress } from "@material-ui/core";
import { extensionId } from "../../constants";
import { Message } from "./types";

export default function SystemData() {
  const [systemData, setSystemData] = useState<any>(undefined);

  useEffect(() => {
    let port: {
      postMessage: (arg0: { m: string }) => void;
      onMessage: { addListener: (arg0: (message: Message) => void) => void };
      disconnect: () => void;
    };
    let interval: NodeJS.Timeout;
    //@ts-ignore
    if (chrome) {
      //@ts-ignore
      port = chrome.runtime.connect(extensionId);
      port.postMessage({ m: "Hello from app!" });
      port.onMessage.addListener((message: Message) => {
        if (Object.keys(message).length !== 0) {
          setSystemData(message);
        }
      });
      interval = setInterval(() => {
        port.postMessage({ m: "Hello from app!" });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (port) port.disconnect();
    };
  }, []);

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
      {systemData ? (
        <CpuInfo {...systemData} />
      ) : (
        <CircularProgress
          style={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )}
    </div>
  );
}
