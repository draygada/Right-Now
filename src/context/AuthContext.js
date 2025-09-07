// Refactored Auth Context
import React, { createContext, useContext, useState, useEffect } from "react";
import ApiService from "../services/ApiService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setLoading(true);
      // Check if user is already logged in (token exists)
      const currentUser = await ApiService.getUserProfile();
      setUser(currentUser);
    } catch (error) {
      console.log("No existing session found");
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  };

  const login = async (credentials = null) => {
    try {
      let userData;
      
      if (credentials) {
        // Form-based login
        userData = await ApiService.login({
          userData: credentials
        });
      } else {
        // Dev login
        userData = await ApiService.login();
      }
      
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const newUser = await ApiService.register(userData);
      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await ApiService.logout();
      await ApiService.clearAuthToken();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API call fails, clear local state
      setUser(null);
    }
  };

  const updateProfile = async (updates) => {
    try {
      const updatedUser = await ApiService.updateUserProfile(updates);
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
    isInitialized,
    isLoggedIn: !!user,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
