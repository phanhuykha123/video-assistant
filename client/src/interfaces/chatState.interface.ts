export interface ChatState {
  node: Node;
  timeout: number;
  autoplay: boolean;
  isLoading: boolean;
}

export interface Node {
  name: string;
  type: string;
  videoTitle: string;
  videoUrl: string;
  buttons: Button[];
}

export interface Button {
  text: string;
  event: String;
  data: String;
}
