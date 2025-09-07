// Screen wrapper component with safe area and padding
import React from "react";
import { SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

const Screen = ({ children, scrollable = true, keyboardAvoiding = false }) => {
  const content = (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  );

  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView 
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  if (scrollable) {
    return (
      <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
        {content}
      </ScrollView>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb", // gray-50
  },
  flex: {
    flex: 1,
  },
});

export default Screen;
