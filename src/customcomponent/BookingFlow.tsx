// src/flows/BookingFlow.tsx

import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {booking} from './bookingData';
import TableBookingDetail from './ItemChiTietDatBan';
import AlertDialog from './alertDialog';
import UnsavedChangesModal from './modalSave';

const BookingFlow = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);
    }
  }, [modalVisible]);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text>Hiển thị chi tiết đặt bàn</Text>
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <View style={[styles.toast, {}]}>
          <AlertDialog isSuccess={true} message="Is Success" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    //backgroundColor: 'blue',
  },
});

export default BookingFlow;
