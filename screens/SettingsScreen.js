// Settings screen with theme toggle and logout
import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

const SettingsScreen = () => {
  const { logout, isLoggedIn } = useAuth();
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("Home");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            App Information
          </Text>
          <Text style={styles.infoText}>
            RightNow Marketplace
          </Text>
          <Text style={styles.infoText}>
            Version 1.0.0
          </Text>
        </View>

        {/* Theme Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Appearance
          </Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>
              Dark Mode
            </Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
              thumbColor={darkMode ? "#FFFFFF" : "#F3F4F6"}
            />
          </View>
          <Text style={styles.settingNote}>
            Coming soon: Dark mode support
          </Text>
        </View>

        {/* Account Actions */}
        {isLoggedIn && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Account
            </Text>
            <Button
              title="Log Out"
              onPress={handleLogout}
              variant="danger"
            />
          </View>
        )}

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            About RightNow
          </Text>
          <Text style={styles.aboutText}>
            A simple marketplace app for buying and selling goods in your local area. 
            Built with Expo and React Native.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    padding: 16,
    gap: 24,
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  infoText: {
    color: "#6b7280",
    marginBottom: 4,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  settingLabel: {
    color: "#374151",
  },
  settingNote: {
    fontSize: 14,
    color: "#6b7280",
  },
  aboutText: {
    color: "#6b7280",
    lineHeight: 24,
  },
});

export default SettingsScreen;
