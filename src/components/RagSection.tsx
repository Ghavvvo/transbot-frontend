import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const RagSection = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // Agregar pregunta del usuario
    setMessages(prev => [...prev, { text: question, isUser: true }]);
    
    // Simular respuesta del AI (aquí se conectaría con el RAG real)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Esta es una respuesta simulada del asistente IA. En la implementación real, aquí se conectaría con el sistema RAG para obtener información precisa sobre normativas de tránsito.",
        isUser: false 
      }]);
    }, 1000);
    
    setQuestion("");
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
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="¿Cuál es la velocidad máxima en zona urbana?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="pr-16 font-inter text-lg py-6 border-border/50 focus:border-primary bg-background/50"
                />
                <Button 
                  type="submit" 
                  variant="minimal"
                  size="sm" 
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