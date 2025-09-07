// Input component with label and error handling
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  error, 
  multiline = false,
  keyboardType = "default",
  style = {}
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        style={[
          styles.input,
          error && styles.inputError,
          multiline && styles.inputMultiline
        ]}
        placeholderTextColor="#9CA3AF"
      />
      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: "#374151", // gray-700
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderColor: "#d1d5db", // gray-300
    height: 48,
  },
  inputError: {
    borderColor: "#ef4444", // red-500
  },
  inputMultiline: {
    height: 80,
  },
  errorText: {
    color: "#ef4444", // red-500
    fontSize: 14,
    marginTop: 4,
  },
});

export default Input;
