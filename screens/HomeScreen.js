// Home screen with General/Free tabs and item listings
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useItems } from "../context/ItemsContext";
import { useNavigation } from "@react-navigation/native";
import TabSwitcher from "../components/TabSwitcher";
import ItemList from "../components/ItemList";

const HomeScreen = () => {
  const { 
    getGeneralItems, 
    getFreeItems, 
    refresh, 
    refreshing 
  } = useItems();
  const navigation = useNavigation();
  
  const [activeTab, setActiveTab] = useState("general");

  // Tab configuration
  const tabs = [
    { id: "general", label: "General Listings" },
    { id: "free", label: "Free Stuff" }
  ];

  // Get items based on active tab
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

  // Handle item press - navigate to detail
  const handleItemPress = (item) => {
    navigation.navigate("ItemDetail", { item });
  };

  // Get empty message based on tab
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
      {/* Tab Switcher */}
      <TabSwitcher
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {/* Item List */}
      <ItemList
        items={getCurrentItems()}
        loading={false}
        refreshing={refreshing}
        onRefresh={refresh}
        onItemPress={handleItemPress}
        emptyMessage={getEmptyMessage()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb", // gray-50
  },
});

export default HomeScreen;
