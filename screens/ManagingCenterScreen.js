// Managing center screen for logged-in users
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useItems } from "../context/ItemsContext";
import { useNavigation } from "@react-navigation/native";
import ProfileHeader from "../components/ProfileHeader";
import TabSwitcher from "../components/TabSwitcher";
import ItemList from "../components/ItemList";
import Loading from "../components/Loading";
import { isExpired } from "../lib/format";

const ManagingCenterScreen = () => {
  const { user, isLoggedIn } = useAuth();
  const { getItemsByOwner, getCurrentItems, getExpiredItems } = useItems();
  const navigation = useNavigation();
  
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("current");

  // Tab configuration
  const tabs = [
    { id: "current", label: "Current Posts" },
    { id: "expired", label: "Expired Posts" }
  ];

  useEffect(() => {
    if (isLoggedIn && user) {
      loadUserItems();
    } else {
      // Redirect to login if not logged in
      navigation.navigate("Login");
    }
  }, [isLoggedIn, user]);

  const loadUserItems = async () => {
    try {
      setLoading(true);
      const items = await getItemsByOwner(user.id);
      setUserItems(items);
    } catch (error) {
      console.error("Error loading user items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get items based on active tab
  const getCurrentTabItems = () => {
    switch (activeTab) {
      case "current":
        return getCurrentItems(userItems);
      case "expired":
        return getExpiredItems(userItems);
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
      case "current":
        return "You don't have any active posts.";
      case "expired":
        return "You don't have any expired posts.";
      default:
        return "No posts found.";
    }
  };

  if (loading) {
    return <Loading message="Loading your posts..." />;
  }

  if (!isLoggedIn) {
    return null; // Will redirect to login
  }

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <ProfileHeader />
      
      {/* Tab Switcher */}
      <TabSwitcher
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {/* Item List */}
      <ItemList
        items={getCurrentTabItems()}
        loading={false}
        refreshing={false}
        onRefresh={loadUserItems}
        onItemPress={handleItemPress}
        emptyMessage={getEmptyMessage()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
});

export default ManagingCenterScreen;
