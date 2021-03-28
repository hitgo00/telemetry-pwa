export interface Message {
    strInfo?: (StrInfoEntity)[] | null;
    cpuInfo: CpuInfo;
    memInfo: MemInfo;
  }
  export interface StrInfoEntity {
    capacity: number;
    id: string;
    name: string;
    type: string;
  }
  export interface CpuInfo {
    archName: string;
    features?: (string)[] | null;
    modelName: string;
    numOfProcessors: number;
    processors?: (ProcessorsEntity)[] | null;
    temperatures?: (null)[] | null;
  }
  export interface ProcessorsEntity {
    usage: Usage;
  }
  export interface Usage {
    idle: number;
    kernel: number;
    total: number;
    user: number;
  }
  export interface MemInfo {
    availableCapacity: number;
    capacity: number;
  }
  