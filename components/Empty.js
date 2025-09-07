// Empty state component for when there are no items
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Empty = ({ 
  title = "No items found", 
  message = "Check back later for new listings." 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📦</Text>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={styles.message}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937", // gray-800
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    color: "#6b7280", // gray-600
    textAlign: "center",
  },
});

export default Empty;
