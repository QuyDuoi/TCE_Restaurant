import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  processColor,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import {PieChart} from 'react-native-chart-kit';
import {PieChart} from 'react-native-charts-wrapper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ipAddress} from '../../services/api';
import {styles} from './ThongKeStyle';
import {ActivityIndicator} from 'react-native';
import {UserLogin} from '../../navigation/CustomDrawer';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const ThongKeTop5MonAn = () => {
  const navigation = useNavigation();
  const [topDishes, setTopDishes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [dateRange, setDateRange] = useState('');

  const user: UserLogin = useSelector((state: RootState) => state.user);
  const id_nhaHang = user?.id_nhaHang?._id;

  const [endDate, setEndDate] = useState(new Date());
  const [dateRangeModalVisible, setDateRangeModalVisible] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('Hôm Nay');
  const [isLoading, setIsLoading] = useState(false);

  const totalQuantity = topDishes.reduce(
    (sum, item) => sum + item.soLuongMon,
    0,
  );

  const chartColors = [
    '#ff6347', // Tomato
    '#ff8c00', // DarkOrange
    '#ffd700', // Gold
    '#90ee90', // LightGreen
    '#87cefa', // LightSkyBlue
  ];

  // Tính phần trăm và định dạng dữ liệu biểu đồ cho từng món ăn
  const data = {
    dataSets: [
      {
        values: topDishes.map(item => {
          const percentage = ((item.soLuongMon / totalQuantity) * 100).toFixed(
            1,
          );
          return {
            value: parseFloat(percentage),
            label: `${item.tenMon} (${percentage}%)`,
          };
        }),
        label: '',
        config: {
          colors: topDishes.map((item, index) => {
            // Sử dụng một tập màu cố định cho tối đa 5 món ăn
            return processColor(chartColors[index]);
          }),
          valueTextSize: 0,
          valueTextColor: processColor('black'),
          sliceSpace: 5,
        },
      },
    ],
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
      setIsLoading(true);
      let url = `${ipAddress}top5MatHangBanChay?type=${type}&id_nhaHang=${id_nhaHang}`;
      if (type === 'custom' && startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await fetch(url, {method: 'GET'});
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log('API Response:', data);

      // Giới hạn dữ liệu chỉ lấy Top 5 món ăn
      const limitedData = data.slice(0, 5);

      // Chuyển đổi dữ liệu cho biểu đồ và danh sách
      if (limitedData.length > 0) {
        const formattedData = limitedData.map((item, index) => ({
          _id: item._id,
          tenMon: item.tenMon,
          soLuongMon: item.soLuongMon,
          anhMonAn: item.anhMonAn,
          color: chartColors[index],
        }));
        setTopDishes(formattedData);
      } else {
        setTopDishes([]);
      }
    } catch (error) {
      console.error('Error fetching top 5 dishes data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reload dữ liệu mỗi khi màn hình được focus lại
  useFocusEffect(
    React.useCallback(() => {
      fetchTop5DishesData('today');
    }, []),
  );

  const handleSelectOption = option => {
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
    fetchTop5DishesData(
      'custom',
      startDate.toISOString(),
      currentDate.toISOString(),
    );
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
  const pieChartData = topDishes.map(dish => ({
    value: dish.soLuongMon,
    label: dish.tenMon,
    color: processColor(dish.color), // Biến đổi màu sắc thành giá trị hợp lệ
  }));

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <View style={styles.Contenttt}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                width: 220,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>{selectedTimeRange}</Text>
          </TouchableOpacity>
          <Text style={styles.selectedText}>{dateRange}</Text>
        </View>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => setShowOptionsModal(true)}
            style={styles.optionsButton}>
            <Icon name="line-chart" size={25} color="#000" />
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
            <Text style={styles.modalTitle}>Chọn Mốc Thời Gian</Text>
            <FlatList
              data={options}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelectOption(item)}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType="slide"
        visible={dateRangeModalVisible}
        onRequestClose={() => setDateRangeModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn Khoảng Ngày</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.dateButton}>
              <Text style={styles.dateButtonText}>
                {`Ngày Bắt Đầu: ${
                  startDate ? startDate.toLocaleDateString() : 'Chọn Ngày'
                }`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowEndDatePicker(true)}
              style={styles.dateButton}>
              <Text style={styles.dateButtonText}>
                {`Ngày Kết Thúc: ${
                  endDate ? endDate.toLocaleDateString() : 'Chọn Ngày'
                }`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setDateRangeModalVisible(false)}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Picker for Custom Date Range */}
      {showDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
        />
      )}
      {/* Modal for Options */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showOptionsModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tùy Chọn Thống Kê</Text>
            <TouchableOpacity
              onPress={navigateToThongKeDoanhThu}
              style={styles.modalOption}>
              <Text style={styles.optionText}>Thống Kê Doanh Thu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowOptionsModal(false)}
              style={styles.modalOption}>
              <Text style={styles.optionText}>Top 5 Món Ăn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={navigateToHinhThucThanhToan}
              style={styles.modalOption}>
              <Text style={styles.optionText}>Hình Thức Thanh Toán</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={navigateToNguonDoanhThu}
              style={styles.modalOption}>
              <Text style={styles.optionText}>Nguồn Doanh Thu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowOptionsModal(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
          </View>
        ) : (
          <>
            {/* Biểu đồ Top 5 Món Ăn */}
            <View style={styles.chartContainer}>
              {totalQuantity === 0 ? (
                <View style={{width: '100%', height: '100%'}}>
                  <Image
                    source={require('../../image/noData.png')}
                    style={{width: '100%', height: '50%'}}
                    resizeMode="contain"
                  />
                  <Text style={styles.data}>Không có dữ liệu</Text>
                </View>
              ) : (
                <PieChart
                  style={{height: '50%', width: '95%', marginTop: 10}}
                  chartDescription={{text: ''}}
                  data={{
                    dataSets: [
                      {
                        values: pieChartData,
                        label: '',
                        config: {
                          colors: pieChartData.map(item => item.color),
                          valueTextSize: 20,
                          sliceSpace: 2,
                          valueFormatter: "#'%'",
                        },
                      },
                    ],
                  }}
                  styledCenterText={{
                    text: 'Top 5\nMón Ăn',
                    color: processColor('black'),
                    size: 20,
                  }}
                  entryLabelColor={processColor('black')}
                  holeColor={processColor('transparent')}
                  transparentCircleRadius={45}
                  transparentCircleColor={processColor('#f0f0f088')}
                  centerTextRadiusPercent={100}
                  rotationAngle={45}
                  legend={{enabled: false}}
                  entryLabelTextSize={0}
                  drawEntryLabels={true}
                  usePercentValues={true}
                  holeRadius={40}
                  maxAngle={360}
                />
              )}
              <FlatList
                data={topDishes}
                keyExtractor={(item, index) => `${item.tenMon}-${index}`} // Kết hợp item.name và index để đảm bảo key duy nhất
                renderItem={({item, index}) => (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 15,
                      }}>
                      <Text style={styles.topItem}>{`Top ${index + 1}`}</Text>
                      <View
                        style={{
                          backgroundColor: item.color,
                          width: 20,
                          height: 20,
                          marginHorizontal: 10,
                        }}
                      />
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[styles.legendText, {width: '70%'}]}>
                        {item.tenMon}
                      </Text>
                    </View>
                    <Text
                      style={
                        styles.legendTextMon
                      }>{`Số lượng bán ra: ${item.soLuongMon} `}</Text>
                  </View>
                )}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ThongKeTop5MonAn;
