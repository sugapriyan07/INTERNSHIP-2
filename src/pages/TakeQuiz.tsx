/*
 * TakeQuiz.tsx
 * This page displays a quiz for users to take
 * Shows one question at a time with navigation
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

function TakeQuiz() {
  // Get quiz ID from URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getQuizById, submitQuiz } = useQuiz();

  // State for tracking current question and answers
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // Get the quiz
  const quiz = getQuizById(Number(id));

  // Initialize answers array when quiz loads
  useEffect(() => {
    if (quiz) {
      // Create an array filled with -1 (unanswered) for each question
      setAnswers(new Array(quiz.questions.length).fill(-1));
    }
  }, [quiz]);

  // If quiz not found, show error
  if (!quiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Quiz Not Found
          </h1>
          <Link to="/quizzes">
            <Button>Back to Quiz List</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Current question data
  const question = quiz.questions[currentQuestion];
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  // Navigate to previous question
  const goToPrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Navigate to next question
  const goToNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Submit the quiz
  const handleSubmit = () => {
    // Check if all questions are answered
    const unanswered = answers.findIndex((a) => a === -1);
    if (unanswered !== -1) {
      alert(`Please answer Question ${unanswered + 1} before submitting.`);
      setCurrentQuestion(unanswered);
      return;
    }

    // Submit and go to results
    submitQuiz(quiz.id, answers);
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">{quiz.title}</h1>
          <Link to="/quizzes">
            <Button variant="outline" size="sm">Exit Quiz</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            {question.questionText}
          </h2>

          {/* Options */}
          <RadioGroup
            value={answers[currentQuestion]?.toString()}
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
          >
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted cursor-pointer"
                  onClick={() => handleAnswerSelect(index)}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={isFirstQuestion}
          >
            ← Previous
          </Button>

          {isLastQuestion ? (
            <Button onClick={handleSubmit}>
              Submit Quiz
            </Button>
          ) : (
            <Button onClick={goToNext}>
              Next →
            </Button>
          )}
        </div>

        {/* Question Navigator */}
        <div className="mt-8">
          <p className="text-sm text-muted-foreground mb-2">Jump to question:</p>
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors
                  ${currentQuestion === index
                    ? 'bg-primary text-primary-foreground'
                    : answers[index] !== -1
                      ? 'bg-muted text-foreground'
                      : 'bg-card border border-border text-muted-foreground'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TakeQuiz;
