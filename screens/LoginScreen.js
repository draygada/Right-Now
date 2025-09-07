// Login screen with dev login for MVP
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import Loading from "../components/Loading";

const LoginScreen = () => {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleDevLogin = async () => {
    try {
      setLoading(true);
      await login();
      navigation.navigate("ManagingCenter");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Logging you in..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.emoji}>👋</Text>
          <Text style={styles.title}>
            Welcome to RightNow
          </Text>
          <Text style={styles.subtitle}>
            Your local marketplace for buying and selling goods
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            title="Dev Log In"
            onPress={handleDevLogin}
            variant="primary"
            size="lg"
          />
          
          <Text style={styles.note}>
            This is a demo app. Click "Dev Log In" to continue.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#6b7280",
    textAlign: "center",
  },
  actions: {
    gap: 16,
  },
  note: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 16,
  },
});

export default LoginScreen;
