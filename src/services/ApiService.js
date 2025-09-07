// API Service Layer - Abstracted for easy backend swapping
import { API_ENDPOINTS } from "../constants";
import { mockApi } from "../utils/mockApi";

class ApiService {
  constructor() {
    this.baseURL = __DEV__ ? "http://localhost:3000/api" : "https://api.rightnow.com";
    this.mockMode = true; // Toggle this when real backend is ready
  }

  // Generic API call method
  async apiCall(endpoint, options = {}) {
    if (this.mockMode) {
      return this.mockApiCall(endpoint, options);
    }

    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = await this.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Call failed:", error);
      throw error;
    }
  }

  // Mock API implementation (current behavior)
  async mockApiCall(endpoint, options = {}) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Parse JSON body if it exists
    const body = options.body ? JSON.parse(options.body) : null;

    // Route to appropriate mock method based on endpoint
    console.log("🎯 Mock API endpoint:", endpoint);
    console.log("📄 Parsed body:", body);
    switch (endpoint) {
      case API_ENDPOINTS.AUTH.LOGIN:
        if (body?.userData) {
          console.log("📧 Calling mockApi.login with:", body.userData.email, body.userData.password);
          return mockApi.login(body.userData.email, body.userData.password);
        } else {
          console.log("🛠️ Calling mockApi.devLogin()");
          return mockApi.devLogin();
        }
      
      case API_ENDPOINTS.AUTH.REGISTER:
        return mockApi.signup(body.name, body.email, body.password);
      
      case API_ENDPOINTS.AUTH.LOGOUT:
        return mockApi.logout();
      
      case API_ENDPOINTS.ITEMS.LIST:
        return mockApi.getItems();
      
      case API_ENDPOINTS.ITEMS.CREATE:
        return mockApi.createItem(body);
      
      case API_ENDPOINTS.USER.PROFILE:
        return mockApi.getCurrentUser();
      
      default:
        throw new Error(`Mock endpoint not implemented: ${endpoint}`);
    }
  }

  // Auth methods
  async login(credentials) {
    console.log("🔌 ApiService login called with:", credentials);
    const result = await this.apiCall(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    console.log("🔌 ApiService login result:", result);
    return result;
  }

  async register(userData) {
    return this.apiCall(API_ENDPOINTS.AUTH.REGISTER, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.apiCall(API_ENDPOINTS.AUTH.LOGOUT, {
      method: "POST",
    });
  }

  // Items methods
  async getItems() {
    return this.apiCall(API_ENDPOINTS.ITEMS.LIST);
  }

  async createItem(itemData) {
    return this.apiCall(API_ENDPOINTS.ITEMS.CREATE, {
      method: "POST",
      body: JSON.stringify(itemData),
    });
  }

  async getItemById(id) {
    return this.apiCall(API_ENDPOINTS.ITEMS.DETAIL.replace(":id", id));
  }

  // User methods
  async getUserProfile() {
    return this.apiCall(API_ENDPOINTS.USER.PROFILE);
  }

  async updateUserProfile(updates) {
    return this.apiCall(API_ENDPOINTS.USER.UPDATE, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  }

  // Auth token management (for real backend)
  async getAuthToken() {
    // TODO: Implement secure token storage (AsyncStorage/Keychain)
    return null;
  }

  async setAuthToken(token) {
    // TODO: Implement secure token storage
  }

  async clearAuthToken() {
    // TODO: Implement token clearing
  }
}

export default new ApiService();
