import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import ragImage from "@/assets/rag-questions.jpg";

const RagSection = () => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se conectaría con el RAG
    console.log("Pregunta enviada:", question);
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img 
                src={ragImage} 
                alt="RAG Questions Interface" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-secondary font-medium">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm uppercase tracking-wide">Consultas IA</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-space font-bold text-foreground">
                Pregúntale a nuestro
                <span className="block text-primary">Asistente IA</span>
              </h2>
              <p className="text-lg text-muted-foreground font-inter">
                Obtén respuestas instantáneas sobre normativas de tránsito, 
                señales, infracciones y todo lo relacionado con el código vial.
              </p>
            </div>

            <div className="bg-gradient-card p-6 rounded-xl shadow-card border border-border">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="¿Cuál es la velocidad máxima en zona urbana?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="pr-12 font-inter"
                  />
                  <Button 
                    type="submit" 
                    size="sm" 
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
              
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground italic font-inter">
                  Ejemplo: "¿Qué documentos necesito para conducir?" o 
                  "¿Cuáles son las multas por exceso de velocidad?"
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