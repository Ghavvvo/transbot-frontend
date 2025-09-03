import { Button } from "@/components/ui/button";
import { MessageCircle, BookOpen, Sparkles } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.jpg";

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
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-primary-glow font-medium">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm uppercase tracking-wide font-inter">IA Avanzada</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-space font-bold text-white leading-tight">
                Domina el 
                <span className="block text-primary-glow">Código Vial</span>
                con IA
              </h1>
              <p className="text-xl text-white/80 font-inter max-w-lg">
                Tu asistente inteligente para consultas de tránsito y generación 
                automática de exámenes. Aprende de forma rápida y efectiva.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="minimal" 
                size="lg" 
                className="text-white border-white/20 hover:bg-white/10"
                onClick={() => scrollToSection('rag')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Hacer Consulta
              </Button>
              <Button 
                variant="minimal" 
                size="lg" 
                className="text-white border-white/20 hover:bg-white/10"
                onClick={() => scrollToSection('exams')}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Generar Examen
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-glow">
              <img 
                src={heroIllustration} 
                alt="Transbot AI Interface Illustration" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;