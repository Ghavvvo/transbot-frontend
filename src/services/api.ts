const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface QueryResponse {
  answer: string;
  sources?: any[];
  confidence?: number;
  error?: string;
}

export interface HealthResponse {
  status: string;
  message: string;
  timestamp?: string;
}

/**
 * Envía una pregunta al sistema RAG
 */
export async function askQuestion(question: string): Promise<QueryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al consultar la API:', error);
    throw error;
  }
}

/**
 * Verifica el estado de salud del backend
 */
export async function healthCheck(): Promise<HealthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    
    if (!response.ok) {
      throw new Error('Backend no disponible');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en healthcheck:', error);
    throw error;
  }
}
