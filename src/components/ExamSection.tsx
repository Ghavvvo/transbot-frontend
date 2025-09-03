import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Award, Timer } from "lucide-react";
import examImage from "@/assets/exam-generator.jpg";

const ExamSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-accent font-medium">
                <FileText className="h-5 w-5" />
                <span className="text-sm uppercase tracking-wide">Exámenes IA</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-space font-bold text-foreground">
                Genera Exámenes
                <span className="block text-primary">Automáticamente</span>
              </h2>
              <p className="text-lg text-muted-foreground font-inter">
                Crea exámenes de tránsito personalizados al instante. 
                Perfectos para practicar antes del examen oficial.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader className="pb-3">
                  <div className="p-2 bg-primary/10 rounded-lg w-fit">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-sm font-space">Múltiples Temas</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs font-inter">
                    Señales, normativas, infracciones y más
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader className="pb-3">
                  <div className="p-2 bg-secondary/10 rounded-lg w-fit">
                    <Timer className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle className="text-sm font-space">Tiempo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs font-inter">
                    Genera exámenes en segundos
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader className="pb-3">
                  <div className="p-2 bg-accent/10 rounded-lg w-fit">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-sm font-space">Calificación</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs font-inter">
                    Resultados y retroalimentación instantánea
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader className="pb-3">
                  <div className="p-2 bg-primary-glow/10 rounded-lg w-fit">
                    <FileText className="h-5 w-5 text-primary-glow" />
                  </div>
                  <CardTitle className="text-sm font-space">Personalizado</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs font-inter">
                    Adapta dificultad y contenido
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <Button variant="secondary" size="xl" className="w-full sm:w-auto">
              Generar Examen Ahora
            </Button>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img 
                src={examImage} 
                alt="Exam Generator Interface" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamSection;