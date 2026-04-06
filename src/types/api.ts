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

// Test generation types
export interface TestGenerationRequest {
  num_questions?: number;
}

export interface TestQuestion {
  question: string;
  options: string[];
  correct_answer: 1 | 2 | 3;
  article_id: number;
  article_content: string;
}

export interface TestGenerationResponse {
  test_id: string;
  total_questions: number;
  questions: TestQuestion[];
  generated_at: string;
  articles_used: number[];
}
