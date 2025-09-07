// Tab switcher component for General/Free tabs
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const TabSwitcher = ({ 
  tabs, 
  activeTab, 
  onTabChange 
}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => onTabChange(tab.id)}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab
          ]}
        >
          <Text style={[
            styles.tabText,
            activeTab === tab.id && styles.activeTabText
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb", // gray-200
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#2563eb", // blue-600
  },
  tabText: {
    fontWeight: "500",
    color: "#6b7280", // gray-600
  },
  activeTabText: {
    color: "#2563eb", // blue-600
  },
});

export default TabSwitcher;
