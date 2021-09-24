export interface ButtonData {
  next: string;
  key: string;
  value: string;
}

export interface FormButton {
  text: string;
  event: string;
  data: ButtonData | string;
  nextNodeConditionsData: any;
}

export interface FormData {
  text: string;
  buttons: FormButton[];
  regex: string;
  condition: any;
}
