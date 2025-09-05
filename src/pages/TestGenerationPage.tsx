import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  FileQuestion,
  Loader2,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  Clock,
  AlertCircle,
  BookOpen
} from "lucide-react";
import { useTestGeneration } from "@/hooks/useTestGeneration";
import { useState } from "react";
import { Link } from "react-router-dom";

const TestGenerationPage = () => {
  const {
    currentTest,
    isGenerating,
    error,
    currentQuestionIndex,
    answers,
    showResults,
    generateTest,
    selectAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    goToQuestion,
    submitTest,
    calculateResults,
    resetTest,
    isAnswered,
    getAnswerForQuestion,
  } = useTestGeneration();

  const [selectedNumQuestions, setSelectedNumQuestions] = useState(20);

  const handleGenerateTest = () => {
    generateTest(selectedNumQuestions);
  };

  const handleAnswerSelect = (answer: number) => {
    selectAnswer(currentQuestionIndex, answer);
  };

  const results = calculateResults();
  const currentQuestion = currentTest?.questions[currentQuestionIndex];
  const progress = currentTest ? ((currentQuestionIndex + 1) / currentTest.questions.length) * 100 : 0;

  // Question numbers component for navigation
  const QuestionNavigation = () => (
    <div className="flex flex-wrap gap-2 mb-6">
      {currentTest?.questions.map((_, index) => (
        <Button
          key={index}
          variant={index === currentQuestionIndex ? "default" : "outline"}
          size="sm"
          className={`w-10 h-10 ${
            isAnswered(index) 
              ? "bg-primary/20 border-primary text-primary" 
              : "border-border"
          }`}
          onClick={() => goToQuestion(index)}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );

  // Test generation setup screen
  if (!currentTest && !isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-primary font-medium">
                <FileQuestion className="h-6 w-6" />
                <span className="text-sm uppercase tracking-wide font-inter">Examen de Tránsito</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-space font-bold text-foreground">
                Genera tu
                <span className="block text-primary">Examen Personalizado</span>
              </h1>
              <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
                Crea un examen de tránsito con preguntas generadas por IA basadas en la Ley 109.
                Elige el número de preguntas y pon a prueba tus conocimientos.
              </p>
            </div>

            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileQuestion className="h-5 w-5 text-primary" />
                  Configurar Examen
                </CardTitle>
                <CardDescription>
                  Selecciona el número de preguntas para tu examen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <label className="text-sm font-medium">Número de preguntas:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 20, 30].map((num) => (
                      <Button
                        key={num}
                        variant={selectedNumQuestions === num ? "default" : "outline"}
                        onClick={() => setSelectedNumQuestions(num)}
                        className="h-12"
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[40, 50].map((num) => (
                      <Button
                        key={num}
                        variant={selectedNumQuestions === num ? "default" : "outline"}
                        onClick={() => setSelectedNumQuestions(num)}
                        className="h-12"
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>

                {error && (
                  <Alert className="border-destructive/50 bg-destructive/10">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-destructive">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleGenerateTest}
                  className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
                  size="lg"
                >
                  <FileQuestion className="mr-2 h-5 w-5" />
                  Generar Examen ({selectedNumQuestions} preguntas)
                </Button>

                <div className="text-center">
                  <Link to="/">
                    <Button variant="outline">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Volver al inicio
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Loading screen
  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center space-y-6">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-space font-semibold">Generando tu examen...</h3>
              <p className="text-muted-foreground font-inter">
                Estamos creando {selectedNumQuestions} preguntas personalizadas basadas en la Ley 109
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results screen
  if (showResults && currentTest) {
    const passed = results.percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {passed ? <Trophy className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
              </div>
              <CardTitle className="text-3xl font-space">
                {passed ? '¡Felicitaciones!' : 'Sigue practicando'}
              </CardTitle>
              <CardDescription className="text-lg">
                {passed
                  ? 'Has aprobado el examen de tránsito'
                  : 'Necesitas más práctica para aprobar'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{results.score}</div>
                  <div className="text-sm text-muted-foreground">Respuestas correctas</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{results.percentage}%</div>
                  <div className="text-sm text-muted-foreground">Puntuación final</div>
                </div>
              </div>

              <Progress value={results.percentage} className="h-3" />

              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Respondiste correctamente {results.score} de {results.totalQuestions} preguntas
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={resetTest} variant="outline">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Generar nuevo examen
                  </Button>
                  <Link to="/">
                    <Button variant="outline">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Volver al inicio
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Test taking screen
  if (currentTest && currentQuestion) {
    const answeredQuestions = Object.keys(answers).length;
    const allAnswered = answeredQuestions === currentTest.questions.length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <FileQuestion className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-space font-bold">Examen de Tránsito</h1>
              </div>
              <Badge variant="outline" className="text-sm">
                {currentTest.test_id}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Pregunta {currentQuestionIndex + 1} de {currentTest.questions.length}</span>
                <span>{answeredQuestions} respondidas</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Question Navigation */}
          <QuestionNavigation />

          {/* Current Question */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg leading-relaxed">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const optionNumber = index + 1;
                const isSelected = getAnswerForQuestion(currentQuestionIndex) === optionNumber;

                return (
                  <Button
                    key={index}
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full text-left justify-start h-auto p-4 ${
                      isSelected ? "bg-primary text-primary-foreground" : ""
                    }`}
                    onClick={() => handleAnswerSelect(optionNumber)}
                  >
                    <span className="font-medium mr-3">{optionNumber}.</span>
                    <span>{option}</span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Article Reference */}
          <Card className="mb-6 bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                <BookOpen className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Artículo {currentQuestion.article_id}</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {currentQuestion.article_content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>

            <div className="flex space-x-2">
              {currentQuestionIndex === currentTest.questions.length - 1 ? (
                <Button
                  onClick={submitTest}
                  disabled={!allAnswered}
                  className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Finalizar Examen
                </Button>
              ) : (
                <Button
                  onClick={goToNextQuestion}
                  disabled={currentQuestionIndex === currentTest.questions.length - 1}
                >
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {!allAnswered && (
            <Alert className="mt-6">
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Debes responder todas las preguntas antes de finalizar el examen.
                Te faltan {currentTest.questions.length - answeredQuestions} preguntas.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default TestGenerationPage;
