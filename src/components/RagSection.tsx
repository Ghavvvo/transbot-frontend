import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useChat } from "@/hooks/useChat";
import SourcesDisplay from "./SourcesDisplay";
import { Alert, AlertDescription } from "@/components/ui/alert";

const RagSection = () => {
  const [question, setQuestion] = useState("");
  const { messages, isLoading, error, sendMessage } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    await sendMessage(question);
    setQuestion("");
  };

  return (
    <section id="rag" className="min-h-screen flex items-center justify-center py-10 px-4 bg-gradient-to-br from-background via-background to-primary/5">
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
              <Alert className="mb-6 border-destructive/50 bg-destructive/10">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-destructive">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Single Response Display */}
            {messages.length > 0 && (
              <div className="mb-6 space-y-4">
                {/* Show only latest AI response */}
                {(() => {
                  const lastAi = [...messages].reverse().find(m => !m.isUser);
                  if (!lastAi) return null;
                  return (
                    <div className="flex justify-start">
                      <div className="w-full">
                        <div className="p-4 rounded-lg bg-muted text-foreground">
                          <p className="text-sm font-inter leading-relaxed whitespace-pre-wrap">{lastAi.text}</p>
                          {lastAi.sources && (
                            <SourcesDisplay sources={lastAi.sources} />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-foreground p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm font-inter">Procesando tu consulta...</span>
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
                  size="sm"
                  disabled={!question.trim() || isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
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