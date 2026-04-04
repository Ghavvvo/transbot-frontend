import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Sparkles, AlertCircle } from "lucide-react";
import { useState } from "react";
import { askQuestion } from "@/services/api";
import { Alert, AlertDescription } from "@/components/ui/alert";

const RagSection = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;
    
    // Agregar pregunta del usuario
    setMessages(prev => [...prev, { text: question, isUser: true }]);
    const currentQuestion = question;
    setQuestion("");
    setIsLoading(true);
    setError(null);
    
    try {
      // Llamada REAL al backend RAG
      const result = await askQuestion(currentQuestion);
      
      setMessages(prev => [...prev, { 
        text: result.answer,
        isUser: false 
      }]);
    } catch (err) {
      setError('Error al obtener respuesta. Por favor, intenta de nuevo.');
      console.error('Error:', err);
      
      // Remover la pregunta si hubo error
      setMessages(prev => prev.slice(0, -1));
      setQuestion(currentQuestion);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="rag" className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-primary font-medium">
              <MessageCircle className="h-6 w-6" />
              <span className="text-sm uppercase tracking-wide font-inter">Consultas IA</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-space font-bold text-foreground">
              Pregúntale a nuestro
              <span className="block text-primary">Asistente IA</span>
            </h2>
            <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
              Obtén respuestas instantáneas sobre normativas de tránsito, 
              señales, infracciones y todo lo relacionado con el código vial.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-card border border-border max-w-2xl mx-auto">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Chat Messages */}
            {messages.length > 0 && (
              <div className="mb-6 max-h-60 overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                      message.isUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-foreground'
                    }`}>
                      <p className="text-sm font-inter">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="¿Cuál es la velocidad máxima en zona urbana?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={isLoading}
                  className="pr-16 font-inter text-lg py-6 border-border/50 focus:border-primary bg-background/50"
                />
                <Button 
                  type="submit" 
                  variant="minimal"
                  size="sm" 
                  disabled={isLoading || !question.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
            
            <div className="mt-6 p-4 bg-muted/30 rounded-xl">
              <div className="flex items-start space-x-2 text-muted-foreground">
                <Sparkles className="h-4 w-4 mt-0.5 text-primary" />
                <p className="text-sm font-inter">
                  <span className="font-medium">Ejemplos:</span> "¿Qué documentos necesito para conducir?" • 
                  "¿Cuáles son las multas por exceso de velocidad?" • 
                  "¿Cómo renovar la licencia de conducir?"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RagSection;
