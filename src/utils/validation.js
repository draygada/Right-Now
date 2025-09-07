// Validation utilities
import { VALIDATION_RULES } from "../constants";

export const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) return "Please enter a valid email";
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`;
  }
  return null;
};

export const validateName = (name) => {
  if (!name || !name.trim()) return "Name is required";
  if (name.trim().length < VALIDATION_RULES.NAME_MIN_LENGTH) {
    return `Name must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters`;
  }
  return null;
};

export const validateRequired = (value, fieldName) => {
  if (!value || !value.toString().trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
};

export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = formData[field];
    
    if (rule.required) {
      const error = validateRequired(value, rule.label || field);
      if (error) {
        errors[field] = error;
        return;
      }
    }
    
    if (rule.type === "email") {
      const error = validateEmail(value);
      if (error) errors[field] = error;
    }
    
    if (rule.type === "password") {
      const error = validatePassword(value);
      if (error) errors[field] = error;
    }
    
    if (rule.type === "name") {
      const error = validateName(value);
      if (error) errors[field] = error;
    }
    
    if (rule.confirmField) {
      const error = validatePasswordConfirmation(formData[rule.confirmField], value);
      if (error) errors[field] = error;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
