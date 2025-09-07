// Loading component with spinner and text
import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const Loading = ({ message = "Loading..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text style={styles.text}>
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
  text: {
    color: "#6b7280", // gray-600
    marginTop: 16,
    textAlign: "center",
  },
});

export default Loading;
