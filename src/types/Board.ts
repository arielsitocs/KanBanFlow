interface BoardTypes {
  boardid: number;
  title: string;
  userid: number;
  pendingTasks?: number;
  inProgressTasks?: number;
  completedTasks?: number;
  state?: boolean;
  setState?: (state: boolean) => void;
}

export default BoardTypes;