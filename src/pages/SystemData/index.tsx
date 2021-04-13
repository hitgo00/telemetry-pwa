import { useEffect, useState } from "react";
import CpuInfo from "../../components/CpuInfo";
import { CircularProgress, Dialog, Input, Button } from "@material-ui/core";
import { Message } from "./types";

export default function SystemData() {
  const [systemData, setSystemData] = useState<any>(undefined);

  //get extensionId from local storage if available
  const [extensionId, setExtensionId] = useState(
    localStorage.getItem("extensionId") || ""
  );

  const [extensionIdInput, setExtensionIdInput] = useState("");
  const [dialogOpen, setDialogOpen] = useState(!extensionId);

  useEffect(() => {
    if (extensionId) {
      let port: {
        postMessage: (arg0: { m: string }) => void;
        onMessage: { addListener: (arg0: (message: Message) => void) => void };
        disconnect: () => void;
      };
      let interval: NodeJS.Timeout;
      let reloadInterval: NodeJS.Timeout;
      //@ts-ignore
      if (chrome) {
        //@ts-ignore
        port = chrome.runtime.connect(extensionId);
        if (port) {
          port.postMessage({ m: "Hello from app!" });
          port.onMessage.addListener((message: Message) => {
            if (Object.keys(message).length !== 0) {
              setSystemData(message);
            }
          });
          interval = setInterval(() => {
            port.postMessage({ m: "Hello from app!" });
          }, 1500);
        }
      }

      reloadInterval = setInterval(() => {
        window.location.reload();
      }, 300000);

      return () => {
        if (interval) clearInterval(interval);
        if (reloadInterval) clearInterval(reloadInterval);
        if (port) port.disconnect();
      };
    }
  }, [extensionId]);

  const onButtonClik = () => {
    if (extensionIdInput.length === 32) {
      setExtensionId(extensionIdInput);
      localStorage.setItem("extensionId", extensionIdInput);
      setDialogOpen(false);
    }
  };

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
      <Dialog open={dialogOpen}>
        <div
          style={{ display: "flex", flexDirection: "column", padding: "2rem" }}
        >
          <a
            rel="noreferrer"
            target="_blank"
            style={{ color: "blue" }}
            href="https://github.com/hitgo00/simple-chrome-extension/releases/download/1.0.7/simple-chrome-extension.zip"
          >
            Download Simple Chrome Extension
          </a>{" "}
          and unzip it.
          <div style={{ marginTop: "20px" }}>
            <ul>
              <li>Go to Chrome Extenstions settings (chrome://extensions/)</li>
              <li>Turn on Developer Mode</li>
              <li>
                Click on Load Unpacked and selected the unzipped folder you just
                downloaded
              </li>
              <li>
                You'll see the extension id like this, copy that and past it
                below.
              </li>
            </ul>
          </div>
          <img
            style={{ marginTop: "20px" }}
            src="./extensionId.png"
            alt="extensionId"
            width="630px"
          />
          <Input
            fullWidth
            value={extensionIdInput}
            onChange={(e) => setExtensionIdInput(e.target.value)}
            style={{ marginTop: "20px" }}
            placeholder="Enter the extension id of Simple Chrome Extension"
          />
          <Button
            onClick={onButtonClik}
            style={{ marginTop: "20px" }}
            variant="outlined"
          >
            Connect with extension!
          </Button>
        </div>
      </Dialog>
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
