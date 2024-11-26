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
import {PieChart} from 'react-native-charts-wrapper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {ipAddress} from '../../services/api';
import {ActivityIndicator} from 'react-native';
import {styles} from './ThongKeStyle';

const ThongKeNguonDoanhThu = () => {
  const navigation = useNavigation();
  const [revenue, setRevenue] = useState(0);
  const [promotion, setPromotion] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState('');
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('Hôm Nay');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateRangeModalVisible, setDateRangeModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = revenue + promotion;
  const revenuePercentage = ((revenue / total) * 100).toFixed(1);
  const promotionPercentage = ((promotion / total) * 100).toFixed(1);

  const data = {
    dataSets: [
      {
        values:
          total > 0
            ? [
                {
                  value: parseFloat(revenuePercentage),
                  label: `${revenuePercentage}%`,
                },
                {
                  value: parseFloat(promotionPercentage),
                  label: `${promotionPercentage}%`,
                },
              ]
            : [],
        label: '',
        config: {
          colors: [processColor('#ff6347'), processColor('#90ee90')],
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

  const fetchRevenueData = async (type, startDate, endDate) => {
    try {
      setIsLoading(true);
      let url = `${ipAddress}thongKeDoanhThuTheoNguon?type=${type}`;
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
      console.log('API Response:', data);

      // Lấy dữ liệu từ đối tượng trả về
      setRevenue(data.banTaiCho || 0);
      setPromotion(data.banMangDi || 0);

      console.log('Revenue (after fetch):', data.banTaiCho);
      console.log('Promotion (after fetch):', data.banMangDi);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOption = option => {
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
    fetchRevenueData(
      'custom',
      startDate.toISOString(),
      currentDate.toISOString(),
    );
  };

  const navigateToTopMonAn = () => {
    navigation.navigate('ThongKeTop5MonAn');
    setShowOptionsModal(false);
  };

  const navigateToThongKeDoanhThu = () => {
    navigation.navigate('ThongKeDoanhThu');
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
              onPress={navigateToTopMonAn}
              style={styles.modalOption}>
              <Text style={styles.optionText}>Top 5 Món Ăn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={navigateToHinhThucThanhToan}
              style={styles.modalOption}>
              <Text style={styles.optionText}>Hình Thức Thanh Toán</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowOptionsModal(false)}
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
            {/* Chart */}
            <View style={styles.chartContainer}>
              {total === 0 ? (
                <View style={{width: '100%', height: '100%'}}>
                  <Image
                    source={require('../../image/noData.png')}
                    style={{width: '100%', height: '50%'}}
                    resizeMode="contain"
                  />
                  <Text style={styles.data}>Không có dữ liệu</Text>
                </View>
              ) : (
                <>
                  <PieChart
                    style={{height: '50%', width: '95%', marginTop: 10}}
                    chartDescription={{text: ''}}
                    data={data}
                    legend={{enabled: false}}
                    entryLabelColor={processColor('black')}
                    entryLabelTextSize={20}
                    rotationEnabled={true}
                    rotationAngle={45}
                    drawEntryLabels={true}
                    usePercentValues={true}
                    styledCenterText={{
                      text: 'Tổng Doanh Thu',
                      color: processColor('black'),
                      size: 20,
                    }}
                    centerTextRadiusPercent={100}
                    holeRadius={40}
                    holeColor={processColor('transparent')}
                    transparentCircleRadius={45}
                    transparentCircleColor={processColor('#f0f0f088')}
                    maxAngle={360}
                    config={{
                      valueFormatter: "#'%'",
                    }}
                  />
                  <View style={styles.legendContainer}>
                    <View style={styles.legendItemContainer}>
                      <Text style={styles.legendLabel}>Tại Nhà Hàng</Text>
                      <View
                        style={[
                          styles.legendItem,
                          {backgroundColor: '#ff6347'},
                        ]}>
                        <Text style={styles.legendText}>
                          {revenue.toLocaleString()} VNĐ
                        </Text>
                      </View>
                    </View>
                    <View style={styles.legendItemContainer}>
                      <Text style={styles.legendLabel}>Mang Đi</Text>
                      <View
                        style={[
                          styles.legendItem,
                          {backgroundColor: '#90ee90'},
                        ]}>
                        <Text style={styles.legendText}>
                          {promotion.toLocaleString()} VNĐ
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ThongKeNguonDoanhThu;
