// Mock API for RightNow marketplace
// Simulates a backend with in-memory data storage

// Sample items with real image URLs and realistic data
const SAMPLE_ITEMS = [
  {
    id: "1",
    title: "Vintage Leather Jacket",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
    description: "Beautiful brown leather jacket in excellent condition. Size M.",
    priceCents: 8500, // $85.00
    lat: 37.4419,
    lng: -122.1430,
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    ownerUserId: "user1"
  },
  {
    id: "2", 
    title: "Free Books - Computer Science",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    description: "Collection of CS textbooks, free to good home. Includes algorithms, data structures, and programming books.",
    priceCents: 0, // Free
    lat: 37.4419,
    lng: -122.1430,
    expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    ownerUserId: "user2"
  },
  {
    id: "3",
    title: "MacBook Pro 13-inch",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    description: "2019 MacBook Pro, 8GB RAM, 256GB SSD. Great condition, battery life excellent.",
    priceCents: 120000, // $1200.00
    lat: 37.4419,
    lng: -122.1430,
    expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
    ownerUserId: "user1"
  },
  {
    id: "4",
    title: "Free Plant Pots",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    description: "Various ceramic and plastic plant pots. Perfect for gardening enthusiasts.",
    priceCents: 0, // Free
    lat: 37.4419,
    lng: -122.1430,
    expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), // 1 hour from now
    createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(), // 20 minutes ago
    ownerUserId: "user3"
  },
  {
    id: "5",
    title: "Bicycle - Mountain Bike",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    description: "Trek mountain bike, 21-speed, recently tuned up. Great for trails and commuting.",
    priceCents: 45000, // $450.00
    lat: 37.4419,
    lng: -122.1430,
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours from now
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    ownerUserId: "user2"
  },
  {
    id: "6",
    title: "Free Kitchen Utensils",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    description: "Assorted kitchen tools and utensils. Moving and need to clear out kitchen items.",
    priceCents: 0, // Free
    lat: 37.4419,
    lng: -122.1430,
    expiresAt: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), // 5 hours from now
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    ownerUserId: "user1"
  }
];

// Sample user data
const SAMPLE_USER = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  locationText: "Stanford, CA",
  age: 28
};

// In-memory storage (simulates database)
let items = [...SAMPLE_ITEMS];
let currentUser = null;

// Simulate network delay
const NETWORK_DELAY = 300;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API functions that return Promises to simulate network calls
export const mockApi = {
  // Get all items, sorted by expiry (soonest first)
  async getItems() {
    await delay(NETWORK_DELAY);
    return [...items].sort((a, b) => {
      if (!a.expiresAt && !b.expiresAt) return 0;
      if (!a.expiresAt) return 1;
      if (!b.expiresAt) return -1;
      return new Date(a.expiresAt) - new Date(b.expiresAt);
    });
  },

  // Get items by owner (for managing center)
  async getItemsByOwner(userId) {
    await delay(NETWORK_DELAY);
    return items.filter(item => item.ownerUserId === userId);
  },

  // Get single item by ID
  async getItemById(id) {
    await delay(NETWORK_DELAY);
    return items.find(item => item.id === id) || null;
  },

  // Create new item
  async createItem(itemData) {
    await delay(NETWORK_DELAY);
    const newItem = {
      id: Date.now().toString(),
      ...itemData,
      createdAt: new Date().toISOString(),
      ownerUserId: currentUser?.id
    };
    items.unshift(newItem); // Add to beginning of array
    return newItem;
  },

  // Get current user (null if not logged in)
  async getCurrentUser() {
    await delay(NETWORK_DELAY);
    return currentUser;
  },

  // Dev login (for MVP - creates a fake user)
  async devLogin() {
    await delay(NETWORK_DELAY);
    currentUser = { ...SAMPLE_USER };
    return currentUser;
  },

  // Login with custom user data (for form-based login)
  async loginWithUserData(userData) {
    await delay(NETWORK_DELAY);
    
    // Generate a random avatar if not provided
    const avatarUrls = [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    ];
    
    currentUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      avatarUrl: avatarUrls[Math.floor(Math.random() * avatarUrls.length)],
      locationText: userData.location,
      createdAt: new Date().toISOString()
    };
    
    return currentUser;
  },

  // Logout
  async logout() {
    await delay(NETWORK_DELAY);
    currentUser = null;
    return true;
  },

  // Update user profile
  async updateProfile(updates) {
    await delay(NETWORK_DELAY);
    if (currentUser) {
      currentUser = { ...currentUser, ...updates };
    }
    return currentUser;
  }
};
