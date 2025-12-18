/*
 * Results.tsx
 * This page shows the quiz results after submission
 * Displays score and which answers were correct/wrong
 */

import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

function Results() {
  const navigate = useNavigate();
  const { currentResult, clearResult, getQuizById } = useQuiz();

  // Redirect if no result available
  useEffect(() => {
    if (!currentResult) {
      navigate('/quizzes');
    }
  }, [currentResult, navigate]);

  // If no result, show nothing (will redirect)
  if (!currentResult) {
    return null;
  }

  // Get the quiz for question details
  const quiz = getQuizById(currentResult.quizId);

  // Calculate percentage
  const percentage = Math.round(
    (currentResult.correctAnswers / currentResult.totalQuestions) * 100
  );

  // Determine message based on score
  const getMessage = () => {
    if (percentage >= 80) return { emoji: '🎉', text: 'Excellent!' };
    if (percentage >= 60) return { emoji: '👍', text: 'Good job!' };
    if (percentage >= 40) return { emoji: '💪', text: 'Keep practicing!' };
    return { emoji: '📚', text: 'Study more and try again!' };
  };

  const message = getMessage();

  // Handle going back to quizzes
  const handleGoBack = () => {
    clearResult();  // Clear the result so user can take another quiz
    navigate('/quizzes');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-primary">Quiz Results</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Score Card */}
        <div className="bg-card rounded-lg border border-border p-8 text-center mb-8">
          <div className="text-6xl mb-4">{message.emoji}</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {message.text}
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Quiz: {currentResult.quizTitle}
          </p>
          
          {/* Score Display */}
          <div className="inline-block bg-muted rounded-lg p-6">
            <p className="text-4xl font-bold text-primary">
              {currentResult.correctAnswers} / {currentResult.totalQuestions}
            </p>
            <p className="text-muted-foreground">
              {percentage}% Correct
            </p>
          </div>
        </div>

        {/* Detailed Results */}
        {quiz && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Answer Review
            </h3>
            
            {quiz.questions.map((question, index) => {
              const answerData = currentResult.answers[index];
              const isCorrect = answerData.isCorrect;
              
              return (
                <div
                  key={index}
                  className={`bg-card rounded-lg border p-4 ${isCorrect ? 'border-success' : 'border-destructive'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">
                      {isCorrect ? '✅' : '❌'}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {index + 1}. {question.questionText}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your answer: {question.options[answerData.selectedAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-success mt-1">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" onClick={handleGoBack}>
            Take Another Quiz
          </Button>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Results;
