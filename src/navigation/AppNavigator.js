// App Navigator - Main navigation logic
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../context/AuthContext";

// Import our new TabNavigator
import TabNavigator from "../../navigation/TabNavigator";

// Screens
import AuthScreen from "../screens/AuthScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SellScreen from "../screens/SellScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ffffff",
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          headerTintColor: "#000000",
        }}
      >
        {!isLoggedIn ? (
          <Stack.Screen 
            name="Auth" 
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen 
              name="MainTabs" 
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="ItemDetail" 
              component={ItemDetailScreen}
              options={{ title: "Item Details" }}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{ title: "My Profile" }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{ title: "Settings" }}
            />
            <Stack.Screen 
              name="Sell" 
              component={SellScreen}
              options={{ title: "Sell Item" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
