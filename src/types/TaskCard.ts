import TaskTypes from "./Task";

interface TaskCardTypes {
  state: 'pending' | 'in progress' | 'completed';
  board: any;
  tasks: TaskTypes[];
}

export default TaskCardTypes;