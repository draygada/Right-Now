# RightNow - Production-Ready Local Marketplace App

## PROJECT OVERVIEW

**Type**: React Native mobile marketplace application  
**Architecture**: Production-ready with service layer pattern  
**Backend**: Mock API (ready for real backend integration)  
**Navigation**: React Navigation stack  
**State Management**: React Context  
**Styling**: React Native StyleSheet with centralized constants  
**Target Platform**: iOS/Android via Expo  

## TECHNICAL STACK

```json
{
  "framework": "React Native with Expo",
  "navigation": "React Navigation v6",
  "state": "React Context API",
  "styling": "React Native StyleSheet",
  "backend": "Mock API (production-ready service layer)",
  "dependencies": {
    "expo": "~53.0.0",
    "react-native": "0.79.5",
    "@react-navigation/native": "^6.x",
    "@react-navigation/stack": "^6.x",
    "react-native-screens": "~4.11.1",
    "react-native-safe-area-context": "5.4.0",
    "react-native-gesture-handler": "~2.24.0"
  }
}
```

## QUICK START COMMANDS

```bash
# Installation
git clone <repository-url>
cd RightNow
npm install

# Development
npx expo start --clear

# Run on devices
# iOS Simulator: Press 'i'
# Android Emulator: Press 'a'  
# Physical Device: Scan QR with Expo Go
```

## PROJECT STRUCTURE (PRODUCTION ARCHITECTURE)

```
RightNow/
├── index.js                     # App entry point with providers
├── src/                         # All source code
│   ├── components/              # Reusable UI components
│   │   ├── Button.js           # Styled button with variants
│   │   ├── Input.js            # Form input with validation
│   │   ├── ItemCard.js         # Item display card
│   │   ├── ItemList.js         # List with loading/error states
│   │   ├── TabSwitcher.js      # Tab navigation component
│   │   ├── HeaderBar.js        # App header with profile/settings
│   │   ├── ProfileHeader.js    # User profile display
│   │   ├── Screen.js           # Screen wrapper component
│   │   ├── Loading.js          # Loading state component
│   │   ├── Empty.js            # Empty state component
│   │   └── Chip.js             # Status chip component
│   ├── screens/                # Screen components
│   │   ├── AuthScreen.js       # Login/signup with animations
│   │   ├── HomeScreen.js       # Main feed with tabs
│   │   ├── ItemDetailScreen.js # Item detail view
│   │   ├── ProfileScreen.js    # User profile management
│   │   ├── SettingsScreen.js   # App settings
│   │   └── SellScreen.js       # Create new listing
│   ├── navigation/             # Navigation configuration
│   │   └── AppNavigator.js     # React Navigation setup
│   ├── context/                # React Context providers
│   │   ├── AuthContext.js      # Authentication state
│   │   └── ItemsContext.js     # Items management state
│   ├── services/               # API and external services
│   │   └── ApiService.js       # API abstraction layer
│   ├── utils/                  # Utility functions
│   │   ├── mockApi.js          # Mock backend implementation
│   │   ├── format.js           # Data formatting utilities
│   │   ├── distance.js         # Distance calculations
│   │   └── validation.js       # Form validation rules
│   ├── constants/              # App constants
│   │   └── index.js            # Colors, spacing, fonts, etc.
│   ├── hooks/                  # Custom React hooks
│   │   └── useAuth.js          # Authentication hook
│   └── types/                  # TypeScript types (future)
├── assets/                     # Images, fonts, etc.
└── package.json               # Dependencies and scripts
```

## KEY ARCHITECTURAL PATTERNS

### SERVICE LAYER PATTERN
**File**: `src/services/ApiService.js`
- Centralized API handling
- Mock/real backend toggle via single flag
- Consistent error handling across app
- Easy backend integration

```javascript
// Current: Mock mode
const mockMode = true;

// Production: Real backend
const mockMode = false;
const baseURL = "https://your-api.com";
```

### COMPONENT ARCHITECTURE
**Pattern**: Reusable, composable components
**Styling**: Centralized constants in `src/constants/index.js`
**State**: Loading, error, empty states handled consistently

### STATE MANAGEMENT
**Pattern**: React Context for global state
**Files**: 
- `src/context/AuthContext.js` - User authentication
- `src/context/ItemsContext.js` - Items management

### NAVIGATION STRUCTURE
**Library**: React Navigation v6 Stack Navigator
**File**: `src/navigation/AppNavigator.js`
**Pattern**: Conditional routing based on auth state

## MOCK BACKEND SPECIFICATION

### DATA MODELS

**Item Model**:
```javascript
{
  id: "string",
  title: "string",
  description: "string",
  priceCents: number, // 0 for free items
  imageUrl: "string", // Unsplash URLs
  lat: number,
  lng: number,
  category: "general" | "free",
  sellerId: "string",
  expiresAt: "ISO string",
  createdAt: "ISO string"
}
```

**User Model**:
```javascript
{
  id: "string",
  name: "string", 
  email: "string",
  avatar: "string", // Unsplash URL
  location: "string"
}
```

### API ENDPOINTS (Mock)

**File**: `src/utils/mockApi.js`

```javascript
// Authentication
mockApi.login(email, password) → {user, token}
mockApi.signup(name, email, password) → {user, token}
mockApi.logout() → {success: true}
mockApi.getCurrentUser() → user | null

// Items
mockApi.getItems() → Item[]
mockApi.getItemById(id) → Item
mockApi.createItem(itemData) → Item

// Dev helpers
mockApi.devLogin(userId) → {user, token}
mockApi.updateProfile(updates) → user
```

### SAMPLE DATA

**Items**: 5 realistic items with Unsplash images
- Vintage Leather Jacket ($125, expires 3 days)
- iPhone 13 Pro ($850, expires 5 days)
- Free Moving Boxes (Free, expires 1 day)
- Gaming Chair ($250, expires 7 days)
- Free Houseplants (Free, expires 2 days)

**Users**: 4 sample users with profiles
**Location**: San Francisco coordinates for distance calculations

## DESIGN SYSTEM

### COLORS (src/constants/index.js)
```javascript
COLORS = {
  primary: "#2563eb",      // Blue
  background: "#f9fafb",   // Light gray
  white: "#ffffff",
  gray: {50: "#f9fafb", ..., 900: "#111827"},
  success: "#10b981",      // Green
  warning: "#f59e0b",      // Yellow
  error: "#ef4444"         // Red
}
```

### SPACING SYSTEM
```javascript
SPACING = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48
}
```

### TYPOGRAPHY
```javascript
FONT_SIZES = {
  xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24, xxxl: 28
}
```

## TESTING CONFIGURATION

### Mock Login Credentials
```javascript
// Any of these work (password must be 6+ characters)
{email: "john@example.com", password: "password123"}
{email: "jane@example.com", password: "password123"}
{email: "mike@example.com", password: "password123"}
{email: "sarah@example.com", password: "password123"}
```

### Dev Testing
- **Items**: 5 pre-loaded sample items
- **Network delays**: 300-1000ms simulated
- **Error handling**: Validation and error states
- **Location**: San Francisco default coordinates

## PRODUCTION READINESS CHECKLIST

### ✅ ALREADY IMPLEMENTED
- Service layer architecture
- Error handling and loading states
- Form validation
- Responsive design
- Component reusability
- State management patterns
- Navigation structure
- Mock backend with realistic data
- Professional UI/UX

### 🔲 NEEDED FOR PRODUCTION
- Real backend API (Firebase/Supabase/custom)
- Image upload service (Cloudinary/AWS S3)
- Push notifications (Expo Notifications)
- Payment processing (Stripe/PayPal)
- Real authentication (JWT tokens/OAuth)
- Location services (Expo Location)
- App store deployment (EAS Build)

## BACKEND INTEGRATION GUIDE

### STEP 1: Switch API Mode
```javascript
// In src/services/ApiService.js
const mockMode = false; // Change to false
const baseURL = "https://your-api.com"; // Add your API URL
```

### STEP 2: Implement Real API Methods
Replace mock functions in `ApiService.js` with real HTTP calls:
```javascript
async realApiCall(endpoint, options = {}) {
  const response = await fetch(`${baseURL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`,
      ...options.headers
    },
    ...options
  });
  return response.json();
}
```

### STEP 3: Update Data Models
Ensure your backend returns data matching the models in mock API.

## COMMON DEVELOPMENT ISSUES

### Import Errors
```bash
# Fix: Ensure all files exist in src/ folder
# Check import paths use relative paths (../utils/mockApi)
```

### App Won't Start
```bash
npx expo start --clear
npm install
# Check Node.js version compatibility
```

### Navigation Errors
```bash
# Ensure React Navigation packages installed
# Check screen names match navigation calls
npm install @react-navigation/native @react-navigation/stack
```

### Network Images Not Loading
- iOS: Works by default
- Android: May need network security config
- Check internet connection and Unsplash URLs

## DEPLOYMENT PREPARATION

### EAS Build Configuration
```bash
npm install -g @expo/cli
expo install expo-dev-client
expo build:configure
```

### Environment Variables
```javascript
// For production API URLs, keys, etc.
const API_URL = process.env.EXPO_PUBLIC_API_URL || "mock";
```

### App Store Requirements
- Bundle identifier configured
- App icons and splash screens
- Privacy policy and terms
- App store screenshots and descriptions

## BUSINESS FEATURES

### USER FEATURES
- Browse items by category (General/Free)
- View item details with images and descriptions
- Distance calculation from user location
- Expiry tracking with visual indicators
- User authentication and profiles
- Create and manage listings

### TECHNICAL FEATURES
- Pull-to-refresh functionality
- Loading states and error handling
- Form validation and user feedback
- Responsive design for all screen sizes
- Smooth navigation transitions
- Professional UI components

## CUSTOMIZATION GUIDE

### Add New Items (Mock)
```javascript
// Edit src/utils/mockApi.js
SAMPLE_ITEMS.push({
  id: "new-id",
  title: "New Item",
  description: "Description",
  priceCents: 5000, // $50.00
  imageUrl: "https://images.unsplash.com/photo-xyz",
  category: "general", // or "free"
  // ... other fields
});
```

### Change Default Location
```javascript
// Edit src/utils/distance.js
export const DEFAULT_USER_LOCATION = {
  lat: 40.7128, // New York
  lng: -74.0060
};
```

### Customize Colors
```javascript
// Edit src/constants/index.js
export const COLORS = {
  primary: "#your-brand-color",
  // ... other colors
};
```

## SUPPORT INFORMATION

**Framework**: Expo SDK 53  
**React Native**: 0.79.5  
**Node.js**: LTS version recommended  
**Development**: iOS Simulator, Android Emulator, Expo Go  
**Deployment**: EAS Build for app stores  

---

**STATUS: Production-ready architecture with mock backend**  
**NEXT STEP: Integrate real backend API**  
**DEPLOYMENT: Ready for app store submission after backend integration**
