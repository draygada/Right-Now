// Main App Entry Point
import { registerRootComponent } from "expo";
import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { ItemsProvider } from "./src/context/ItemsContext";
import AppNavigator from "./src/navigation/AppNavigator";

function App() {
  return (
    <AuthProvider>
      <ItemsProvider>
        <AppNavigator />
      </ItemsProvider>
    </AuthProvider>
  );
}

registerRootComponent(App);
