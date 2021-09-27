export interface ChatState {
  node: Node;
  timeout: number;
  autoplay: boolean;
  isLoading: boolean;
  userState: UserState;
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
  event: string;
  data: string;
}

export interface UserState {
  name: string;
  language: string;
}
