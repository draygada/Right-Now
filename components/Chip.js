// Chip component for small labels like "Expires in 2h"
import React from "react";
import { View, Text } from "react-native";

const Chip = ({ 
  text, 
  variant = "default",
  size = "sm" 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "warning":
        return "bg-yellow-100 border-yellow-300";
      case "danger":
        return "bg-red-100 border-red-300";
      case "success":
        return "bg-green-100 border-green-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "warning":
        return "text-yellow-800";
      case "danger":
        return "text-red-800";
      case "success":
        return "text-green-800";
      default:
        return "text-gray-800";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "xs":
        return "px-2 py-1";
      case "sm":
        return "px-2 py-1";
      case "md":
        return "px-3 py-1.5";
      default:
        return "px-2 py-1";
    }
  };

  return (
    <View className={`
      ${getVariantStyles()}
      ${getSizeStyles()}
      border
      rounded-full
      self-start
    `}>
      <Text className={`
        text-xs
        font-medium
        ${getTextColor()}
      `}>
        {text}
      </Text>
    </View>
  );
};

export default Chip;
