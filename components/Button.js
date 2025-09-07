// Button component with consistent styling
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ 
  title, 
  onPress, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  style = {}
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;
      case "danger":
        return styles.danger;
      default:
        return styles.primary;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return styles.sm;
      case "md":
        return styles.md;
      case "lg":
        return styles.lg;
      default:
        return styles.md;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "primary":
      case "danger":
        return styles.textWhite;
      case "secondary":
        return styles.textDark;
      default:
        return styles.textWhite;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        getVariantStyles(),
        getSizeStyles(),
        styles.button,
        disabled && styles.disabled,
        style
      ]}
    >
      <Text style={[styles.buttonText, getTextColor()]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  primary: {
    backgroundColor: "#2563eb", // blue-600
  },
  secondary: {
    backgroundColor: "#e5e7eb", // gray-200
  },
  danger: {
    backgroundColor: "#dc2626", // red-600
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  lg: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  textWhite: {
    color: "#ffffff",
  },
  textDark: {
    color: "#1f2937", // gray-800
  },
});

export default Button;
