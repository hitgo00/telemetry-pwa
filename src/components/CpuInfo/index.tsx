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
import { MemInfo, CpuInfo as ICpuInfo } from "../../pages/SystemData/types";
import { wasmBrowserInstantiate, toGiga } from "../../constants";

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
}

export default function CpuInfo(props: CpuInfoProps) {
  const { cpuInfo, memInfo } = props;
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
      <h3>
        {cpuInfo.modelName}, {`CPU architecture: ${cpuInfo.archName}`},{" "}
        {`No of processors: ${cpuInfo.numOfProcessors}`}{" "}
      </h3>
      <h4>
        Memory{" "}
        {`(Available: ${toGiga(memInfo.availableCapacity)}GB/${toGiga(
          memInfo.capacity
        )}GB)`}
      </h4>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "40%" }}>
          <svg viewBox="0 0 400 400" width="100%" height="100%">
            <VictoryPie
              standalone={false}
              animate={{ duration: 1000 }}
              width={400}
              height={400}
              data={memoryData}
              innerRadius={120}
              cornerRadius={25}
              labels={() => null}
              style={{
                data: {
                  fill: ({ datum }) => {
                    const color = datum.y > 90 ? "red" : "green";
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
                    text={`Memory usage\n${availableMemory.toFixed(4)}%`}
                    style={{ fontSize: 35 }}
                  />
                );
              }}
            </VictoryAnimation>
          </svg>
        </div>
        <div>
          <VictoryChart
            height={700}
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
      </div>
    </div>
  );
}
