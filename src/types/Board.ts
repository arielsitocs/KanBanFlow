interface BoardTypes {
  boardid: number;
  title: string;
  pendingTasks?: number;
  inProgressTasks?: number;
  completedTasks?: number;
  state?: boolean;
  setState?: (state: boolean) => void;
}

export default BoardTypes;