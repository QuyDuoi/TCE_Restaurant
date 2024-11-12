import { View, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CardComponent from '../QuanLyThucDon/Hoa/components/CardComponent';
import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import { colors } from '../QuanLyThucDon/Hoa/contants/hoaColors';
import { IPV4 } from '../../services/api';
import { Text } from 'react-native-svg';
import CheckBox from 'react-native-check-box';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';
import { useDispatch } from 'react-redux';
import { updateStatusChiTietHoaDonThunk } from '../../store/ChiTietHoaDonSlice';

const { width, height } = Dimensions.get('window');

interface Props {

    tenMon: string;
    trangThai: boolean
    soLuong: string;

    // onPress?: () => void;
    onClick: () => void;
    anhMonAn: string;
}

const ItemChiTietHoaDon = (props: Props) => {
    const { tenMon, trangThai, anhMonAn, soLuong, onClick } = props;

    const dispatch = useDispatch();





    // Handle avatar URL replacement if it's coming from localhost
    const monAnImg = anhMonAn
        ? anhMonAn.replace('localhost', IPV4)
        : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';


    return (
        <CardComponent
            // bgrColor={trangThai ? '#33cc33' : '#ff4d4d'}
            styles={{
                marginVertical: 8,
            }}
            evlation={3}>
            <RowComponent
                // onPress={onPress}
                justify="space-between"
                styles={{
                    alignItems: 'center',
                }}>
                <RowComponent
                    // onPress={onPress}
                    justify="flex-start"
                    styles={{
                        flex: 1,
                        paddingHorizontal: 12,
                        paddingVertical: 16,
                    }}>
                    <Image source={{ uri: monAnImg }} style={{
                        width: 80,
                        height: 80,
                        borderRadius: 10,
                    }} />
                    <View style={styles.orderInfo}>
                        <TextComponent text={tenMon} color={colors.black} size={23} styles={{ marginLeft: 10 }} fontWeight='bold' />
                        <TextComponent text={'Số lượng: ' + soLuong} color={colors.black} size={16} styles={{ marginLeft: 10 }} />
                    </View>
                    <View style={styles.orderActions}>
                        <View style={styles.statusContainer}>
                            <CheckBox
                                isChecked={trangThai}
                                onClick={onClick}
                                checkedCheckBoxColor="#33cc33"
                                uncheckedCheckBoxColor="#ff4d4d"
                            />
                            <TextComponent
                                text={trangThai ? 'Hoàn thành' : 'Chưa hoàn thành'}
                                fontWeight="bold"
                                color={trangThai ? colors.status : colors.status2}
                                styles={{
                                    marginHorizontal: 8,
                                }} />
                        </View>

                    </View>

                </RowComponent>

            </RowComponent>
            <TextComponent
                text={'Ghi chú: ' + tenMon} color='black' styles={{ margin: 10 }}
            />
        </CardComponent>
    );
};

export default ItemChiTietHoaDon;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: width * 0.04,
    },
    header: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: '#ff7f50',
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
    orderContainer: {
        backgroundColor: '#fff',
        padding: width * 0.04,
        borderRadius: 8,
        marginBottom: height * 0.02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    pending: {
        backgroundColor: '#ffe6e6',
    },
    completed: {
        backgroundColor: '#ccffcc',
    },
    foodImage: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: 8,
        marginRight: width * 0.03,
    },
    orderInfo: {
        flex: 3,
    },
    foodName: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: '#333',
    },
    quantity: {
        fontSize: width * 0.035,
        color: '#ff7f50',
        marginTop: 4,
    },
    orderActions: {
        flex: 2.5,
        alignItems: 'flex-end',
    },
    areaText: {
        fontSize: width * 0.03,
        color: '#333',
    },
    detailLink: {
        color: '#4da6ff',
        textDecorationLine: 'underline',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.01,
    },
    statusTextPending: {
        color: '#ff4d4d',
        fontSize: width * 0.03,
        marginLeft: 5,
    },
    statusTextCompleted: {
        color: '#33cc33',
        fontSize: width * 0.03,
        marginRight: 10,
        marginLeft: 20,
    },
});

