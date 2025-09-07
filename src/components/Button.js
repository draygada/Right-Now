// Reusable Button Component
import React, { useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, Animated } from "react-native";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, ANIMATION_DURATION } from "../constants";

const Button = ({ 
  title, 
  onPress, 
  variant = "primary", 
  size = "md",
  disabled = false,
  style = {},
  textStyle = {},
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: ANIMATION_DURATION.fast,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: ANIMATION_DURATION.fast,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: ANIMATION_DURATION.fast,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: ANIMATION_DURATION.fast,
        useNativeDriver: true,
      })
    ]).start();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;
      case "danger":
        return styles.danger;
      case "ghost":
        return styles.ghost;
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

  const getTextVariantStyles = () => {
    switch (variant) {
      case "primary":
      case "danger":
        return styles.textWhite;
      case "secondary":
      case "ghost":
        return styles.textDark;
      default:
        return styles.textWhite;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1}
    >
      <Animated.View style={[
        styles.button,
        getVariantStyles(),
        getSizeStyles(),
        disabled && styles.disabled,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim
        },
        style
      ]}>
        <Text style={[
          styles.text,
          getTextVariantStyles(),
          textStyle
        ]}>
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  // Variants
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
  },
  danger: {
    backgroundColor: COLORS.error,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  // Sizes
  sm: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  md: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  lg: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  // States
  disabled: {
    opacity: 0.5,
  },
  // Text
  text: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
  },
  textWhite: {
    color: COLORS.white,
  },
  textDark: {
    color: COLORS.gray[800],
  },
});

export default Button;
