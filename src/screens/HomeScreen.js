import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  FlatList,
  RefreshControl
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen = () => {
  const { user, isLoggedIn } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([]);

  // Mock data for now
  const mockItems = [
    {
      id: '1',
      title: 'Vintage Camera',
      price: '$150',
      location: 'San Francisco, CA',
      image: 'https://via.placeholder.com/150',
      description: 'Beautiful vintage camera in great condition'
    },
    {
      id: '2',
      title: 'MacBook Pro',
      price: '$1200',
      location: 'Palo Alto, CA',
      image: 'https://via.placeholder.com/150',
      description: '2019 MacBook Pro, excellent condition'
    },
    {
      id: '3',
      title: 'Bicycle',
      price: '$300',
      location: 'Berkeley, CA',
      image: 'https://via.placeholder.com/150',
      description: 'Mountain bike, perfect for trails'
    }
  ];

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    setItems(mockItems);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      loadItems();
      setRefreshing(false);
    }, 1000);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Text style={styles.itemLocation}>{item.location}</Text>
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            {isLoggedIn ? `Welcome back, ${user?.name || 'User'}!` : 'Welcome to RightNow!'}
          </Text>
          <Text style={styles.subtitleText}>
            Discover amazing items in your local area
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>🔍 Search Items</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>➕ Sell Item</Text>
          </TouchableOpacity>
        </View>

        {/* Items List */}
        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Featured Items</Text>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  quickActions: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  itemsSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  itemInfo: {
    padding: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  itemLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default HomeScreen;
