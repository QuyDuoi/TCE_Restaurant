import React, { useCallback, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Linking } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNhanVienThunk, updateNhanVienThunk } from '../../store/NhanVienSlice';
import styles from './Khai/Styles/EmployeeDetailStyles';
import { IPV4 } from '../../services/api';
import DeletePostModal from '../../customcomponent/modalDelete';
import { RootState } from '../../store/store';


const EmployeeDetailsScreen = () => {
    const route = useRoute();
    const { nhanVien } = route.params; // Lấy thông tin nhân viên từ route params
    const [modalVisible, setModalVisible] = useState(false);  // Điều khiển modal
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const status = useSelector((state: RootState) => state.nhanVien.status);
    const updatedNhanVien = useSelector((state: RootState) =>
        state.nhanVien.nhanViens.find(nv => nv._id === nhanVien._id)
    );

    // Đặt trạng thái hoạt động dựa trên nhanVien.trangThai
    const isActive = updatedNhanVien?.trangThai || nhanVien.trangThai; 

    const employeeImage = updatedNhanVien?.hinhAnh
        ? updatedNhanVien.hinhAnh.replace('localhost', IPV4) // Thay đổi IP nếu cần
        : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';

    const handleCopy = (value) => {
        Clipboard.setString(value);
        Alert.alert('Đã sao chép', `${value} đã được sao chép vào clipboard`);
    };
    

    const handleDelete = () => {
        dispatch(deleteNhanVienThunk(nhanVien._id))
            .then(() => {
                Alert.alert('Xóa thành công', 'Nhân viên đã được xóa thành công');
                setModalVisible(false);
                navigation.goBack(); // Quay về màn hình trước sau khi xóa
            })
            .catch((error) => {
                Alert.alert('Lỗi', 'Không thể xóa nhân viên');
            });
    };
     // Sử dụng useFocusEffect để lấy lại dữ liệu khi màn hình focus
     useFocusEffect(
        useCallback(() => {
            // Fetch lại dữ liệu nhân viên khi quay lại màn hình này
            dispatch(updateNhanVienThunk());
        }, [dispatch])
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Thông tin nhân viên</Text>
            </View>

            <View style={isActive ? styles.avatarContainerGreen : styles.avatarContainerRed}>
                <Image source={{ uri: employeeImage }} style={styles.avatar} />
            </View>

            <Text style={styles.name}>{nhanVien.hoTen}</Text>
            <Text style={[styles.status, { color: isActive ? 'green' : 'red' }]}>
                {isActive ? 'Active now' : 'Not Active'}
            </Text>

            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${nhanVien.soDienThoai}`)}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>📞</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoLabel}>Số điện thoại</Text>
                        <Text style={styles.phoneContainer}>
                            <Text style={styles.phoneCode}>{nhanVien.soDienThoai}</Text>
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleCopy(nhanVien.soDienThoai)}>
                        <Text style={styles.copyIcon}>📋</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>🆔</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoLabel}>Căn cước công dân</Text>
                        <Text style={styles.infoValue}>{nhanVien.cccd}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>👤</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoLabel}>Vai trò</Text>
                        <Text style={styles.infoValue}>{nhanVien.vaiTro}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonUpdate} onPress={() => navigation.navigate('editEmployeeInfo', { nhanVien })}>
                    <Text style={styles.buttonTextUpdate}>Cập nhật thông tin</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonDelete}>
                    <Text style={styles.buttonTextDelete}>Xóa nhân viên</Text>
                </TouchableOpacity>
            </View>

            {/* Sử dụng DeletePostModal khi nhấn nút xóa */}
            {modalVisible && (
                <DeletePostModal
                    title="Xác nhận xóa"
                    content="Bạn có chắc chắn muốn xóa nhân viên này? Tất cả thông tin sẽ không thể khôi phục."
                    onDelete={handleDelete}
                    onCancel={() => setModalVisible(false)}
                />
            )}
        </View>
    );
};

export default EmployeeDetailsScreen;
