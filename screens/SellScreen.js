// Sell screen for creating new listings
import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useItems } from "../context/ItemsContext";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import Button from "../components/Button";
import Loading from "../components/Loading";

const SellScreen = () => {
  const { createItem } = useItems();
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    imageUrl: "",
    description: "",
    expiresIn: ""
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    }
    
    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) {
      newErrors.price = "Price must be a valid number ≥ 0";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      const priceCents = Math.round(parseFloat(formData.price) * 100);
      
      // Calculate expiry time if provided
      let expiresAt = undefined;
      if (formData.expiresIn) {
        const hours = parseInt(formData.expiresIn);
        if (!isNaN(hours) && hours > 0) {
          expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
        }
      }
      
      await createItem({
        title: formData.title.trim(),
        priceCents,
        imageUrl: formData.imageUrl.trim(),
        description: formData.description.trim() || undefined,
        expiresAt,
        lat: 37.4419, // Default location for MVP
        lng: -122.1430
      });
      
      navigation.goBack();
    } catch (error) {
      console.error("Error creating item:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Creating your listing..." />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Input
          label="Title *"
          value={formData.title}
          onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
          placeholder="What are you selling?"
          error={errors.title}
        />
        
        <Input
          label="Price (USD) *"
          value={formData.price}
          onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
          placeholder="0.00 (use 0 for free items)"
          keyboardType="numeric"
          error={errors.price}
        />
        
        <Input
          label="Image URL *"
          value={formData.imageUrl}
          onChangeText={(text) => setFormData(prev => ({ ...prev, imageUrl: text }))}
          placeholder="https://example.com/image.jpg"
          error={errors.imageUrl}
        />
        
        <Input
          label="Description"
          value={formData.description}
          onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
          placeholder="Describe your item..."
          multiline
        />
        
        <Input
          label="Expires in (hours)"
          value={formData.expiresIn}
          onChangeText={(text) => setFormData(prev => ({ ...prev, expiresIn: text }))}
          placeholder="24 (leave empty for no expiry)"
          keyboardType="numeric"
        />
        
        <View style={styles.submitButton}>
          <Button
            title="Create Listing"
            onPress={handleSubmit}
            variant="primary"
            size="lg"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    padding: 16,
    gap: 16,
  },
  submitButton: {
    paddingTop: 16,
  },
});

export default SellScreen;
