// Sell Screen
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZES } from "../constants";

const SellScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sell Item</Text>
      <Text style={styles.note}>Sell functionality coming soon...</Text>
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
    marginBottom: SPACING.md,
  },
  note: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[500],
    textAlign: "center",
  },
});

export default SellScreen;
