import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define what a User looks like
interface User {
  email: string;
  name: string;
}

// Define what our AuthContext will provide
interface AuthContextType {
  user: User | null;           // Current logged in user (null if not logged in)
  login: (email: string, password: string) => boolean;   // Login function
  register: (email: string, password: string, name: string) => boolean;  // Register function
  logout: () => void;          // Logout function
  isLoggedIn: boolean;         // Quick check if user is logged in
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is our mock "database" - just an array stored in memory
// In a real app, this would be a real database
const mockUsers: { email: string; password: string; name: string }[] = [];

// AuthProvider component - wraps our app and provides auth functionality
export function AuthProvider({ children }: { children: ReactNode }) {
  // State to track the current user
  const [user, setUser] = useState<User | null>(null);

  // Login function - checks if email/password match a registered user
  const login = (email: string, password: string): boolean => {
    // Find user in our mock database
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // User found! Set them as logged in
      setUser({ email: foundUser.email, name: foundUser.name });
      return true;  // Login successful
    }
    
    return false;  // Login failed
  };

  // Register function - adds a new user to our mock database
  const register = (email: string, password: string, name: string): boolean => {
    // Check if email is already registered
    const existingUser = mockUsers.find((u) => u.email === email);
    
    if (existingUser) {
      return false;  // Email already exists
    }

    // Add new user to mock database
    mockUsers.push({ email, password, name });
    
    // Automatically log them in after registration
    setUser({ email, name });
    return true;  // Registration successful
  };

  // Logout function - simply clears the current user
  const logout = () => {
    setUser(null);
  };

  // Provide all auth functionality to the app
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoggedIn: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth - makes it easy to access from any component
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
