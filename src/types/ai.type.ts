import { Product } from "./product.type";

export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface AIChatRequest {
  message: string;
}

export interface AIChatResponse {
  success: boolean;
  answer: string;
  products: Product[];
}

export interface ChatState {
  messages: ChatMessage[];
  products: Product[];

  loading: boolean;
  error: string | null;
}

export interface SuggestedQuestion {
  id: string;
  text: string;
}

export interface UIMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  products?: Product[];
}
