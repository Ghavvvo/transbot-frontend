import { Button } from "@/components/ui/button";
import { FileQuestion, Zap, BookOpen, Timer, Award, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import examIllustration from "@/assets/exam-illustration.jpg";

const features = [
	{
		icon: BookOpen,
		title: "Múltiples Temas",
		description: "Señales, normativas, infracciones y más",
	},
	{
		icon: Timer,
		title: "Tiempo Real",
		description: "Genera exámenes en segundos",
	},
	{
		icon: Award,
		title: "Calificación",
		description: "Resultados y retroalimentación instantánea",
	},
	{
		icon: FileText,
		title: "Personalizado",
		description: "Adapta dificultad y contenido",
	},
];

const ExamSection = () => {
	return (
		<section
			id="exams"
			className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-background"
		>
			<div className="container mx-auto max-w-6xl">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div className="space-y-8">
						<div className="space-y-4">
							<div className="flex items-center space-x-2 text-primary font-medium">
								<FileQuestion className="h-5 w-5" />
								<span className="text-sm uppercase tracking-wide">
									Exámenes IA
								</span>
							</div>
							<h2 className="text-3xl md:text-4xl font-space font-bold text-foreground">
								Genera Exámenes
								<span className="block text-primary">Automatizados</span>
							</h2>
							<p className="text-lg text-muted-foreground font-inter">
								Crea exámenes personalizados de tránsito con preguntas
								actualizadas y adaptadas a tu nivel de conocimiento.
							</p>
						</div>

						<div className="grid sm:grid-cols-2 gap-4">
							{features.map((feature, index) => (
								<div
									key={index}
									className="p-4 bg-card rounded-xl border border-border"
								>
									<feature.icon className="h-8 w-8 text-primary mb-3" />
									<h3 className="font-space font-semibold mb-2">
										{feature.title}
									</h3>
									<p className="text-sm text-muted-foreground font-inter">
										{feature.description}
									</p>
								</div>
							))}
						</div>

						<Link to="/test">
							<Button
								size="lg"
								className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
							>
								<Zap className="mr-2 h-5 w-5" />
								Generar Examen Ahora
								<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
							</Button>
						</Link>
					</div>

					<div className="relative">
						<div className="rounded-2xl overflow-hidden shadow-card">
							<img
								src={examIllustration}
								alt="Exam Generator Illustration"
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