// Custom Header Component
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { COLORS, SPACING, FONT_SIZES } from "../constants";

const CustomHeader = ({ route, options }) => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const showBackButton = navigation.canGoBack();

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Left Side */}
        {showBackButton ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleProfilePress}
            style={styles.profileButton}
          >
            <Image
              source={{ uri: user?.avatarUrl }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        )}

        {/* Center - Title */}
        <Text style={styles.title}>
          {options.title || route.name}
        </Text>

        {/* Right Side */}
        {!showBackButton && (
          <TouchableOpacity
            onPress={handleSettingsPress}
            style={styles.settingsButton}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        )}
        
        {showBackButton && <View style={styles.spacer} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
    paddingTop: 60, // Safe area padding
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    height: 56,
  },
  profileButton: {
    width: 32,
    height: 32,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  backButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.xs,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "bold",
    color: COLORS.black,
    textAlign: "center",
    flex: 1,
  },
  settingsButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: {
    fontSize: FONT_SIZES.xl,
  },
  spacer: {
    width: 32,
  },
});

export default CustomHeader;
