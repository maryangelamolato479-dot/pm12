import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersRequest } from '../reducers/userReducer';

export default function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userState);

  // Trigger data-fetching process on component mount using useEffect
  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>✉ {item.email}</Text>
      <Text style={styles.company}>🏢 {item.company?.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>User Directory</Text>
      
      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.statusText}>Fetching API Data...</Text>
        </View>
      )}

      {error && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => dispatch(fetchUsersRequest())}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f7' },
  headerTitle: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginVertical: 16, color: '#1d1d1f' },
  listContainer: { paddingHorizontal: 16, paddingBottom: 24 },
  card: { backgroundColor: '#ffffff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
  name: { fontSize: 18, fontWeight: '600', color: '#333' },
  email: { fontSize: 14, color: '#666', marginTop: 4 },
  company: { fontSize: 14, color: '#888', marginTop: 2 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  statusText: { marginTop: 10, fontSize: 16, color: '#666' },
  errorText: { fontSize: 16, color: '#d9534f', textAlign: 'center', marginBottom: 12 },
  retryButton: { backgroundColor: '#0066cc', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  retryText: { color: '#fff', fontWeight: '600' },
});