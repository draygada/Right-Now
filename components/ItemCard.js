// Item card component for displaying items in lists
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { formatPrice, getTimeRemaining } from "../lib/format";
import { calculateDistance, formatDistance, DEFAULT_USER_LOCATION } from "../lib/distance";

const ItemCard = ({ item, onPress }) => {
  // Calculate distance from user
  const getDistance = () => {
    if (!item.lat || !item.lng) return "—";
    const distance = calculateDistance(
      DEFAULT_USER_LOCATION.lat,
      DEFAULT_USER_LOCATION.lng,
      item.lat,
      item.lng
    );
    return formatDistance(distance);
  };

  // Get expiry chip if item has expiry
  const getExpiryChip = () => {
    if (!item.expiresAt) return null;
    const timeRemaining = getTimeRemaining(item.expiresAt);
    if (!timeRemaining || timeRemaining === "Expired") return null;
    
    return (
      <View style={styles.chip}>
        <Text style={styles.chipText}>
          Expires in {timeRemaining}
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Image */}
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Content */}
        <View style={styles.textContent}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.price}>
              {formatPrice(item.priceCents)}
            </Text>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.distance}>
              {getDistance()}
            </Text>
            {getExpiryChip()}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 12,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
  },
  image: {
    width: 96,
    height: 96,
  },
  textContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    color: "#111827", // gray-900
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb", // blue-600
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  distance: {
    fontSize: 14,
    color: "#6b7280", // gray-500
  },
  chip: {
    backgroundColor: "#fef3c7", // yellow-100
    borderWidth: 1,
    borderColor: "#f59e0b", // yellow-300
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#92400e", // yellow-800
  },
});

export default ItemCard;
