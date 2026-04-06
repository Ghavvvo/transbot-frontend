import { ChatRequest, ChatResponse, HealthResponse, TestGenerationRequest, TestGenerationResponse } from '@/types/api';

const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  // Check server health and readiness
  async checkHealth(): Promise<HealthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        throw new Error('Health check failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }

  // Send chat message to RAG system
  async sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Pregunta inválida o vacía');
        }
        throw new Error('Error al procesar la consulta');
      }

      return await response.json();
    } catch (error) {
      console.error('Chat API error:', error);
      throw error;
    }
  }

  // Generate traffic test
  async generateTest(request: TestGenerationRequest): Promise<TestGenerationResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/generate-test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Número de preguntas inválido (debe ser entre 1 y 50)');
        }
        throw new Error('Error al generar el examen');
      }

      return await response.json();
    } catch (error) {
      console.error('Test generation API error:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
