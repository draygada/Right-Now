// Item list component with FlatList and pull-to-refresh
import React from "react";
import { FlatList, RefreshControl } from "react-native";
import ItemCard from "./ItemCard";
import Empty from "./Empty";
import Loading from "./Loading";

const ItemList = ({ 
  items, 
  loading, 
  refreshing, 
  onRefresh, 
  onItemPress,
  emptyMessage = "No items found"
}) => {
  if (loading) {
    return <Loading message="Loading items..." />;
  }

  if (items.length === 0) {
    return <Empty message={emptyMessage} />;
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
          colors={["#3B82F6"]}
          tintColor="#3B82F6"
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
};

export default ItemList;
