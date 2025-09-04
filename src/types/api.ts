// Types for API communication
export interface ChatRequest {
  query: string;
  max_articles?: number;
}

export interface ChatSource {
  id: string;
  contenido: string;
  similarity_score: number;
  relevance: "Alta" | "Media" | "Baja";
}

export interface ChatResponse {
  query: string;
  response: string;
  sources: ChatSource[];
  confidence: number;
  model_used: string;
  articles_consulted: number;
}

export interface HealthResponse {
  status: string;
  database_ready: boolean;
  total_articles: number;
  rag_enabled: boolean;
  llm_provider?: string;
}

export interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: ChatSource[];
  confidence?: number;
}
