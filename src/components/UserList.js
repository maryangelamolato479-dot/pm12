import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsersRequest,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
} from '../reducers/userReducer';

export default function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userState);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Validation', 'Name and Email are required.');
      return;
    }

    if (editingId) {
      dispatch(updateUserRequest({ id: editingId, name, email, company }));
      setEditingId(null);
    } else {
      dispatch(createUserRequest({ name, email, company }));
    }

    setName('');
    setEmail('');
    setCompany('');
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name || '');
    setEmail(user.email || '');
    setCompany(user.company || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setEmail('');
    setCompany('');
  };

  const handleDelete = (id) => {
    dispatch(deleteUserRequest(id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.name}>{item.name || '(No Name)'}</Text>
        <Text style={styles.detail}>{item.email || '(No Email)'}</Text>
        <Text style={styles.detail}>Company: {item.company || 'N/A'}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={() => handleEdit(item)}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Supabase User CRUD</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Company"
          value={company}
          onChangeText={setCompany}
        />

        <View style={styles.formButtons}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.btnText}>{editingId ? 'Update User' : 'Add User'}</Text>
          </TouchableOpacity>
          {editingId && (
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelEdit}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {error && <Text style={styles.error}>Error: {error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 50, backgroundColor: '#f8fafc' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 14, color: '#0f172a' },
  form: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 14, elevation: 2 },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  formButtons: { flexDirection: 'row', gap: 8 },
  saveBtn: { flex: 1, backgroundColor: '#16a34a', padding: 12, borderRadius: 6, alignItems: 'center' },
  cancelBtn: { backgroundColor: '#64748b', padding: 12, borderRadius: 6, alignItems: 'center' },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
  },
  cardInfo: { flex: 1, paddingRight: 8 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  detail: { fontSize: 13, color: '#475569', marginTop: 2 },
  actions: { flexDirection: 'row', gap: 6 },
  editBtn: { backgroundColor: '#2563eb', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 5 },
  deleteBtn: { backgroundColor: '#dc2626', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 5 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  error: { color: '#dc2626', marginBottom: 10, fontWeight: '600' },
});