import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import {IPV4} from '../../services/api'

const ThongKeTop5MonAn = () => {
  const navigation = useNavigation();
  const [topDishes, setTopDishes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [dateRange, setDateRange] = useState('');

  const [endDate, setEndDate] = useState(new Date());
  const [dateRangeModalVisible, setDateRangeModalVisible] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('Chọn Thời Gian');

  const options = [
    'Hôm Nay',
    'Hôm Qua',
    '7 Ngày Trước',
    '30 Ngày Trước',
    'Tháng Trước',
    'Tùy Chọn Ngày',
  ];

  const fetchTop5DishesData = async (type, startDate, endDate) => {
    try {
      let url = `http://${IPV4}:3000/api/top5MatHangBanChay?type=${type}`;
      if (type === 'custom' && startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log("API Response:", data);

      // Chuyển đổi dữ liệu cho biểu đồ
      if (data.length > 0) {
        const formattedData = data.map((item, index) => ({
          name: item.tenMon,
          quantity: item.soLuongMon,
          color: ['#ff6347', '#ff8c00', '#ffd700', '#90ee90', '#87cefa'][index],
        }));
        setTopDishes(formattedData);
      }
    } catch (error) {
      console.error("Error fetching top 5 dishes data:", error);
    }
  };

  const handleSelectOption = (option) => {
    setSelectedTimeRange(option);
    setModalVisible(false);
    switch (option) {
      case 'Hôm Nay':
        fetchTop5DishesData('today');
        break;
      case 'Hôm Qua':
        fetchTop5DishesData('yesterday');
        break;
      case '7 Ngày Trước':
        fetchTop5DishesData('7days');
        break;
      case '30 Ngày Trước':
        fetchTop5DishesData('30days');
        break;
      case 'Tháng Trước':
        fetchTop5DishesData('lastMonth');
        break;
      case 'Tùy Chọn Ngày':
        setDateRangeModalVisible(true);
        break;
      default:
        break;
    }
  };

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(false);
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
    fetchTop5DishesData('custom', startDate.toISOString(), currentDate.toISOString());
  };

  const navigateToThongKeDoanhThu = () => {
    navigation.navigate('ThongKeDoanhThu');
    setShowOptionsModal(false);
  };

  const navigateToNguonDoanhThu = () => {
    navigation.navigate('ThongKeNguonDoanhThu');
    setShowOptionsModal(false);
  };

  const navigateToHinhThucThanhToan = () => {
    navigation.navigate('ThongKeHinhThucThanhToan');
    setShowOptionsModal(false);
  };

  // useEffect(() => {
  //   fetchTop5DishesData('30days'); // Fetch initial data for the last 30 days
  // }, []);

  return (
    <View style={styles.container}>
     <View style={styles.rectangle}>
      
      <View style={styles.Contenttt}>
        <TouchableOpacity style={[styles.button, { width: 220, height: 40, justifyContent: 'center', alignItems: 'center' }]} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>{selectedTimeRange}</Text>
        </TouchableOpacity>
        <Text style={styles.selectedText}>{dateRange}</Text>
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setShowOptionsModal(true)} style={styles.optionsButton}>
          <Icon name="menu" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      </View>

      {/* Modal for Time Selection */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.option} onPress={() => handleSelectOption(item)}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} animationType="slide" visible={dateRangeModalVisible} onRequestClose={() => setDateRangeModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn Khoảng Ngày</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
              <Text style={styles.dateButtonText}>
                {`Ngày Bắt Đầu: ${startDate ? startDate.toLocaleDateString() : 'Chọn Ngày'}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateButton}>
              <Text style={styles.dateButtonText}>
                {`Ngày Kết Thúc: ${endDate ? endDate.toLocaleDateString() : 'Chọn Ngày'}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setDateRangeModalVisible(false)}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Picker for Custom Date Range */}
      {showDatePicker && (
        <DateTimePicker value={startDate} mode="date" display="default" onChange={handleStartDateChange} />
      )}
      {showEndDatePicker && (
        <DateTimePicker value={endDate} mode="date" display="default" onChange={handleEndDateChange} />
      )}
      {/* Modal for Options */}
      <Modal transparent={true} animationType="slide" visible={showOptionsModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tùy Chọn</Text>
            <TouchableOpacity onPress={navigateToThongKeDoanhThu} style={styles.modalOption}>
              <Text style={styles.optionText}>Thống Kê Doanh Thu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowOptionsModal(false)} style={styles.modalOption}>
              <Text style={styles.optionText}>Top 5 Món Ăn</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToHinhThucThanhToan} style={styles.modalOption}>
              <Text style={styles.optionText}>Hình Thức Thanh Toán</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToNguonDoanhThu} style={styles.modalOption}>
              <Text style={styles.optionText}>Nguồn Doanh Thu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowOptionsModal(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Biểu đồ Top 5 Món Ăn */}
      <View style={styles.chartContainer}>
        <PieChart
          data={topDishes}
          width={400}
          height={300}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2,
          }}
          accessor="quantity"
          backgroundColor="transparent"
          paddingLeft="95"
          hasLegend={false}
        />
      </View>

      {/* Chú thích cho từng món ăn */}
      <FlatList
        data={topDishes}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <View style={styles.legendItem}>
            <Text style={styles.legendText}>{`Top ${index + 1}`}</Text>
            <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name}</Text>
            <Text style={styles.legendTextMon}>{`Số Lượng Món: ${item.quantity} `}</Text>
          </View>
        )}
      />

      {/* Modal for Time Selection */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle:{ 
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#ADD8E6',
  },
  Contenttt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 1,
  },
  button: {
    backgroundColor: '#AAA0E0',
    padding: 0,
    borderColor: '#000',
    borderRadius: 15,
    marginBottom: -10,
    marginLeft:30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  selectedText: {
    marginTop: 10,
    fontSize: 14,
  },
  modalOption: {
    paddingVertical: 10,
  },
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  headerContainer: {flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop:19,
  marginBottom: 16,},
  optionsButton: { padding: 10 },
  headerText: { fontSize: 20, fontWeight: 'bold' },
  chartContainer: { alignItems: 'center', marginTop: 40 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  legendColorBox: { width: 20, height: 20, marginHorizontal: 10 },
  legendText: { fontSize: 16 , marginRight:10},
  legendTextMon: { fontSize: 16 , marginLeft:3},
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '80%', backgroundColor: 'white', borderRadius: 20, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  option: { padding: 15 },
  optionText: { fontSize: 18,  textAlign: 'center', },
  closeButton: { marginTop: 10, padding: 10, backgroundColor: '#007bff', borderRadius: 5 },
  closeButtonText: { color: 'white', fontWeight: 'bold' },
  dateButton: { padding: 15, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, width: '100%', alignItems: 'center', marginBottom: 10 },
  dateButtonText: { fontSize: 16 },
});

export default ThongKeTop5MonAn;
