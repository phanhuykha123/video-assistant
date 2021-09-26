export interface ChatNode {
  language: Language[];
  name: null | string;
}

export interface Language {
  buttons: any[];
  condition: any[];
  lang: string;
  regex: string;
  text: string;
}
