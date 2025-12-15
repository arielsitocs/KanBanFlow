interface NotificationTypes {
  type: 'success' | 'error' | 'info';
  message: string;
  state: boolean;
  setState: (state: boolean) => void;
}