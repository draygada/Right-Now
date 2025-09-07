// Auth Screen Component
import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Animated 
} from "react-native";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { validateForm } from "../utils/validation";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, ANIMATION_DURATION } from "../constants";

const AuthScreen = () => {
  const { login, register } = useAuth();
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

  const validationRules = {
    email: { required: true, type: "email", label: "Email" },
    password: { required: true, type: "password", label: "Password" },
    ...(isLogin ? {} : {
      name: { required: true, type: "name", label: "Name" },
      location: { required: true, label: "Location" },
      confirmPassword: { required: true, confirmField: "password", label: "Confirm Password" }
    })
  };

  const handleSubmit = async () => {
    const validation = validateForm(formData, validationRules);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          location: formData.location
        });
      }
    } catch (error) {
      console.error("Auth error:", error);
      setErrors({ general: error.message || "Authentication failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleDevLogin = async () => {
    console.log("🚀 Dev login button pressed!");
    try {
      setLoading(true);
      console.log("📞 Calling login()...");
      const result = await login();
      console.log("✅ Login successful:", result);
    } catch (error) {
      console.error("❌ Dev login error:", error);
      setErrors({ general: `Dev login failed: ${error.message}` });
    } finally {
      setLoading(false);
      console.log("🏁 Dev login finished");
    }
  };

  const switchMode = () => {
    Animated.timing(switchAnim, {
      toValue: isLogin ? 1 : 0,
      duration: ANIMATION_DURATION.normal,
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

  const renderInput = (key, placeholder, options = {}) => (
    <View style={styles.inputContainer} key={key}>
      <TextInput
        value={formData[key]}
        onChangeText={(text) => setFormData(prev => ({ ...prev, [key]: text }))}
        placeholder={placeholder}
        style={[styles.input, errors[key] && styles.inputError]}
        placeholderTextColor={COLORS.gray[400]}
        {...options}
      />
      {errors[key] && (
        <Text style={styles.errorText}>{errors[key]}</Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          {isLogin ? "Logging you in..." : "Creating your account..."}
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>👋</Text>
          <Text style={styles.title}>
            {isLogin ? "Welcome Back!" : "Join RightNow"}
          </Text>
          <Text style={styles.subtitle}>
            {isLogin 
              ? "Sign in to your account" 
              : "Create an account to start buying and selling"
            }
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {errors.general && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errors.general}</Text>
            </View>
          )}

          {!isLogin && (
            <Animated.View style={{
              opacity: switchAnim,
              maxHeight: switchAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100]
              })
            }}>
              {renderInput("name", "Full Name")}
            </Animated.View>
          )}

          {renderInput("email", "Email", { 
            keyboardType: "email-address",
            autoCapitalize: "none"
          })}

          {renderInput("password", "Password", { 
            secureTextEntry: true 
          })}

          {!isLogin && (
            <Animated.View style={{
              opacity: switchAnim,
              maxHeight: switchAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 200]
              })
            }}>
              {renderInput("confirmPassword", "Confirm Password", { 
                secureTextEntry: true 
              })}
              {renderInput("location", "Location (e.g., Stanford, CA)")}
            </Animated.View>
          )}

          <Button
            title={isLogin ? "Sign In" : "Create Account"}
            onPress={handleSubmit}
            disabled={loading}
            style={styles.submitButton}
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
            disabled={loading}
          />

          <Text style={styles.demoNote}>
            Use "Quick Demo Login" to skip the form and try the app immediately
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.gray[600],
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: SPACING.lg,
    paddingTop: SPACING.xxl * 2,
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.xxl,
  },
  emoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: SPACING.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[600],
    textAlign: "center",
    lineHeight: 24,
  },
  form: {
    width: "100%",
  },
  errorContainer: {
    backgroundColor: COLORS.error + "20",
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    backgroundColor: COLORS.white,
    minHeight: 48,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.sm,
    marginTop: SPACING.xs,
  },
  submitButton: {
    marginBottom: SPACING.md,
  },
  switchButton: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  switchText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
  },
  switchLink: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray[300],
  },
  dividerText: {
    marginHorizontal: SPACING.md,
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
    fontWeight: "500",
  },
  demoNote: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[500],
    textAlign: "center",
    marginTop: SPACING.xs,
    lineHeight: 16,
  },
});

export default AuthScreen;
