import BoardTypes from "./Board";

interface NewTaskFormTypes {
  state: boolean;
  setState: (state: boolean) => void;
  board: BoardTypes;
}

export default NewTaskFormTypes;