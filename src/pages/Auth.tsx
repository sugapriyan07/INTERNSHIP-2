/*
 * Auth.tsx
 * This page handles user login and registration
 * Uses mock authentication (no real database)
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

function Auth() {
  // State to toggle between login and register forms
  const [isLogin, setIsLogin] = useState(true);
  
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Hooks for navigation and auth
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();  // Prevent page refresh
    
    if (isLogin) {
      // Try to login
      const success = login(email, password);
      
      if (success) {
        toast({
          title: "Login Successful!",
          description: "Welcome back!",
        });
        navigate('/');  // Go to home page
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // Try to register
      const success = register(email, password, name);
      
      if (success) {
        toast({
          title: "Registration Successful!",
          description: "Your account has been created.",
        });
        navigate('/');  // Go to home page
      } else {
        toast({
          title: "Registration Failed",
          description: "Email already exists. Please use a different email.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link to="/" className="text-primary hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>

        {/* Auth Card */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground text-center mb-6">
            {isLogin ? 'Login' : 'Create Account'}
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field - only show for registration */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              {isLogin ? 'Login' : 'Create Account'}
            </Button>
          </form>

          {/* Toggle between login and register */}
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-primary hover:underline text-sm"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Login'}
            </button>
          </div>
        </div>

        {/* Demo Note */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          This is a demo. Accounts are stored temporarily in browser memory.
        </p>
      </div>
    </div>
  );
}

export default Auth;
