/*
 * CreateQuiz.tsx
 * This page allows users to create a new quiz
 * Users can add a title and multiple questions with 4 options each
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useQuiz, Question } from '@/context/QuizContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

function CreateQuiz() {
  // Quiz title state
  const [title, setTitle] = useState('');
  
  // Questions array state
  const [questions, setQuestions] = useState<Question[]>([
    // Start with one empty question
    {
      id: 1,
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    },
  ]);

  // Hooks
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addQuiz } = useQuiz();
  const { toast } = useToast();

  // Add a new blank question
  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  // Remove a question
  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      const updated = questions.filter((_, i) => i !== index);
      setQuestions(updated);
    }
  };

  // Update question text
  const updateQuestionText = (index: number, text: string) => {
    const updated = [...questions];
    updated[index].questionText = text;
    setQuestions(updated);
  };

  // Update an option
  const updateOption = (questionIndex: number, optionIndex: number, text: string) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = text;
    setQuestions(updated);
  };

  // Update correct answer
  const updateCorrectAnswer = (questionIndex: number, answerIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].correctAnswer = answerIndex;
    setQuestions(updated);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate: check if all fields are filled
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a quiz title.",
        variant: "destructive",
      });
      return;
    }

    // Check each question
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].questionText.trim()) {
        toast({
          title: "Error",
          description: `Please enter text for Question ${i + 1}.`,
          variant: "destructive",
        });
        return;
      }
      
      for (let j = 0; j < 4; j++) {
        if (!questions[i].options[j].trim()) {
          toast({
            title: "Error",
            description: `Please fill in all options for Question ${i + 1}.`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    // All validation passed - create the quiz
    addQuiz(title, questions, user?.email || 'anonymous');
    
    toast({
      title: "Quiz Created!",
      description: "Your quiz has been saved successfully.",
    });
    
    navigate('/quizzes');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Create Quiz</h1>
          <Link to="/">
            <Button variant="outline" size="sm">Back to Home</Button>
          </Link>
        </div>
      </header>

      {/* Main Form */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quiz Title */}
          <div className="bg-card rounded-lg border border-border p-6">
            <Label htmlFor="title" className="text-lg font-semibold">
              Quiz Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter quiz title (e.g., Math Quiz)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Questions */}
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="bg-card rounded-lg border border-border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Question {qIndex + 1}
                </h3>
                {questions.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeQuestion(qIndex)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              {/* Question Text */}
              <div className="mb-4">
                <Label>Question Text</Label>
                <Input
                  placeholder="Enter your question"
                  value={question.questionText}
                  onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Options */}
              <div className="space-y-3">
                <Label>Options (select the correct answer)</Label>
                <RadioGroup
                  value={question.correctAnswer.toString()}
                  onValueChange={(value) => updateCorrectAnswer(qIndex, parseInt(value))}
                >
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-3">
                      <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} />
                      <Input
                        placeholder={`Option ${oIndex + 1}`}
                        value={option}
                        onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          ))}

          {/* Add Question Button */}
          <div className="flex justify-center">
            <Button type="button" variant="outline" onClick={addQuestion}>
              + Add Another Question
            </Button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Save Quiz
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateQuiz;

