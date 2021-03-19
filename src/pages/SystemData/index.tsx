import { useEffect, useState } from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@material-ui/core/LinearProgress";

const extensionId = "ojohoekgfkecjbppebikfbjgbcanghhh";

const renderSystemData = (systemData: any) => {
  const { cpuInfo, memInfo } = systemData;

  return (
    <>
      <h3>
        {cpuInfo.modelName}, {`CPU architecture: ${cpuInfo.archName}`},{" "}
        {`No of processors: ${cpuInfo.numOfProcessors}`}{" "}
      </h3>
      <h4>
        Memory {`(Available: ${memInfo.availableCapacity}/${memInfo.capacity})`}
      </h4>
      <LinearProgress
        style={{ margin: "4px", height: "10px", maxWidth: "70%"  }}
        variant="determinate"
        value={
          ((memInfo.capacity - memInfo.availableCapacity) / memInfo.capacity) *
          100
        }
      />
      <h4>Processors usage</h4>
      <div
        style={{ display: "flex", flexDirection: "column", maxWidth: "70%" }}
      >
        {cpuInfo.processors.map((proc: any) => {
          const { usage } = proc;
          return (
            <div style={{ margin: "4px" }}>
              <h5> {`${((usage.total - usage.idle) / usage.total) * 100}% usage`}</h5>
              <LinearProgress
                variant="determinate"
                style={{ height: "10px" }}
                value={((usage.total - usage.idle) / usage.total) * 100}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default function SystemData() {
  const [systemData, setSystemData] = useState<any>(undefined);

  useEffect(() => {
    //@ts-ignore
    if (chrome) {
      //@ts-ignore
      // chrome.runtime.sendMessage(extensionId, { message: "helllo" }, console.log);
      const port = chrome.runtime.connect(extensionId);
      port.postMessage({ m: "hello" });
      port.onMessage.addListener((message: any) => {
        if (Object.keys(message).length !== 0) {
          console.log(message);
          setSystemData(message);
        }
      });
    }
  }, []);

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
      {systemData ? renderSystemData(systemData) : null}
    </div>
  );
}
