import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  processColor,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import {PieChart} from 'react-native-chart-kit';
import { PieChart } from 'react-native-charts-wrapper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {ipAddress} from '../../services/api';
const ThongKeTop5MonAn = () => {
  const noDataImageURL = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRzlNmuaJh6jvjDXesEjjS-1ZqS1GnsE8jb2mY8XjwqrSoim8N4';
  
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
  const [selectedTimeRange, setSelectedTimeRange] = useState('Hôm Nay');

  const totalQuantity = topDishes.reduce((sum, item) => sum + item.soLuongMon, 0);

// Tính phần trăm và định dạng dữ liệu biểu đồ cho từng món ăn
const data = {
  dataSets: [
    {
      values: topDishes.map((item) => {
        const percentage = ((item.soLuongMon / totalQuantity) * 100).toFixed(1);
        return { value: parseFloat(percentage), label: `${item.tenMon} (${percentage}%)` };
      }),
      label: '',
      config: {
        colors: topDishes.map((item, index) => {
          // Sử dụng một tập màu cố định cho tối đa 5 món ăn
          const colors = ['#ff6347', '#ff8c00', '#ffd700', '#90ee90', '#87cefa'];
          return processColor(colors[index]);
        }),
        valueTextSize: 0,
        valueTextColor: processColor('black'),
        sliceSpace: 5,
      }
    }
  ]
};
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
      let url = `${ipAddress}top5MatHangBanChay?type=${type}`;
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
  const pieChartData = topDishes.map((dish) => ({
    value: dish.quantity,
    label: dish.name,
    color: processColor(dish.color), // Biến đổi màu sắc thành giá trị hợp lệ
  }));

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
      {totalQuantity === 0 ? (
          <Image source={{ uri: noDataImageURL }}
           style={{ height: 250, width: 350 }} 
           resizeMode="contain" />
        ) : (
      <PieChart
  style={{ height: 300, width: 300 }}
  chartDescription={{text: ''}}
  data={{
    dataSets: [
      {
        values: pieChartData,
        label: '',
        config: {
          colors: pieChartData.map((item) => item.color),
          valueTextSize: 20,
          sliceSpace: 2,
          valueFormatter: "#'%'",
        },
      },
    ],
  }}
  
  styledCenterText={{
    text: 'Top 5 Món Ăn',
    color: processColor('black'),
    size: 20,
  }}
  entryLabelColor={processColor('black')}
  holeColor={processColor('transparent')}
  transparentCircleRadius={45}
  transparentCircleColor={processColor('#f0f0f088')}
  centerTextRadiusPercent={100}
  rotationAngle={45}

  legend={{ enabled: false }}
  entryLabelTextSize={0}
  drawEntryLabels={true}
  usePercentValues={true}
  holeRadius={40}
  maxAngle={360}
 
/>
)}
<FlatList
  data={topDishes}
  keyExtractor={(item, index) => `${item.name}-${index}`}  // Kết hợp item.name và index để đảm bảo key duy nhất
  renderItem={({ item, index }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:15 }}>
      <Text style={{ fontSize: 18 }}>{`Top ${index + 1}`}</Text>
      <View
        style={{
          backgroundColor: item.color,
          width: 20,
          height: 20,
          marginLeft: 10,
        }}
      />
      <Text style={styles.legendText}>{item.name}</Text>
            <Text style={styles.legendTextMon}>{`Số Lượng Món: ${item.quantity} `}</Text>
    </View>
  )}
/>
      </View>     
    </View>
  );
};

const styles = StyleSheet.create({
  noDataText: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
    marginTop: 200,
  },
  rectangle: {
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
    marginTop: 19,
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
    marginLeft: 30,
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
    marginTop: 80,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
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
    marginLeft:10,
  },
  legendTextMon: { 
    fontSize: 16 ,
     marginLeft:10
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

export default ThongKeTop5MonAn;
