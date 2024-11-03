import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import {IPV4} from '../../services/api'

const ThongKeDoanhThu = () => {
  const navigation = useNavigation();
  const [revenue, setRevenue] = useState(0);
  const [promotion, setPromotion] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState('');
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('Chọn Thời Gian');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateRangeModalVisible, setDateRangeModalVisible] = useState(false);

  const total = revenue + promotion;
  const revenuePercentage = ((revenue / total) * 100).toFixed(1);
  const promotionPercentage = ((promotion / total) * 100).toFixed(1);

  const data = [
    { name: 'Doanh Thu', population: revenue, color: '#ff6347' },
    { name: 'Khuyến Mãi', population: promotion, color: '#90ee90' },
  ];

  const options = [
    'Hôm Nay',
    'Hôm Qua',
    '7 Ngày Trước',
    '30 Ngày Trước',
    'Tháng Trước',
    'Tùy Chọn Ngày',
  ];

  const fetchRevenueData = async (type, startDate, endDate) => {
    try {
      let url = `http://${IPV4}:3000/api/thongKeDoanhThu?type=${type}`;
      if (type === 'custom' && startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }
  
      const response = await fetch(url, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log("API Response:", data);
      
      // Kiểm tra dữ liệu và lấy giá trị từ phần tử đầu tiên nếu tồn tại
      if (data.length > 0) {
        setRevenue(data[0].tongDoanhThu || 0);
        setPromotion(data[0].tongKhuyenMai || 0);
      } else {
        setRevenue(0);
        setPromotion(0);
      }
      console.log("Revenue (after fetch):", data[0]?.tongDoanhThu);
      console.log("Promotion (after fetch):", data[0]?.tongKhuyenMai);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };
  
  

  const handleSelectOption = (option) => {
    setSelectedTimeRange(option);
    setModalVisible(false);
    switch (option) {
      case 'Hôm Nay':
        fetchRevenueData('today');
        break;
      case 'Hôm Qua':
        fetchRevenueData('yesterday');
        break;
      case '7 Ngày Trước':
        fetchRevenueData('7days');
        break;
      case '30 Ngày Trước':
        fetchRevenueData('30days');
        break;
      case 'Tháng Trước':
        fetchRevenueData('lastMonth');
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
    fetchRevenueData('custom', startDate.toISOString(), currentDate.toISOString());
  };

  const navigateToTopMonAn = () => {
    navigation.navigate('ThongKeTop5MonAn');
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
            <TouchableOpacity onPress={() => setShowOptionsModal(false)} style={styles.modalOption}>
              <Text style={styles.optionText}>Thống Kê Doanh Thu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToTopMonAn} style={styles.modalOption}>
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
      {console.log("Revenue (before chart render):", revenue)}
  {console.log("Promotion (before chart render):", promotion)}
      {/* Chart */}
      <View style={styles.chartContainer}>
        <PieChart
          data={data}
          width={400}
          height={300}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="95"
          hasLegend={false}
        />
        <View style={styles.legendContainer}>
          <View style={styles.legendItemContainer}>
            <Text style={styles.legendLabel}>Doanh Thu({((promotion / (revenue + promotion)) * 100).toFixed(1)}%)</Text>
            <View style={[styles.legendItem, { backgroundColor: '#ff6347' }]}>
              <Text style={styles.legendText}>{revenue.toLocaleString()} VND</Text>
            </View>
          </View>
          <View style={styles.legendItemContainer}>
            <Text style={styles.legendLabel}>Khuyến Mãi({((revenue / (revenue + promotion)) * 100).toFixed(1)}%)</Text>
            <View style={[styles.legendItem, { backgroundColor: '#90ee90' }]}>
              <Text style={styles.legendText}>{promotion.toLocaleString()} VND</Text>
            </View>
          </View>
        </View>
      </View>
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
  modalOption: {
    paddingVertical: 10,
  },
  container: {
    flex: 1,
  
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop:19,
    marginBottom: 16,
  },
  optionsButton: {
    padding: 10,
    marginRight: 10,
    marginTop: 0,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  option: {
    padding: 15,
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#f44336',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  legendItemContainer: {
    alignItems: 'center',
  },
  legendItem: {
    padding: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 16,
  },
  legendText: {
    fontSize: 16,
    color: 'black',
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginVertical: 10,
  },
  dateButtonText: {
    color: '#fff',
  },
});

export default ThongKeDoanhThu;
