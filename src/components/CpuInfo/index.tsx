import {
  VictoryAnimation,
  VictoryPie,
  VictoryLabel,
  VictoryAxis,
  VictoryStack,
  VictoryChart,
  VictoryBar,
  VictoryLegend,
  VictoryTooltip,
} from "victory";
import {
  MemInfo,
  CpuInfo as ICpuInfo,
  StorageInfo,
} from "../../pages/SystemData/types";
import { wasmBrowserInstantiate, toGiga } from "../../constants";
import { Card } from "@material-ui/core";
import { ComputerOutlined } from "@material-ui/icons";
import MemoryIcon from "@material-ui/icons/Memory";
import ProcessorIcon from "../../assets/Processor";
import HashtagIcon from "../../assets/Hashtag";
import RamIcon from "../../assets/Memory";

//loading and using WASN

//@ts-ignore
const go = new window.Go(); // Defined in wasm_exec.js. Don't forget to add this in your index.html.
let wasmAddFn: CallableFunction;
let wasmPercentageFn: CallableFunction;
const runWasmAdd = async () => {
  // Get the importObject from the go instance.
  const importObject = go.importObject;

  // Instantiate our wasm module
  const wasmModule = await wasmBrowserInstantiate("./main.wasm", importObject);

  // Allow the wasm_exec go instance, bootstrap and execute our wasm module
  go.run(wasmModule.instance);

  wasmAddFn = wasmModule.instance.exports.add as CallableFunction;
  wasmPercentageFn = wasmModule.instance.exports.percentage as CallableFunction;
};
runWasmAdd();

interface CpuInfoProps {
  cpuInfo: ICpuInfo;
  memInfo: MemInfo;
  strInfo: StorageInfo[];
}

export default function CpuInfo(props: CpuInfoProps) {
  const { cpuInfo, memInfo, strInfo } = props;

  console.log(strInfo);

  const availableMemory =
    ((memInfo.capacity - memInfo.availableCapacity) / memInfo.capacity) * 100;

  const memoryData = [
    { x: 1, y: availableMemory },
    { x: 2, y: 100 - availableMemory },
  ];

  const getProcessorsData = () => {
    const kernelUsage: { x: number; y: number }[] = [];
    const userUsage: { x: number; y: number }[] = [];

    cpuInfo.processors?.forEach((proc, index: number) => {
      const { usage } = proc;

      kernelUsage.push({
        x: wasmAddFn ? wasmAddFn(index, 1) : index + 1,
        y: wasmPercentageFn
          ? wasmPercentageFn(usage.kernel, usage.total)
          : (usage.kernel / usage.total) * 100,
      });
      userUsage.push({
        x: wasmAddFn ? wasmAddFn(index, 1) : index + 1,
        y: wasmPercentageFn
          ? wasmPercentageFn(usage.user, usage.total)
          : (usage.user / usage.total) * 100,
      });
    });
    return [kernelUsage, userUsage];
  };

  const processorsData = getProcessorsData();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ display: "flex", margin: "2%" }}>
        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ComputerOutlined style={{ width: "40px", height: "40px" }} />
              <h2 style={{ marginLeft: "12px" }}>Model Name</h2>
            </div>
            <h3>{cpuInfo.modelName}</h3>
          </div>
        </Card>
        <Card style={{ marginLeft: "14px", marginRight: "14px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ProcessorIcon style={{ width: "40px", height: "40px" }} />
              <h2 style={{ marginLeft: "12px" }}>CPU Architecture</h2>
            </div>
            <h3>{cpuInfo.archName}</h3>
          </div>
        </Card>

        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <HashtagIcon style={{ width: "40px", height: "40px" }} />
              <h2 style={{ marginLeft: "12px" }}>Number of Processors</h2>
            </div>
            <h3>{cpuInfo.numOfProcessors}</h3>
          </div>
        </Card>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "540px",
        }}
      >
        <Card>
          <div>
            <VictoryChart
              height={540}
              width={400}
              domainPadding={{ x: 30, y: 20 }}
            >
              <VictoryLegend
                x={125}
                y={50}
                title="Processors usage"
                centerTitle
                orientation="horizontal"
                gutter={20}
                style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
                data={[
                  { name: "Kernel usage", symbol: { fill: "#3477eb" } },
                  { name: "User usage", symbol: { fill: "#8ab5ff" } },
                ]}
              />
              <VictoryStack colorScale={["#3477eb", "#8ab5ff"]}>
                {processorsData.map((data, i) => {
                  return (
                    <VictoryBar
                      data={data}
                      labels={({ datum }) => `${datum.y}%`}
                      labelComponent={<VictoryTooltip flyoutHeight={60} />}
                      key={i}
                    />
                  );
                })}
              </VictoryStack>
              <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`} />
              <VictoryAxis
                label="(Hover on the bars to see realtime changes)"
                tickFormat={processorsData[0].map((_, i) => i + 1)}
              />
            </VictoryChart>
          </div>
        </Card>
        <Card
          style={{
            height: "80%",
            width: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "10%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <RamIcon style={{ width: "40px", height: "40px" }} />
            <h2 style={{ marginLeft: "6px" }}>Memory</h2>
          </div>

          <div style={{ width: "100%" }}>
            <svg viewBox="0 0 400 400" width="100%" height="100%">
              <VictoryPie
                standalone={false}
                animate={{ duration: 1000 }}
                width={400}
                height={400}
                data={memoryData}
                innerRadius={105}
                cornerRadius={14}
                labels={() => null}
                style={{
                  data: {
                    fill: ({ datum }) => {
                      const color =
                        datum.y > 99
                          ? "red"
                          : datum.y > 80
                          ? "#EA4435"
                          : datum.y > 70
                          ? "#FFE27E"
                          : "#3576Ea";
                      return datum.x === 1 ? color : "transparent";
                    },
                  },
                }}
              />

              <VictoryAnimation duration={1000} data={memoryData}>
                {(newProps) => {
                  return (
                    <VictoryLabel
                      textAnchor="middle"
                      verticalAnchor="middle"
                      x={200}
                      y={200}
                      text={`Usage\n${availableMemory.toFixed(4)}%`}
                      style={{ fontSize: 35 }}
                    />
                  );
                }}
              </VictoryAnimation>
            </svg>
          </div>
          <h3>
            {`(Available: ${toGiga(memInfo.availableCapacity)}GB/${toGiga(
              memInfo.capacity
            )}GB)`}
          </h3>
        </Card>
      </div>
    </div>
  );
}
