// Refactored Items Context
import React, { createContext, useContext, useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import { isExpired } from "../utils/format";

const ItemsContext = createContext();

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemsProvider");
  }
  return context;
};

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const allItems = await ApiService.getItems();
      setItems(allItems);
    } catch (error) {
      console.error("Error loading items:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    try {
      setRefreshing(true);
      setError(null);
      const allItems = await ApiService.getItems();
      setItems(allItems);
    } catch (error) {
      console.error("Error refreshing items:", error);
      setError(error.message);
    } finally {
      setRefreshing(false);
    }
  };

  const createItem = async (itemData) => {
    try {
      const newItem = await ApiService.createItem(itemData);
      setItems(prevItems => [newItem, ...prevItems]);
      return newItem;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  };

  const getItemById = async (id) => {
    try {
      // First check local cache
      const cachedItem = items.find(item => item.id === id);
      if (cachedItem) return cachedItem;
      
      // If not in cache, fetch from API
      return await ApiService.getItemById(id);
    } catch (error) {
      console.error("Error getting item by ID:", error);
      throw error;
    }
  };

  const updateItem = async (id, updates) => {
    try {
      const updatedItem = await ApiService.updateItem(id, updates);
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? updatedItem : item
        )
      );
      return updatedItem;
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  };

  const deleteItem = async (id) => {
    try {
      await ApiService.deleteItem(id);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  };

  // Filter functions
  const getGeneralItems = () => {
    return items.filter(item => item.priceCents > 0);
  };

  const getFreeItems = () => {
    return items.filter(item => item.priceCents === 0);
  };

  const getCurrentItems = (itemsList) => {
    return itemsList.filter(item => !isExpired(item.expiresAt));
  };

  const getExpiredItems = (itemsList) => {
    return itemsList.filter(item => isExpired(item.expiresAt));
  };

  const getItemsByOwner = (userId) => {
    return items.filter(item => item.ownerUserId === userId);
  };

  const searchItems = (query) => {
    if (!query.trim()) return items;
    
    const lowercaseQuery = query.toLowerCase();
    return items.filter(item => 
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description?.toLowerCase().includes(lowercaseQuery)
    );
  };

  const value = {
    items,
    loading,
    refreshing,
    error,
    loadItems,
    refresh,
    createItem,
    getItemById,
    updateItem,
    deleteItem,
    getGeneralItems,
    getFreeItems,
    getCurrentItems,
    getExpiredItems,
    getItemsByOwner,
    searchItems,
  };

  return (
    <ItemsContext.Provider value={value}>
      {children}
    </ItemsContext.Provider>
  );
};
