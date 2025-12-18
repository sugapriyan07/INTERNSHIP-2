/*
 * QuizList.tsx
 * This page shows all available quizzes
 * Users can click on a quiz to take it
 */

import { Link } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { Button } from '@/components/ui/button';

function QuizList() {
  // Get all quizzes from context
  const { quizzes } = useQuiz();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Available Quizzes</h1>
          <Link to="/">
            <Button variant="outline" size="sm">Back to Home</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Check if there are any quizzes */}
        {quizzes.length === 0 ? (
          // No quizzes message
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No Quizzes Available
            </h2>
            <p className="text-muted-foreground mb-6">
              Be the first to create a quiz!
            </p>
            <Link to="/create">
              <Button>Create a Quiz</Button>
            </Link>
          </div>
        ) : (
          // Quiz List
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-card rounded-lg border border-border p-6 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {quiz.questions.length} questions • Created by {quiz.createdBy}
                  </p>
                </div>
                <Link to={`/quiz/${quiz.id}`}>
                  <Button>Take Quiz</Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default QuizList;

