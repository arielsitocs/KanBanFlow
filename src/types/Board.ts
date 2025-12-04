interface BoardTypes {
  id: string;
  title: string;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  state?: boolean;
  setState?: (state: boolean) => void;
}

export default BoardTypes;