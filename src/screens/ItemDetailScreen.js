// Item Detail Screen
import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { formatPrice, getTimeRemaining } from "../utils/format";
import { calculateDistance, formatDistance, DEFAULT_USER_LOCATION } from "../utils/distance";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from "../constants";

const ItemDetailScreen = () => {
  const route = useRoute();
  const { item } = route.params;

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
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.price}>
            {formatPrice(item.priceCents)}
          </Text>
        </View>

        <View style={styles.meta}>
          <Text style={styles.distance}>
            📍 {getDistance()}
          </Text>
          {getExpiryChip()}
        </View>

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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: "100%",
    height: 256,
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  price: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  distance: {
    color: COLORS.gray[600],
    fontSize: FONT_SIZES.md,
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
  description: {
    marginBottom: SPACING.lg,
  },
  descriptionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  descriptionText: {
    color: COLORS.gray[700],
    lineHeight: 24,
    fontSize: FONT_SIZES.md,
  },
});

export default ItemDetailScreen;
