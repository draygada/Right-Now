// Mock API for development
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Sample data
const SAMPLE_ITEMS = [
  {
    id: "1",
    title: "Vintage Leather Jacket",
    description: "Genuine leather jacket from the 80s, excellent condition. Perfect for collectors or fashion enthusiasts.",
    priceCents: 12500,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    lat: 37.7749,
    lng: -122.4194,
    sellerId: "user1",
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    category: "general"
  },
  {
    id: "2", 
    title: "iPhone 13 Pro",
    description: "Barely used iPhone 13 Pro, 256GB, includes original box and charger.",
    priceCents: 85000,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    lat: 37.7849,
    lng: -122.4094,
    sellerId: "user2",
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    category: "general"
  },
  {
    id: "3",
    title: "Free Moving Boxes",
    description: "Various sized moving boxes, all clean and in good condition. Perfect for your next move!",
    priceCents: 0,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    lat: 37.7649,
    lng: -122.4294,
    sellerId: "user3",
    expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    category: "free"
  },
  {
    id: "4",
    title: "Gaming Chair",
    description: "Ergonomic gaming chair with lumbar support. Used for 6 months, excellent condition.",
    priceCents: 25000,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    lat: 37.7949,
    lng: -122.3994,
    sellerId: "user1",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    category: "general"
  },
  {
    id: "5",
    title: "Free Houseplants",
    description: "Giving away some houseplants - pothos and snake plants. Great for beginners!",
    priceCents: 0,
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
    lat: 37.7549,
    lng: -122.4394,
    sellerId: "user4",
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    category: "free"
  }
];

const SAMPLE_USERS = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    location: "San Francisco, CA"
  },
  {
    id: "user2", 
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    location: "San Francisco, CA"
  },
  {
    id: "user3",
    name: "Mike Johnson", 
    email: "mike@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    location: "San Francisco, CA"
  },
  {
    id: "user4",
    name: "Sarah Wilson",
    email: "sarah@example.com", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    location: "San Francisco, CA"
  }
];

// Current user state (for mock authentication)
let currentUser = null;

// Mock API functions
export const mockApi = {
  // Items
  async getItems() {
    await delay(300);
    return SAMPLE_ITEMS.sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt));
  },

  async getItemById(id) {
    await delay(200);
    const item = SAMPLE_ITEMS.find(item => item.id === id);
    if (!item) throw new Error("Item not found");
    return item;
  },

  async createItem(itemData) {
    await delay(500);
    if (!currentUser) throw new Error("Must be logged in to create items");
    
    const newItem = {
      id: Date.now().toString(),
      ...itemData,
      sellerId: currentUser.id,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days default
    };
    
    SAMPLE_ITEMS.unshift(newItem);
    return newItem;
  },

  // Authentication
  async login(email, password) {
    await delay(800);
    
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Simple mock validation
    const user = SAMPLE_USERS.find(u => u.email === email);
    if (!user || password.length < 6) {
      throw new Error("Invalid email or password");
    }

    currentUser = user;
    return {
      user,
      token: `mock-token-${user.id}`,
    };
  },

  async signup(name, email, password) {
    await delay(1000);
    
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    // Check if user already exists
    if (SAMPLE_USERS.find(u => u.email === email)) {
      throw new Error("User with this email already exists");
    }

    const newUser = {
      id: `user${Date.now()}`,
      name,
      email,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`,
      location: "San Francisco, CA"
    };

    SAMPLE_USERS.push(newUser);
    currentUser = newUser;

    return {
      user: newUser,
      token: `mock-token-${newUser.id}`,
    };
  },

  async logout() {
    await delay(200);
    currentUser = null;
    return { success: true };
  },

  async getCurrentUser() {
    await delay(100);
    return currentUser;
  },

  // Dev helpers
  async devLogin(userId = "user1") {
    await delay(100);
    const user = SAMPLE_USERS.find(u => u.id === userId);
    if (!user) throw new Error("User not found");
    currentUser = user;
    return {
      user,
      token: `mock-token-${user.id}`,
    };
  },

  async updateProfile(updates) {
    await delay(500);
    if (!currentUser) throw new Error("Must be logged in");
    
    Object.assign(currentUser, updates);
    return currentUser;
  }
};

export default mockApi; 