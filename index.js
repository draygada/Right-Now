import { registerRootComponent } from "expo";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, FlatList, RefreshControl, TextInput, KeyboardAvoidingView, Platform, Animated, Easing } from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ItemsProvider, useItems } from "./context/ItemsContext";
import { formatPrice, getTimeRemaining } from "./lib/format";
import { calculateDistance, formatDistance, DEFAULT_USER_LOCATION } from "./lib/distance";

// Animated Screen Wrapper Component
const AnimatedScreen = ({ children, animationType = "fade" }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const animations = [];
    
    if (animationType === "fade" || animationType === "fadeSlide") {
      animations.push(
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      );
    }
    
    if (animationType === "slide" || animationType === "fadeSlide") {
      animations.push(
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start();
  }, []);

  const getAnimatedStyle = () => {
    switch (animationType) {
      case "fade":
        return { opacity: fadeAnim };
      case "slide":
        return { transform: [{ translateY: slideAnim }] };
      case "fadeSlide":
        return { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        };
      default:
        return { opacity: fadeAnim };
    }
  };

  return (
    <Animated.View style={[styles.animatedContainer, getAnimatedStyle()]}>
      {children}
    </Animated.View>
  );
};

// Input Component for forms with animation
const Input = ({ label, value, onChangeText, placeholder, error, secureTextEntry = false, keyboardType = "default" }) => {
  const focusAnim = useRef(new Animated.Value(0)).current;
  const errorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(errorAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(errorAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(errorAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error]);

  const handleFocus = () => {
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!value) {
      Animated.timing(focusAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <Animated.View style={[
        styles.inputWrapper,
        {
          borderColor: focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["#d1d5db", "#2563eb"]
          }),
          transform: [{
            translateX: errorAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 5]
            })
          }]
        }
      ]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={[styles.input, error && styles.inputError]}
          placeholderTextColor="#9CA3AF"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Animated.View>
      {error && (
        <Animated.Text style={[styles.errorText, { opacity: errorAnim }]}>
          {error}
        </Animated.Text>
      )}
    </View>
  );
};

// Animated Button Component
const Button = ({ title, onPress, variant = "primary", disabled = false }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1}
    >
      <Animated.View style={[
        styles.button,
        variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary,
        disabled && styles.buttonDisabled,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim
        }
      ]}>
        <Text style={[
          styles.buttonText,
          variant === "primary" ? styles.buttonTextPrimary : styles.buttonTextSecondary
        ]}>
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Login/Signup Screen with animations
const AuthScreen = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    location: ""
  });
  const [errors, setErrors] = useState({});

  const switchAnim = useRef(new Animated.Value(0)).current;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }
      
      if (!formData.location.trim()) {
        newErrors.location = "Location is required";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await login({
        email: formData.email,
        name: formData.name || "Demo User",
        location: formData.location || "Stanford, CA"
      });
      
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDevLogin = async () => {
    try {
      setLoading(true);
      await login();
    } catch (error) {
      console.error("Dev login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    Animated.timing(switchAnim, {
      toValue: isLogin ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      location: ""
    });
  };

  if (loading) {
    return (
      <AnimatedScreen animationType="fade">
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              {isLogin ? "Logging you in..." : "Creating your account..."}
            </Text>
          </View>
        </View>
      </AnimatedScreen>
    );
  }

  return (
    <AnimatedScreen animationType="fadeSlide">
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.authContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.authHeader}>
            <Text style={styles.welcomeEmoji}>👋</Text>
            <Animated.Text style={[
              styles.authTitle,
              {
                opacity: switchAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1]
                })
              }
            ]}>
              {isLogin ? "Welcome Back!" : "Join RightNow"}
            </Animated.Text>
            <Text style={styles.authSubtitle}>
              {isLogin 
                ? "Sign in to your account" 
                : "Create an account to start buying and selling"
              }
            </Text>
          </View>

          <View style={styles.formContainer}>
            {!isLogin && (
              <Animated.View style={{
                opacity: switchAnim,
                maxHeight: switchAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200]
                })
              }}>
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                  placeholder="Enter your full name"
                  error={errors.name}
                />
              </Animated.View>
            )}

            <Input
              label="Email"
              value={formData.email}
              onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
              placeholder="Enter your email"
              keyboardType="email-address"
              error={errors.email}
            />

            <Input
              label="Password"
              value={formData.password}
              onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
              placeholder="Enter your password"
              secureTextEntry
              error={errors.password}
            />

            {!isLogin && (
              <Animated.View style={{
                opacity: switchAnim,
                maxHeight: switchAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 300]
                })
              }}>
                <Input
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                  placeholder="Confirm your password"
                  secureTextEntry
                  error={errors.confirmPassword}
                />

                <Input
                  label="Location"
                  value={formData.location}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
                  placeholder="City, State (e.g., Stanford, CA)"
                  error={errors.location}
                />
              </Animated.View>
            )}

            <Button
              title={isLogin ? "Sign In" : "Create Account"}
              onPress={handleSubmit}
              variant="primary"
            />

            <TouchableOpacity onPress={switchMode} style={styles.switchButton}>
              <Text style={styles.switchText}>
                {isLogin 
                  ? "Don't have an account? " 
                  : "Already have an account? "
                }
                <Text style={styles.switchLink}>
                  {isLogin ? "Sign Up" : "Sign In"}
                </Text>
              </Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title="Quick Demo Login"
              onPress={handleDevLogin}
              variant="secondary"
            />

            <Text style={styles.demoNote}>
              Use "Quick Demo Login" to skip the form and try the app immediately
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AnimatedScreen>
  );
};

// Animated Item Card Component
const ItemCard = ({ item, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const getDistance = () => {
    if (!item.lat || !item.lng) return "—";
    const distance = calculateDistance(
      DEFAULT_USER_LOCATION.lat,
      DEFAULT_USER_LOCATION.lng,
      item.lat,
      item.lng
    );
    return formatDistance(distance);
  };

  const getExpiryChip = () => {
    if (!item.expiresAt) return null;
    const timeRemaining = getTimeRemaining(item.expiresAt);
    if (!timeRemaining || timeRemaining === "Expired") return null;
    
    return (
      <View style={styles.chip}>
        <Text style={styles.chipText}>
          Expires in {timeRemaining}
        </Text>
      </View>
    );
  };

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View style={[
        styles.itemCard,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        <View style={styles.itemContent}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.itemImage}
            resizeMode="cover"
          />
          
          <View style={styles.itemTextContent}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.itemPrice}>
                {formatPrice(item.priceCents)}
              </Text>
            </View>
            
            <View style={styles.itemFooter}>
              <Text style={styles.itemDistance}>
                {getDistance()}
              </Text>
              {getExpiryChip()}
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Main App Component
function App() {
  const { user, isLoggedIn, login, logout } = useAuth();
  const { items, getGeneralItems, getFreeItems, refresh, refreshing } = useItems();
  const [activeTab, setActiveTab] = useState("general");
  const [selectedItem, setSelectedItem] = useState(null);

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

  if (!isLoggedIn) {
    return <AuthScreen />;
  }

  if (selectedItem) {
    return (
      <AnimatedScreen animationType="fadeSlide">
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setSelectedItem(null)}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Item Details</Text>
            <View style={styles.headerSpacer} />
          </View>
          
          <ScrollView style={styles.detailContainer}>
            <Image
              source={{ uri: selectedItem.imageUrl }}
              style={styles.detailImage}
              resizeMode="cover"
            />
            
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>
                {selectedItem.title}
              </Text>
              <Text style={styles.detailPrice}>
                {formatPrice(selectedItem.priceCents)}
              </Text>
              
              {selectedItem.description && (
                <View style={styles.detailDescription}>
                  <Text style={styles.detailDescriptionTitle}>
                    Description
                  </Text>
                  <Text style={styles.detailDescriptionText}>
                    {selectedItem.description}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </AnimatedScreen>
    );
  }

  return (
    <AnimatedScreen animationType="fade">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.profileButton}
          >
            <Image
              source={{ uri: user.avatarUrl }}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>RightNow</Text>

          <TouchableOpacity
            onPress={logout}
            style={styles.settingsButton}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setActiveTab("general")}
            style={[styles.tab, activeTab === "general" && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === "general" && styles.activeTabText]}>
              General Listings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("free")}
            style={[styles.tab, activeTab === "free" && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === "free" && styles.activeTabText]}>
              Free Stuff
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />

        <FlatList
          data={getCurrentItems()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemCard 
              item={item} 
              onPress={setSelectedItem}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              colors={["#3B82F6"]}
              tintColor="#3B82F6"
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 8 }}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>📦</Text>
              <Text style={styles.emptyTitle}>No items found</Text>
              <Text style={styles.emptyMessage}>{getEmptyMessage()}</Text>
            </View>
          )}
        />
      </View>
    </AnimatedScreen>
  );
}

function AppWithProviders() {
  return (
    <AuthProvider>
      <ItemsProvider>
        <App />
      </ItemsProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  // Animation Styles
  animatedContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  // Auth Styles
  authContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    paddingTop: 60,
  },
  authHeader: {
    alignItems: "center",
    marginBottom: 40,
  },
  welcomeEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  authSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 48,
  },
  inputError: {
    borderColor: "#ef4444",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    marginBottom: 16,
  },
  buttonPrimary: {
    backgroundColor: "#2563eb",
  },
  buttonSecondary: {
    backgroundColor: "#e5e7eb",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextPrimary: {
    color: "#ffffff",
  },
  buttonTextSecondary: {
    color: "#374151",
  },
  switchButton: {
    alignItems: "center",
    marginBottom: 24,
  },
  switchText: {
    fontSize: 14,
    color: "#6b7280",
  },
  switchLink: {
    color: "#2563eb",
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#d1d5db",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  demoNote: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#6b7280",
  },
  // Existing styles...
  header: {
    marginTop: 60,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  loginButton: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  loginText: {
    color: "#2563eb",
    fontWeight: "500",
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  settingsButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: {
    fontSize: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: "#2563eb",
    fontWeight: "600",
  },
  headerSpacer: {
    width: 32,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#2563eb",
  },
  tabText: {
    fontWeight: "500",
    color: "#6b7280",
  },
  activeTabText: {
    color: "#2563eb",
  },
  spacer: {
    height: 20,
    backgroundColor: "#f9fafb",
  },
  itemCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 12,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  itemContent: {
    flexDirection: "row",
  },
  itemImage: {
    width: 96,
    height: 96,
  },
  itemTextContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  itemHeader: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: "600",
    color: "#111827",
    fontSize: 16,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  itemDistance: {
    fontSize: 14,
    color: "#6b7280",
  },
  chip: {
    backgroundColor: "#fef3c7",
    borderWidth: 1,
    borderColor: "#f59e0b",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#92400e",
  },
  detailContainer: {
    flex: 1,
  },
  detailImage: {
    width: "100%",
    height: 256,
  },
  detailContent: {
    padding: 16,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  detailPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 16,
  },
  detailDescription: {
    marginBottom: 24,
  },
  detailDescriptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  detailDescriptionText: {
    color: "#374151",
    lineHeight: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyMessage: {
    color: "#6b7280",
    textAlign: "center",
  },
});

registerRootComponent(AppWithProviders);
