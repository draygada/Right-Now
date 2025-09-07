import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import TabNavigator from './navigation/TabNavigator';

// Import your existing AuthScreen from index.js
import AuthScreen from './index';

const AppContent = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <AuthScreen />;
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <AppContent />
    </AuthProvider>
  );
}
