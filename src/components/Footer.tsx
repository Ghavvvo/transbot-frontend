import { Car, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Car className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-space font-bold">Transbot</h3>
            </div>
            <p className="text-primary-foreground/80 font-inter">
              La aplicación de inteligencia artificial más avanzada 
              para consultas de tránsito y generación de exámenes.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-space font-semibold">Funciones</h4>
            <ul className="space-y-2 text-primary-foreground/80 font-inter">
              <li>Consultas RAG</li>
              <li>Exámenes Automáticos</li>
              <li>Respuestas Instantáneas</li>
              <li>Calificación en Tiempo Real</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-space font-semibold">Soporte</h4>
            <ul className="space-y-2 text-primary-foreground/80 font-inter">
              <li>Documentación</li>
              <li>Centro de Ayuda</li>
              <li>Contacto</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm font-inter">
            © 2024 Transbot. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-1 text-primary-foreground/60 text-sm font-inter mt-4 md:mt-0">
            <span>Hecho con</span>
            <Heart className="h-4 w-4 text-red-400 fill-current" />
            <span>para mejorar la educación vial</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;