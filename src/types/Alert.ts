interface AlertTypes {
  message: string;
  type: string;
  prop: string;
  status: boolean;
  setStatus: (status: boolean) => void;
  action: () => void;
}