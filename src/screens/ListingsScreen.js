import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Alert
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const ListingsScreen = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('active');

  // Mock listings data
  const listings = [
    {
      id: '1',
      title: 'Vintage Camera',
      price: '$150',
      status: 'active',
      views: 45,
      messages: 3,
      image: 'https://via.placeholder.com/150',
      datePosted: '2 days ago',
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      title: 'MacBook Pro',
      price: '$1200',
      status: 'active',
      views: 128,
      messages: 7,
      image: 'https://via.placeholder.com/150',
      datePosted: '1 week ago',
      location: 'Palo Alto, CA'
    },
    {
      id: '3',
      title: 'Gaming Chair',
      price: '$200',
      status: 'sold',
      views: 67,
      messages: 12,
      image: 'https://via.placeholder.com/150',
      datePosted: '2 weeks ago',
      location: 'Berkeley, CA'
    },
    {
      id: '4',
      title: 'Bicycle',
      price: '$300',
      status: 'active',
      views: 89,
      messages: 5,
      image: 'https://via.placeholder.com/150',
      datePosted: '3 days ago',
      location: 'Oakland, CA'
    }
  ];

  const filteredListings = listings.filter(listing => 
    activeTab === 'all' || listing.status === activeTab
  );

  const tabs = [
    { key: 'active', label: 'Active' },
    { key: 'sold', label: 'Sold' },
    { key: 'all', label: 'All' }
  ];

  const handleEditListing = (listing) => {
    Alert.alert('Edit Listing', `Edit "${listing.title}"?`);
  };

  const handleDeleteListing = (listing) => {
    Alert.alert(
      'Delete Listing',
      `Are you sure you want to delete "${listing.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Deleted') }
      ]
    );
  };

  const renderListing = ({ item }) => (
    <View style={styles.listingCard}>
      <Image source={{ uri: item.image }} style={styles.listingImage} />
      
      <View style={styles.listingInfo}>
        <View style={styles.listingHeader}>
          <Text style={styles.listingTitle}>{item.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: item.status === 'active' ? '#4CAF50' : '#FF9800' }]}>
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
        
        <Text style={styles.listingPrice}>{item.price}</Text>
        <Text style={styles.listingLocation}>{item.location}</Text>
        
        <View style={styles.listingStats}>
          <Text style={styles.statText}>👁 {item.views} views</Text>
          <Text style={styles.statText}>💬 {item.messages} messages</Text>
        </View>
        
        <Text style={styles.datePosted}>Posted {item.datePosted}</Text>
        
        <View style={styles.listingActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleEditListing(item)}
          >
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteListing(item)}
          >
            <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Listings</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Listings */}
      <FlatList
        data={filteredListings}
        renderItem={renderListing}
        keyExtractor={(item) => item.id}
        style={styles.listingsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No listings found</Text>
            <TouchableOpacity style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Create your first listing</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  listingsList: {
    flex: 1,
  },
  listingCard: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  listingImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  listingInfo: {
    padding: 15,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  listingPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  listingLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  listingStats: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  statText: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
  },
  datePosted: {
    fontSize: 12,
    color: '#999',
    marginBottom: 15,
  },
  listingActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  deleteButtonText: {
    color: '#f44336',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 15,
  },
  emptyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  emptyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ListingsScreen;
