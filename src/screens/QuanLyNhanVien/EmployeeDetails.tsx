import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import DeletePostModal from '../../customcomponent/modalDelete'; // Your custom delete modal

const EmployeeDetails = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const phoneNumber = '+1 (415) 432-1234';

  const copyToClipboard = () => {
    Clipboard.setString(phoneNumber);
    Alert.alert('Copied', 'Phone number copied to clipboard');
  };

  const handleDelete = () => {

    setModalVisible(false); // Close the modal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Employee Details</Text>

      <Image
        style={styles.avatar}
        source={{ uri: 'https://i.pinimg.com/564x/25/f8/8e/25f88ecb0498095bd0fafcc1ad5c1c1e.jpg' }}
      />

      <Text style={styles.employeeName}>Natalie Coleman</Text>
      <Text style={styles.employeeStatus}>Active now</Text>

      <View style={styles.infoRow}>
        <Icon name="phone" size={24} color="#777" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Phone number</Text>
          <Text style={styles.infoSubtitle}>{phoneNumber}</Text>
        </View>

        <TouchableOpacity onPress={copyToClipboard}>
          <Icon name="content-copy" size={24} color="#777" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <Icon name="credit-card" size={24} color="#777" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>ID card</Text>
          <Text style={styles.infoSubtitle}>SFO - 123</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="work" size={24} color="#777" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Manager</Text>
          <Text style={styles.infoSubtitle}>Department: Home & Kitchen</Text>
          <Text style={styles.infoSubtitle}>Store: Union Square</Text>
        </View>
      </View>

      {/* Other employee details (ID card, manager info, etc.) */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate('editEmployeeInfo')}>
          <Text style={styles.buttonText}>Update Information</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      {isModalVisible && (
        <DeletePostModal
          title="Delete Employee"
          content="Are you sure you want to delete this employee account?"
          onDelete={handleDelete}
          onCancel={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 15,
  },
  employeeName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  employeeStatus: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  infoTitle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  infoSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  updateButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EmployeeDetails;
