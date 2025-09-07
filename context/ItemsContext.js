// Items Context for managing marketplace items
import React, { createContext, useContext, useState, useEffect } from "react";
import { mockApi } from "../lib/mockApi";
import { isExpired } from "../lib/format";

const ItemsContext = createContext();

// Custom hook to use items context
export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemsProvider");
  }
  return context;
};

// Items provider component
export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load items on mount
  useEffect(() => {
    loadItems();
  }, []);

  // Load all items from mock API
  const loadItems = async () => {
    try {
      setLoading(true);
      const allItems = await mockApi.getItems();
      setItems(allItems);
    } catch (error) {
      console.error("Error loading items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh items (for pull-to-refresh)
  const refresh = async () => {
    try {
      setRefreshing(true);
      const allItems = await mockApi.getItems();
      setItems(allItems);
    } catch (error) {
      console.error("Error refreshing items:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Create new item
  const createItem = async (itemData) => {
    try {
      const newItem = await mockApi.createItem(itemData);
      setItems(prevItems => [newItem, ...prevItems]);
      return newItem;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  };

  // Get items by owner (for managing center)
  const getItemsByOwner = async (userId) => {
    try {
      return await mockApi.getItemsByOwner(userId);
    } catch (error) {
      console.error("Error getting items by owner:", error);
      throw error;
    }
  };

  // Get single item by ID
  const getItemById = async (id) => {
    try {
      return await mockApi.getItemById(id);
    } catch (error) {
      console.error("Error getting item by ID:", error);
      throw error;
    }
  };

  // Filter items by type (General vs Free)
  const getGeneralItems = () => {
    return items.filter(item => item.priceCents > 0);
  };

  const getFreeItems = () => {
    return items.filter(item => item.priceCents === 0);
  };

  // Filter items by expiry status
  const getCurrentItems = (itemsList) => {
    return itemsList.filter(item => !isExpired(item.expiresAt));
  };

  const getExpiredItems = (itemsList) => {
    return itemsList.filter(item => isExpired(item.expiresAt));
  };

  const value = {
    items,
    loading,
    refreshing,
    loadItems,
    refresh,
    createItem,
    getItemsByOwner,
    getItemById,
    getGeneralItems,
    getFreeItems,
    getCurrentItems,
    getExpiredItems
  };

  return (
    <ItemsContext.Provider value={value}>
      {children}
    </ItemsContext.Provider>
  );
};
