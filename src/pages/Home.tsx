/*
 * Home.tsx
 * This is the main landing page of our Quiz Maker app
 * Shows welcome message and navigation buttons
 */

import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

function Home() {
  // Get auth info to show personalized greeting
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[color:var(--home-bg,#fff0e8)]">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-blue-600">Quiz Maker</h1>

          {/* Show login/logout button based on auth status */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Hello, {user?.name}!</span>
              <Button variant="outline" size="sm" onClick={logout} className="rounded-full">
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button className="rounded-full shadow-sm px-4 py-2">Login</Button>
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Welcome to Online Quiz Maker
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Create and take quizzes easily. Perfect for learning and testing knowledge!
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">Create Quiz</h3>
            <p className="text-muted-foreground mb-6">Make your own quiz with multiple choice questions</p>
            <Link to={isLoggedIn ? "/create" : "/auth"} className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">{isLoggedIn ? "Create Now" : "Login to Create"}</Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">Take Quiz</h3>
            <p className="text-muted-foreground mb-6">Browse available quizzes and test your knowledge</p>
            <Link to="/quizzes" className="block">
              <Button className="w-full bg-gray-100 text-gray-900">Browse Quizzes</Button>
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">💡 Note: This is a demo app. Quizzes are stored temporarily and will be lost on page refresh.</p>
        </div>
      </main>
    </div>
  );
}

export default Home;

