// Header bar component with profile/login, title, and settings
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const HeaderBar = () => {
  const { user, isLoggedIn } = useAuth();
  const navigation = useNavigation();

  const handleProfilePress = () => {
    if (isLoggedIn) {
      navigation.navigate("ManagingCenter");
    } else {
      navigation.navigate("Login");
    }
  };

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Profile/Login Button */}
        <TouchableOpacity
          onPress={handleProfilePress}
          style={styles.profileButton}
        >
          {isLoggedIn ? (
            <Image
              source={{ uri: user.avatarUrl }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.loginButton}>
              <Text style={styles.loginText}>
                Log in
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* App Title */}
        <Text style={styles.title}>
          RightNow
        </Text>

        {/* Settings Button */}
        <TouchableOpacity
          onPress={handleSettingsPress}
          style={styles.settingsButton}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb", // gray-200
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  loginButton: {
    backgroundColor: "#dbeafe", // blue-100
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  loginText: {
    color: "#2563eb", // blue-600
    fontWeight: "500",
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827", // gray-900
  },
  settingsButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: {
    fontSize: 20,
  },
});

export default HeaderBar;
