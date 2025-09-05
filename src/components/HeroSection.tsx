import { Button } from "@/components/ui/button";
import { MessageCircle, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-background/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2 text-primary-glow font-medium">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm uppercase tracking-wide font-inter">IA Avanzada</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-space font-bold leading-tight">
                Domina el
                <span className="block text-primary-glow">Código Vial</span>
                con IA
              </h1>
              <p className="text-xl lg:text-2xl font-inter max-w-3xl mx-auto">
                Tu asistente inteligente para consultas de tránsito y generación
                automática de exámenes. Aprende de forma rápida y efectiva.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => scrollToSection('rag')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Hacer Consulta
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link to="/test">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary/30 hover:border-primary text-foreground hover:bg-primary/5 backdrop-blur-sm"
                >
                  Generar Examen
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;