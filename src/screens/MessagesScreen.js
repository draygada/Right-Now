import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  TextInput
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const MessagesScreen = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState('');

  // Mock conversations data
  const conversations = [
    {
      id: '1',
      name: 'Sarah Johnson',
      lastMessage: 'Is the camera still available?',
      timestamp: '2 min ago',
      unread: true,
      avatar: 'https://via.placeholder.com/50',
      itemTitle: 'Vintage Camera'
    },
    {
      id: '2',
      name: 'Mike Chen',
      lastMessage: 'Thanks for the quick response!',
      timestamp: '1 hour ago',
      unread: false,
      avatar: 'https://via.placeholder.com/50',
      itemTitle: 'MacBook Pro'
    },
    {
      id: '3',
      name: 'Emma Davis',
      lastMessage: 'Can we meet tomorrow?',
      timestamp: '3 hours ago',
      unread: true,
      avatar: 'https://via.placeholder.com/50',
      itemTitle: 'Bicycle'
    },
    {
      id: '4',
      name: 'Alex Rodriguez',
      lastMessage: 'Perfect, see you then!',
      timestamp: 'Yesterday',
      unread: false,
      avatar: 'https://via.placeholder.com/50',
      itemTitle: 'Gaming Chair'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchText.toLowerCase()) ||
    conv.itemTitle.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderConversation = ({ item }) => (
    <TouchableOpacity style={styles.conversationItem}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.unread && <View style={styles.unreadDot} />}
      </View>
      
      <View style={styles.conversationInfo}>
        <View style={styles.conversationHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.itemTitle}
        </Text>
        
        <Text 
          style={[
            styles.lastMessage,
            item.unread && styles.unreadMessage
          ]} 
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
      </View>

      {/* Conversations List */}
      <FlatList
        data={filteredConversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id}
        style={styles.conversationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No conversations found</Text>
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
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  conversationsList: {
    flex: 1,
  },
  conversationItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  conversationInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  itemTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#999',
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#333',
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
  },
});

export default MessagesScreen;
