import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersRequest, addUserRequest } from '../reducers/userReducer';

export default function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userState);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleCreateRecord = () => {
    if (!name.trim() && !email.trim() && !company.trim() && !id.trim()) {
      return;
    }

    dispatch(
      addUserRequest({
        id: id.trim(),
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
      })
    );

    setId('');
    setName('');
    setEmail('');
    setCompany('');
  };

  const renderItem = ({ item, index }) => {
    const companyName =
      typeof item.company === 'object' && item.company !== null
        ? item.company.name
        : item.company;

    const cardNumber = String(index + 1).padStart(2, '0');

    return (
      <View style={styles.card}>
        <View style={styles.numberBadge}>
          <Text style={styles.numberText}>{cardNumber}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.fieldLabel}>FULL NAME</Text>
        <Text style={styles.nameValue}>{item.name || 'NULL'}</Text>

        <View style={styles.subBox}>
          <Text style={styles.fieldLabel}>RECORD DETAILS</Text>
          <Text style={styles.detailValue}>ID: {item.id ?? '—'}</Text>
          <Text style={styles.detailValue}>✉ {item.email || 'NULL'}</Text>
          <Text style={styles.detailValue}>🏢 {companyName || 'NULL'}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.topEyebrow}>SUPABASE INTEGRATION</Text>
        <Text style={styles.mainTitle}>User Directory ♥</Text>
        <Text style={styles.topSubtitle}>
          Live records fetched from your Supabase table.
        </Text>
        <View style={styles.headerDivider} />
      </View>

      <View style={styles.formCard}>
        <Text style={styles.fieldLabel}>ADD NEW RECORD</Text>
        <TextInput
          style={styles.input}
          placeholder="ID (optional, e.g. 143194)"
          placeholderTextColor="#9a868d"
          value={id}
          onChangeText={setId}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Name (e.g. pablo nase)"
          placeholderTextColor="#9a868d"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9a868d"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Company (e.g. 1z)"
          placeholderTextColor="#9a868d"
          value={company}
          onChangeText={setCompany}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleCreateRecord}>
          <Text style={styles.addButtonText}>+ Save Record</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#b06c82" />
          <Text style={styles.statusText}>Syncing with Supabase...</Text>
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
          keyExtractor={(item, index) =>
            item?.id !== undefined ? item.id.toString() : index.toString()
          }
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.card}>
              <Text style={styles.fieldLabel}>STATUS</Text>
              <Text style={styles.detailValue}>
                No rows found in the Supabase "user" table yet.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf6f7' },
  topHeader: { paddingHorizontal: 24, paddingTop: 24 },
  topEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.5,
    color: '#b58392',
    marginBottom: 6,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#4a353c',
    marginBottom: 6,
  },
  topSubtitle: { fontSize: 14, color: '#8c777e', marginBottom: 16 },
  headerDivider: {
    height: 1,
    backgroundColor: '#f0dfe3',
    marginBottom: 16,
  },
  formCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3e4e8',
  },
  input: {
    backgroundColor: '#fdf8f9',
    borderWidth: 1,
    borderColor: '#edd8de',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#3f2e34',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#b06c82',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: { color: '#ffffff', fontWeight: '700', fontSize: 14 },
  listContainer: { paddingHorizontal: 24, paddingBottom: 32 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#f3e4e8',
  },
  numberBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fbe9ee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  numberText: { fontSize: 12, fontWeight: '700', color: '#b06c82' },
  divider: { height: 1, backgroundColor: '#f5eaed', marginBottom: 12 },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    color: '#b58392',
    marginBottom: 6,
  },
  nameValue: {
    fontSize: 19,
    fontWeight: '700',
    color: '#3f2e34',
    marginBottom: 12,
  },
  subBox: {
    backgroundColor: '#fdf8f9',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f7ecee',
  },
  detailValue: { fontSize: 14, color: '#6e5c62', marginTop: 4 },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusText: { marginTop: 10, fontSize: 15, color: '#7d6870' },
  errorText: {
    fontSize: 15,
    color: '#c94a5a',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#b06c82',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: '#ffffff', fontWeight: '600' },
});