// Profile header component for managing center
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

const ProfileHeader = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    locationText: user?.locationText || "",
    age: user?.age?.toString() || ""
  });

  const handleSave = async () => {
    try {
      const updates = {
        ...editData,
        age: editData.age ? parseInt(editData.age) : undefined
      };
      await updateProfile(updates);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || "",
      locationText: user?.locationText || "",
      age: user?.age?.toString() || ""
    });
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <View className="bg-white p-4 mb-4">
      <View className="items-center mb-4">
        <Image
          source={{ uri: user.avatarUrl }}
          className="w-20 h-20 rounded-full mb-3"
        />
        
        {isEditing ? (
          <View className="w-full">
            <TextInput
              value={editData.name}
              onChangeText={(text) => setEditData(prev => ({ ...prev, name: text }))}
              className="border border-gray-300 rounded-lg px-3 py-2 mb-2 text-center font-semibold text-lg"
              placeholder="Your name"
            />
            <TextInput
              value={editData.locationText}
              onChangeText={(text) => setEditData(prev => ({ ...prev, locationText: text }))}
              className="border border-gray-300 rounded-lg px-3 py-2 mb-2 text-center text-gray-600"
              placeholder="Location"
            />
            <TextInput
              value={editData.age}
              onChangeText={(text) => setEditData(prev => ({ ...prev, age: text }))}
              className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-center text-gray-600"
              placeholder="Age"
              keyboardType="numeric"
            />
            <View className="flex-row space-x-2">
              <Button
                title="Save"
                onPress={handleSave}
                variant="primary"
                className="flex-1"
              />
              <Button
                title="Cancel"
                onPress={handleCancel}
                variant="secondary"
                className="flex-1"
              />
            </View>
          </View>
        ) : (
          <View className="items-center">
            <Text className="text-xl font-semibold text-gray-900 mb-1">
              {user.name}
            </Text>
            <Text className="text-gray-600 mb-1">
              {user.locationText}
            </Text>
            {user.age && (
              <Text className="text-gray-600 mb-3">
                Age {user.age}
              </Text>
            )}
            <Button
              title="Edit Profile"
              onPress={() => setIsEditing(true)}
              variant="secondary"
              size="sm"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileHeader;
