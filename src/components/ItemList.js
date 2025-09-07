// Item List Component
import React from "react";
import { FlatList, RefreshControl, View, Text, StyleSheet } from "react-native";
import ItemCard from "./ItemCard";
import { COLORS, SPACING, FONT_SIZES } from "../constants";

const ItemList = ({ 
  items, 
  loading, 
  refreshing, 
  onRefresh, 
  onItemPress,
  emptyMessage = "No items found",
  error
}) => {
  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading items...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyEmoji}>📦</Text>
        <Text style={styles.emptyTitle}>No items found</Text>
        <Text style={styles.emptyMessage}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ItemCard 
          item={item} 
          onPress={onItemPress}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: SPACING.md }}
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  loadingText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.gray[600],
  },
  errorText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.error,
    textAlign: "center",
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "600",
    color: COLORS.gray[800],
    marginBottom: SPACING.xs,
    textAlign: "center",
  },
  emptyMessage: {
    color: COLORS.gray[600],
    textAlign: "center",
    fontSize: FONT_SIZES.md,
  },
});

export default ItemList;
