// Authentication Context for managing user state
import React, { createContext, useContext, useState, useEffect } from "react";
import { mockApi } from "../lib/mockApi";

const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await mockApi.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setLoading(false);
    }
  };

  // Login function - can accept custom user data or use dev login
  const login = async (userData = null) => {
    try {
      let loginResult;
      
      if (userData) {
        // Custom login with provided user data
        loginResult = await mockApi.loginWithUserData(userData);
      } else {
        // Dev login with default user
        loginResult = await mockApi.devLogin();
      }
      
      setUser(loginResult);
      return loginResult;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await mockApi.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      const updatedUser = await mockApi.updateProfile(updates);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile,
    isLoggedIn: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
