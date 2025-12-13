// funcion que trae las tareas desde la api //
async function getTasks() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/getall`, { cache: 'no-store' });

    if (!response.ok) return [];

    return await response.json();
  } catch (error) {
    console.error("Error al traer las tareas: ", error);
    return [];
  }
}

const tasks = await getTasks();

export const calculateBoardProgress = (completedTasks: number, pendingTasks: number, inProgressTasks: number) => {
  const percentage = completedTasks / (completedTasks + pendingTasks + inProgressTasks) * 100;
  return Number(percentage.toFixed(2));
}

export const countTasksByState = (boardid: number) => {
  const pendingTasks = tasks.filter((task: any) => task.boardid === boardid && task.status === 'pending').length;
  const inProgressTasks = tasks.filter((task: any) => task.boardid === boardid && task.status === 'in progress').length;
  const completedTasks = tasks.filter((task: any) => task.boardid === boardid && task.status === 'completed').length;

  return { pendingTasks, inProgressTasks, completedTasks };
}

