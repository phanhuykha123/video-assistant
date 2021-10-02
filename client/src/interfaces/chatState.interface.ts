export interface ChatState {
  node: Node;
  timeout: number;
  autoplay: boolean;
  isLoading: boolean;
  userState: UserState;
  productInfo: any;
  productList: any;
  nextNode: Node;
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

export interface Product {
  text: string;
  description: string;
  thumb: string;
  price: string;
}
