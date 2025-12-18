/*
 * App.tsx
 * This is the main component that sets up routing and providers
 * It wraps the entire app with necessary context providers
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import our context providers
import { AuthProvider } from "@/context/AuthContext";
import { QuizProvider } from "@/context/QuizContext";

// Import all pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreateQuiz from "./pages/CreateQuiz";
import QuizList from "./pages/QuizList";
import TakeQuiz from "./pages/TakeQuiz";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

// Create a client for React Query (used for data fetching)
const queryClient = new QueryClient();

// Main App Component
const App = () => (
  // QueryClientProvider - enables data fetching features
  <QueryClientProvider client={queryClient}>
    {/* AuthProvider - provides login/logout functionality */}
    <AuthProvider>
      {/* QuizProvider - provides quiz management functionality */}
      <QuizProvider>
        {/* TooltipProvider - enables tooltips */}
        <TooltipProvider>
          {/* Toast notifications */}
          <Toaster />
          <Sonner />
          
          {/* BrowserRouter - enables page navigation */}
          <BrowserRouter>
            {/* Routes - define all our pages */}
            <Routes>
              {/* Home page */}
              <Route path="/" element={<Home />} />
              
              {/* Authentication page (login/register) */}
              <Route path="/auth" element={<Auth />} />
              
              {/* Create quiz page */}
              <Route path="/create" element={<CreateQuiz />} />
              
              {/* Quiz list page */}
              <Route path="/quizzes" element={<QuizList />} />
              
              {/* Take quiz page - :id is a dynamic parameter */}
              <Route path="/quiz/:id" element={<TakeQuiz />} />
              
              {/* Results page */}
              <Route path="/results" element={<Results />} />
              
              {/* 404 page - catches all undefined routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QuizProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
