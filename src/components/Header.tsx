import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

const Header = () => {
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
        <Button variant="login" size="lg">
          Iniciar Sesión
        </Button>
      </div>
    </header>
  );
};

export default Header;