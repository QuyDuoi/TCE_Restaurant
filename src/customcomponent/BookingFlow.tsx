// src/flows/BookingFlow.tsx

import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { booking } from './bookingData';
import TableBookingDetail from './ItemChiTietDatBan';


const BookingFlow = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Hiển thị chi tiết đặt bàn</Text>
      </TouchableOpacity>
      <TableBookingDetail
        booking={booking}
        visible={modalVisible}
        onClose={handleModalClose}
        onEdit={handleModalClose}
      />
    </View>
  );
};

export default BookingFlow;
