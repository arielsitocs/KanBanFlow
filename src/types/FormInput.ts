interface FormInputProps {
  type: string;
  title: string;
  placeholder?: string;
  inputValue?: string;
  setInputValue?: (value: string) => void;
  email?: string;
  setEmail?: (email: string) => void;
  password?: string;
  setPassword?: (password: string) => void;
  text?: string;
  setText?: (text: string) => void;
  date?: string;
  setDate?: (date: string) => void;
}

export default FormInputProps;
