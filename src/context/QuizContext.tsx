import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define what a Question looks like
export interface Question {
  id: number;
  questionText: string;        // The question itself
  options: string[];           // Array of 4 answer options
  correctAnswer: number;       // Index of the correct option (0, 1, 2, or 3)
}

// Define what a Quiz looks like
export interface Quiz {
  id: number;
  title: string;               // Quiz title
  createdBy: string;           // Email of who created it
  questions: Question[];       // Array of questions
}

// Define what quiz results look like
export interface QuizResult {
  quizId: number;
  quizTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  answers: { questionId: number; selectedAnswer: number; isCorrect: boolean }[];
}

// Define what our QuizContext will provide
interface QuizContextType {
  quizzes: Quiz[];                                              // All quizzes
  currentResult: QuizResult | null;                             // Result of last taken quiz
  addQuiz: (title: string, questions: Question[], createdBy: string) => void;  // Create new quiz
  getQuizById: (id: number) => Quiz | undefined;               // Get specific quiz
  submitQuiz: (quizId: number, answers: number[]) => QuizResult;  // Submit quiz answers
  clearResult: () => void;                                      // Clear the result
}

// Create the context
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Sample quizzes that come pre-loaded for demo purposes
const sampleQuizzes: Quiz[] = [
  {
    id: 1,
    title: "General Knowledge Quiz",
    createdBy: "demo@example.com",
    questions: [
      {
        id: 1,
        questionText: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
      },
      {
        id: 2,
        questionText: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
      },
      {
        id: 3,
        questionText: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3,
      },
      {
        id: 4,
        questionText: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
      },
      {
        id: 5,
        questionText: "What is the tallest mountain in the world?",
        options: ["K2", "Mount Everest", "Kangchenjunga", "Mont Blanc"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Math Basics Quiz",
    createdBy: "demo@example.com",
    questions: [
      {
        id: 1,
        questionText: "What is 5 + 7?",
        options: ["10", "11", "12", "13"],
        correctAnswer: 2,
      },
      {
        id: 2,
        questionText: "What is 9 x 8?",
        options: ["63", "72", "81", "64"],
        correctAnswer: 1,
      },
      {
        id: 3,
        questionText: "What is the square root of 144?",
        options: ["10", "11", "12", "14"],
        correctAnswer: 2,
      },
      {
        id: 4,
        questionText: "What is 100 divided by 4?",
        options: ["20", "25", "30", "15"],
        correctAnswer: 1,
      },
      {
        id: 5,
        questionText: "What is 15% of 200?",
        options: ["25", "30", "35", "40"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 3,
    title: "Science Quiz",
    createdBy: "demo@example.com",
    questions: [
      {
        id: 1,
        questionText: "What gas do plants absorb from the air?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: 2,
      },
      {
        id: 2,
        questionText: "What is H2O commonly known as?",
        options: ["Salt", "Sugar", "Water", "Oil"],
        correctAnswer: 2,
      },
      {
        id: 3,
        questionText: "How many bones are in the adult human body?",
        options: ["186", "206", "226", "256"],
        correctAnswer: 1,
      },
      {
        id: 4,
        questionText: "What is the chemical symbol for Gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
      },
      {
        id: 5,
        questionText: "Which organ pumps blood through the body?",
        options: ["Brain", "Lungs", "Heart", "Liver"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 4,
    title: "History Quiz",
    createdBy: "demo@example.com",
    questions: [
      {
        id: 1,
        questionText: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: 2,
      },
      {
        id: 2,
        questionText: "Who was the first President of the United States?",
        options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
        correctAnswer: 1,
      },
      {
        id: 3,
        questionText: "Which ancient civilization built the pyramids?",
        options: ["Romans", "Greeks", "Egyptians", "Mayans"],
        correctAnswer: 2,
      },
      {
        id: 4,
        questionText: "The Great Wall was built in which country?",
        options: ["Japan", "India", "China", "Korea"],
        correctAnswer: 2,
      },
      {
        id: 5,
        questionText: "Who discovered America in 1492?",
        options: ["Vasco da Gama", "Christopher Columbus", "Marco Polo", "Ferdinand Magellan"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 5,
    title: "Geography Quiz",
    createdBy: "demo@example.com",
    questions: [
      {
        id: 1,
        questionText: "Which is the largest country by area?",
        options: ["Canada", "China", "USA", "Russia"],
        correctAnswer: 3,
      },
      {
        id: 2,
        questionText: "What is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        correctAnswer: 1,
      },
      {
        id: 3,
        questionText: "Which continent has the most countries?",
        options: ["Asia", "Europe", "Africa", "South America"],
        correctAnswer: 2,
      },
      {
        id: 4,
        questionText: "What is the smallest country in the world?",
        options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
        correctAnswer: 2,
      },
      {
        id: 5,
        questionText: "Which desert is the largest in the world?",
        options: ["Gobi", "Kalahari", "Sahara", "Arabian"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 6,
    title: "Riddle Quiz",
    createdBy: "demo@example.com",
    questions: [
      {
        id: 1,
        questionText: "I speak without a mouth and hear without ears. I have nobody, but I come alive with wind. What am I?",
        options: ["Echo", "Shadow", "Fire", "Silence"],
        correctAnswer: 0,
      },
      {
        id: 2,
        questionText: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
        options: ["Tree", "Pencil", "Candle", "Person"],
        correctAnswer: 2,
      },
      {
        id: 3,
        questionText: "What has keys but can’t open locks?",
        options: ["Map", "Piano", "Keyboard", "Locksmith"],
        correctAnswer: 1,
      },
      {
        id: 4,
        questionText: "What gets wetter as it dries?",
        options: ["Sponge", "Towel", "Rain", "Soap"],
        correctAnswer: 1,
      },
      {
        id: 5,
        questionText: "What can travel around the world while staying in a corner?",
        options: ["Stamp", "Sunlight", "Wind", "Sound"],
        correctAnswer: 0,
      },
    ],
  },
];

// QuizProvider component - wraps our app and provides quiz functionality
export function QuizProvider({ children }: { children: ReactNode }) {
  // State to store all quizzes - starts with sample quizzes
  const [quizzes, setQuizzes] = useState<Quiz[]>(sampleQuizzes);
  
  // State to store the result of the most recently taken quiz
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);
  
  // Counter to generate unique IDs for quizzes (starts at 4 since we have 3 sample quizzes)
  const [nextId, setNextId] = useState(6);

  // Function to add a new quiz
  const addQuiz = (title: string, questions: Question[], createdBy: string) => {
    const newQuiz: Quiz = {
      id: nextId,
      title,
      createdBy,
      questions,
    };
    
    // Add quiz to our list
    setQuizzes([...quizzes, newQuiz]);
    
    // Increment ID for next quiz
    setNextId(nextId + 1);
  };

  // Function to get a specific quiz by its ID
  const getQuizById = (id: number): Quiz | undefined => {
    return quizzes.find((quiz) => quiz.id === id);
  };

  // Function to submit quiz answers and calculate score
  const submitQuiz = (quizId: number, answers: number[]): QuizResult => {
    const quiz = getQuizById(quizId);
    
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    // Calculate results for each question
    const detailedAnswers = quiz.questions.map((question, index) => ({
      questionId: question.id,
      selectedAnswer: answers[index],
      isCorrect: answers[index] === question.correctAnswer,
    }));

    // Count correct answers
    const correctCount = detailedAnswers.filter((a) => a.isCorrect).length;

    // Create result object
    const result: QuizResult = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      totalQuestions: quiz.questions.length,
      correctAnswers: correctCount,
      answers: detailedAnswers,
    };

    // Save the result
    setCurrentResult(result);
    
    return result;
  };

  // Function to clear the current result
  const clearResult = () => {
    setCurrentResult(null);
  };

  // Provide all quiz functionality to the app
  return (
    <QuizContext.Provider
      value={{
        quizzes,
        currentResult,
        addQuiz,
        getQuizById,
        submitQuiz,
        clearResult,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// Custom hook to use quiz context - makes it easy to access from any component
export function useQuiz() {
  const context = useContext(QuizContext);
  
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  
  return context;
}

