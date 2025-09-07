// Item Card Component
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { formatPrice, getTimeRemaining } from "../utils/format";
import { calculateDistance, formatDistance, DEFAULT_USER_LOCATION } from "../utils/distance";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOW } from "../constants";

const ItemCard = ({ item, onPress }) => {
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
      activeOpacity={0.7}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        
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
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    marginHorizontal: SPACING.md,
    overflow: "hidden",
    ...SHADOW.sm,
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
    padding: SPACING.sm,
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    color: COLORS.black,
    fontSize: FONT_SIZES.md,
    marginBottom: SPACING.xs,
  },
  price: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  distance: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[500],
  },
  chip: {
    backgroundColor: "#fef3c7",
    borderWidth: 1,
    borderColor: COLORS.warning,
    borderRadius: BORDER_RADIUS.xl,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 4,
  },
  chipText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: "500",
    color: "#92400e",
  },
});

export default ItemCard;
