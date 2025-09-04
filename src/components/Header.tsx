import { Button } from "@/components/ui/button";
import { Car, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
            <Car className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-space font-bold text-foreground">
            Transbot
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <nav className="hidden lg:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-sm font-inter text-muted-foreground hover:text-foreground transition-colors"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollToSection('rag')}
              className="text-sm font-inter text-muted-foreground hover:text-foreground transition-colors"
            >
              Consultas IA
            </button>
            <button 
              onClick={() => scrollToSection('exams')}
              className="text-sm font-inter text-muted-foreground hover:text-foreground transition-colors"
            >
              Exámenes
            </button>
          </nav>
          
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <button 
              onClick={() => scrollToSection('hero')}
              className="block w-full text-left py-2 text-sm font-inter text-muted-foreground hover:text-foreground transition-colors"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollToSection('rag')}
              className="block w-full text-left py-2 text-sm font-inter text-muted-foreground hover:text-foreground transition-colors"
            >
              Consultas IA
            </button>
            <button 
              onClick={() => scrollToSection('exams')}
              className="block w-full text-left py-2 text-sm font-inter text-muted-foreground hover:text-foreground transition-colors"
            >
              Exámenes
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;