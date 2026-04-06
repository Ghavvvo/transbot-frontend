import { useState, useCallback } from 'react';
import { TestGenerationRequest, TestGenerationResponse, TestQuestion } from '@/types/api';
import { apiService } from '@/services/apiService';

export const useTestGeneration = () => {
  const [currentTest, setCurrentTest] = useState<TestGenerationResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const generateTest = useCallback(async (numQuestions: number = 20) => {
    setIsGenerating(true);
    setError(null);
    setCurrentTest(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);

    try {
      const request: TestGenerationRequest = {
        num_questions: numQuestions,
      };

      const response = await apiService.generateTest(request);
      setCurrentTest(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al generar el examen');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const selectAnswer = useCallback((questionIndex: number, answer: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  }, []);

  const goToNextQuestion = useCallback(() => {
    if (currentTest && currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentTest, currentQuestionIndex]);

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const goToQuestion = useCallback((index: number) => {
    if (currentTest && index >= 0 && index < currentTest.questions.length) {
      setCurrentQuestionIndex(index);
    }
  }, [currentTest]);

  const submitTest = useCallback(() => {
    setShowResults(true);
  }, []);

  const calculateResults = useCallback(() => {
    if (!currentTest) return { score: 0, percentage: 0, correctAnswers: 0, totalQuestions: 0 };

    const correctAnswers = currentTest.questions.reduce((count, question, index) => {
      const userAnswer = answers[index];
      return userAnswer === question.correct_answer ? count + 1 : count;
    }, 0);

    const totalQuestions = currentTest.questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    return {
      score: correctAnswers,
      percentage,
      correctAnswers,
      totalQuestions
    };
  }, [currentTest, answers]);

  const resetTest = useCallback(() => {
    setCurrentTest(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setError(null);
  }, []);

  const isAnswered = useCallback((questionIndex: number) => {
    return answers[questionIndex] !== undefined;
  }, [answers]);

  const getAnswerForQuestion = useCallback((questionIndex: number) => {
    return answers[questionIndex];
  }, [answers]);

  return {
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
  };
};
