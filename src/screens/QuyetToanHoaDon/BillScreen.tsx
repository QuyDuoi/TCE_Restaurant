import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions } from 'react-native';
import { BillData, sampleData } from './BillData';

const { width, height } = Dimensions.get('window');

const calculateDuration = (timeIn: string) => {
  const [time, date] = timeIn.split('|').map(str => str.trim());
  const [hoursIn, minutesIn] = time.split(':').map(Number);
  const [day, month, year] = date.split('/').map(Number);

  const startTime = new Date(year, month - 1, day, hoursIn, minutesIn);
  const currentTime = new Date();
  const diffMs = currentTime.getTime() - startTime.getTime();

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const BillItem: React.FC<{ bill: BillData }> = ({ bill }) => {
  const [duration, setDuration] = useState(calculateDuration(bill.timeIn));

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(calculateDuration(bill.timeIn));
    }, 6000);

    return () => clearInterval(interval); // Xóa bộ đếm khi không cần thiết
  }, [bill.timeIn]);

  return (
    <View style={styles.billContainer}>
      <View style={styles.billInfo}>
        <Text style={styles.billText}>
          <Text style={styles.boldText}>Khu vực:</Text> {bill.area}
        </Text>
        <Text style={styles.billText1}>
          <Text style={styles.boldText}>Giờ vào:</Text> {bill.timeIn}
        </Text>
        <Text style={styles.totalText}>Tổng tiền: {bill.total}</Text>
      </View>
      <View style={styles.billActions}>
        <Text style={styles.durationText}>Thời gian: {duration}</Text>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailText}>Chi tiết</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BillScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBills, setFilteredBills] = useState(sampleData);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBills(sampleData);
    } else {
      setFilteredBills(
        sampleData.filter((bill) =>
          bill.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bill.timeIn.includes(searchQuery) ||
          bill.total.toString().includes(searchQuery)
        )
      );
    }
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Quyết toán hóa đơn</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm hóa đơn"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {filteredBills.map((bill) => (
          <BillItem key={bill.id} bill={bill} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: width * 0.04,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#ff3333',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  searchInput: {
    height: height * 0.07,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
  },
  scrollView: {
    paddingBottom: height * 0.02,
  },
  billContainer: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: 8,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billInfo: {
    flex: 3,
  },
  billText: {
    fontSize: width * 0.04,
    paddingBottom: 8,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  billText1: {
    fontSize: width * 0.04,
    paddingBottom: 8,
    color: '#999',
  },
  totalText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#ff3333',
  },
  billActions: {
    flex: 1.8,
    alignItems: 'flex-end',
  },
  durationText: {
    fontSize: width * 0.03,
    marginBottom: height * 0.01,
    color: '#333',
  },
  detailButton: {
    backgroundColor: '#4da6ff',
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.06,
    borderRadius: 4,
    marginBottom: height * 0.01,
  },
  detailText: {
    color: '#fff',
  },
  paymentButton: {
    backgroundColor: '#33cc33',
    paddingVertical: height * 0.006,
    paddingHorizontal: width * 0.022,
    borderRadius: 4,
  },
  paymentText: {
    color: '#fff',
  },
});
