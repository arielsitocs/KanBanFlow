export const calculateBoardProgress = (completedTasks: number, pendingTasks: number, inProgressTasks: number) => {
  const percentage = completedTasks / (completedTasks + pendingTasks + inProgressTasks) * 100;
  return Number(percentage.toFixed(2));
}

