// Item detail screen showing full item information
import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { formatPrice, getTimeRemaining } from "../lib/format";
import { calculateDistance, formatDistance, DEFAULT_USER_LOCATION } from "../lib/distance";

const ItemDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;

  // Calculate distance from user
  const getDistance = () => {
    if (!item?.lat || !item?.lng) return "—";
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
    if (!item?.expiresAt) return null;
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
    <ScrollView style={styles.container}>
      {/* Large Image */}
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      
      {/* Content */}
      <View style={styles.content}>
        {/* Title and Price */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.price}>
            {formatPrice(item.priceCents)}
          </Text>
        </View>

        {/* Distance and Expiry */}
        <View style={styles.meta}>
          <Text style={styles.distance}>
            📍 {getDistance()}
          </Text>
          {getExpiryChip()}
        </View>

        {/* Description */}
        {item.description && (
          <View style={styles.description}>
            <Text style={styles.descriptionTitle}>
              Description
            </Text>
            <Text style={styles.descriptionText}>
              {item.description}
            </Text>
          </View>
        )}

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>
            ← Back to Listings
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  image: {
    width: "100%",
    height: 256,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563eb",
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  distance: {
    color: "#6b7280",
  },
  chip: {
    backgroundColor: "#fef3c7",
    borderWidth: 1,
    borderColor: "#f59e0b",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#92400e",
  },
  description: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  descriptionText: {
    color: "#374151",
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: "#e5e7eb",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#1f2937",
    fontWeight: "600",
  },
});

export default ItemDetailScreen;
