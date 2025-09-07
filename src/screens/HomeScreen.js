// Home Screen Component  
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useItems } from "../context/ItemsContext";
import TabSwitcher from "../components/TabSwitcher";
import ItemList from "../components/ItemList";
import { COLORS, SPACING } from "../constants";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { 
    getGeneralItems, 
    getFreeItems, 
    refresh, 
    refreshing,
    loading,
    error
  } = useItems();
  
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General Listings" },
    { id: "free", label: "Free Stuff" }
  ];

  const getCurrentItems = () => {
    switch (activeTab) {
      case "general":
        return getGeneralItems();
      case "free":
        return getFreeItems();
      default:
        return [];
    }
  };

  const handleItemPress = (item) => {
    navigation.navigate("ItemDetail", { item });
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case "general":
        return "No general listings yet. Check back soon.";
      case "free":
        return "No free items right now.";
      default:
        return "No items found.";
    }
  };

  return (
    <View style={styles.container}>
      <TabSwitcher
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <View style={styles.spacer} />
      
      <ItemList
        items={getCurrentItems()}
        loading={loading}
        refreshing={refreshing}
        onRefresh={refresh}
        onItemPress={handleItemPress}
        emptyMessage={getEmptyMessage()}
        error={error}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  spacer: {
    height: SPACING.md,
    backgroundColor: COLORS.background,
  },
});

export default HomeScreen;
