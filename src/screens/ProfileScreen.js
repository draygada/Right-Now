// Profile Screen
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { COLORS, SPACING, FONT_SIZES } from "../constants";

const ProfileScreen = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text style={styles.subtitle}>Welcome, {user?.name}!</Text>
      <Text style={styles.note}>Profile management coming soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.gray[600],
    marginBottom: SPACING.md,
  },
  note: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[500],
    textAlign: "center",
  },
});

export default ProfileScreen;
