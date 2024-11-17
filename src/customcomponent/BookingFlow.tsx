// src/flows/BookingFlow.tsx

import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {booking} from './bookingData';
import TableBookingDetail from './ItemChiTietDatBan';
import AlertDialog from './alertDialog';
import UnsavedChangesModal from './modalSave';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <UnsavedChangesModal
        visible={true}
        title={'Thông báo'}
        content={'Bạn có chắc muốn hủy bàn đặt này không?'}
        onConfirm={() => {}}
        onCancel={() => {}}
        image={<Icon name="close" size={22} color="red" />}
      />
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
