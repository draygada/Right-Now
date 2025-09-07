# RightNow - Local Marketplace App

A simple, beginner-friendly mobile marketplace app built with Expo and React Native. Browse items, view details, and post new listings with a clean, intuitive interface.

## What is RightNow?

RightNow is a basic marketplace app similar to Facebook Marketplace, designed for buying and selling goods in your local area. The app features:

- **Browse Listings**: View items in two categories - General Listings (paid items) and Free Stuff
- **Item Details**: Tap any item to see full details including photos, descriptions, and distance
- **User Profiles**: Manage your profile, view your current and expired posts
- **Simple Posting**: Create new listings with photos, descriptions, and pricing
- **Distance Tracking**: See how far items are from your location

## Prerequisites

Before running the app, make sure you have:

- **Node.js** (LTS version recommended)
- **Expo CLI** installed globally: `npm install -g @expo/cli`
- **iOS Simulator** (for Mac) or **Expo Go** app on your phone

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npx expo start
   ```

3. **Run on your device:**
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal  
   - **Physical Device**: Scan the QR code with Expo Go app

## Project Structure

The app is organized into clear, beginner-friendly folders:

```
RightNow/
├── app/                    # Screen components (Expo Router)
│   ├── _layout.js         # Main layout with header
│   ├── index.js           # Home screen with tabs
│   ├── item/[id].js       # Item detail screen
│   ├── me/index.js        # Managing center
│   ├── login.js           # Login screen
│   ├── settings.js        # Settings screen
│   └── sell.js            # Sell item screen
├── components/            # Reusable UI components
│   ├── HeaderBar.js       # Top navigation bar
│   ├── ItemCard.js        # Item display card
│   ├── TabSwitcher.js     # Tab navigation
│   ├── Button.js          # Styled button
│   ├── Input.js           # Form input field
│   └── ...                # Other UI components
├── context/               # React Context for state
│   ├── AuthContext.js     # User authentication
│   └── ItemsContext.js    # Items management
├── lib/                   # Utility functions
│   ├── mockApi.js         # Mock backend API
│   ├── format.js          # Data formatting helpers
│   └── distance.js        # Distance calculations
└── styles/                # Styling configuration
    └── nativewind.js      # NativeWind setup
```

## How It Works

### Mock Data
The app uses a mock API (`lib/mockApi.js`) that simulates a real backend:
- Items are stored in memory as a JavaScript array
- API calls have simulated network delays (300ms)
- Sample data includes 6 items with real images from Unsplash
- No real authentication - uses a "dev login" for demo purposes

### State Management
- **AuthContext**: Manages user login state and profile data
- **ItemsContext**: Handles item listings, creation, and filtering
- Both contexts use React's built-in state management (no Redux needed)

### Navigation
- Uses Expo Router for file-based routing
- Stack navigation with a shared header
- Deep linking support for item details

## Customizing the App

### Adding New Items
Edit `lib/mockApi.js` and add items to the `SAMPLE_ITEMS` array:

```javascript
{
  id: "unique-id",
  title: "Your Item Title",
  imageUrl: "https://example.com/image.jpg",
  description: "Item description",
  priceCents: 5000, // $50.00 (0 for free)
  lat: 37.4419,     // Latitude
  lng: -122.1430,   // Longitude
  expiresAt: "2024-01-01T12:00:00.000Z", // Optional expiry
  createdAt: "2024-01-01T10:00:00.000Z",
  ownerUserId: "user1"
}
```

### Changing User Location
Update `DEFAULT_USER_LOCATION` in `lib/distance.js` to set your default location for distance calculations.

### Styling
The app uses Tailwind CSS via NativeWind. Modify `tailwind.config.js` to customize colors, fonts, and spacing.

## Common Issues & Solutions

### Network Images Not Loading
- Ensure you have internet connection
- Check that image URLs are valid and accessible
- On iOS, network images work by default
- On Android, you may need to add network security config

### App Won't Start
- Make sure all dependencies are installed: `npm install`
- Clear Expo cache: `npx expo start --clear`
- Check that you're using a compatible Node.js version

### Navigation Issues
- Ensure all screen files are in the correct `app/` directory
- Check that route names match file names exactly
- Use `expo-router` imports correctly

## Features Implemented

✅ **Core MVP Features:**
- Home screen with General/Free tabs
- Item listings sorted by expiry (soonest first)
- Item detail screen with full information
- User profile management (Managing Center)
- Login/logout functionality
- Settings screen with theme toggle placeholder
- Sell item form with validation
- Pull-to-refresh on all lists
- Distance calculation and display
- Expiry time tracking with visual chips

✅ **UI/UX Features:**
- Clean, modern design with Tailwind CSS
- Responsive layout for different screen sizes
- Loading states and empty state handling
- Form validation with error messages
- Accessible button sizes (min 44px touch targets)
- Safe area handling for different devices

## Next Steps

This MVP provides a solid foundation for a marketplace app. Future enhancements could include:

- Real backend integration (Firebase, Supabase, etc.)
- Push notifications for new items
- Image upload and storage
- Payment processing
- Advanced search and filtering
- User ratings and reviews
- Real-time messaging between users
- Location services integration

## Built With

- **Expo** - React Native development platform
- **React Native** - Mobile app framework
- **NativeWind** - Tailwind CSS for React Native
- **Expo Router** - File-based navigation
- **React Context** - State management

## License

This project is for educational purposes. Feel free to use and modify as needed.
