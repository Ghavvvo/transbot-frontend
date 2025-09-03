import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-traffic.jpg";

const HeroSection = () => {
  return (
    <section className="bg-gradient-hero py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary font-medium">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm uppercase tracking-wide">IA Avanzada</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-space font-bold text-foreground leading-tight">
                Transbot
                <span className="block text-primary">Tu Asistente</span>
                <span className="block text-muted-foreground text-3xl md:text-5xl">
                  de Tránsito IA
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg font-inter">
                Consulta información de tránsito y genera exámenes automáticamente 
                con la potencia de la inteligencia artificial.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group">
                Comenzar Gratis
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                Ver Demo
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img 
                src={heroImage} 
                alt="Transbot AI Traffic Assistant" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;