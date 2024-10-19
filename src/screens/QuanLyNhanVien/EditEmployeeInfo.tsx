import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, Button, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { styles } from './EditEmployeeInfoStyles';
import UnsavedChangesModal from '../../customcomponent/modalSave';
import { useDispatch } from 'react-redux';
import { updateNhanVienThunk } from '../../store/NhanVienSlice'; // Import Redux action để cập nhật nhân viên
import { useNavigation, useRoute } from '@react-navigation/native';

const EditEmployeeInfo = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    // Nhận dữ liệu nhân viên từ route.params
    const { nhanVien } = route.params;

    // State quản lý các trường thông tin
    const [name, setName] = useState(nhanVien.hoTen || '');
    const [status, setStatus] = useState(nhanVien.trangThai || false); // Chuyển trạng thái về boolean
    const [phone, setPhone] = useState(nhanVien.soDienThoai || '');
    const [idNumber, setIdNumber] = useState(nhanVien.cccd || '');
    const [position, setPosition] = useState(nhanVien.vaiTro || 'Nhân viên');
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false); // State cho modal xác nhận

    const positions = ["Nhân viên", "Quản lý", "Admin", "Bếp"];

    // Kiểm tra nếu thông tin đã bị thay đổi so với dữ liệu ban đầu
    useEffect(() => {
        if (
            name !== nhanVien.hoTen ||
            status !== nhanVien.trangThai ||
            phone !== nhanVien.soDienThoai ||
            position !== nhanVien.vaiTro
        ) {
            setIsEdited(true);
        } else {
            setIsEdited(false);
        }
    }, [name, status, phone, position]);

    // Hàm lưu dữ liệu
    const handleSave = () => {
        setModalVisible(true); // Hiển thị modal xác nhận trước khi lưu
    };

    // Hàm xác nhận lưu dữ liệu
    const handleConfirmSave = async () => {
        setModalVisible(false); // Đóng modal

        const updatedEmployee = {
            ...nhanVien,
            hoTen: name,
            trangThai: status, // Đảm bảo lưu trạng thái hoạt động (true/false)
            soDienThoai: phone,
            cccd: idNumber,
            vaiTro: position, // Lưu vai trò đã chọn
        };

        try {
            // Cập nhật dữ liệu lên Backend thông qua Redux Thunk
            dispatch(updateNhanVienThunk({ id: nhanVien._id, formData: updatedEmployee }))
                .unwrap()
                .then(() => {
                    Alert.alert('Thành công', 'Cập nhật thông tin nhân viên thành công');
                    navigation.goBack(); // Quay về trang danh sách
                })
                .catch(error => {
                    Alert.alert('Lỗi', 'Cập nhật thông tin không thành công');
                });
        } catch (error) {
            console.error('Lỗi khi cập nhật nhân viên:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật thông tin');
        }
    };

    // Chuyển đổi trạng thái hoạt động
    const toggleStatus = () => {
        setStatus(!status); // Đảo ngược trạng thái khi chuyển đổi
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={[styles.backText, { color: 'orange', fontSize: 45 }]}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Chỉnh sửa thông tin nhân viên</Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Tên nhân viên</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Nhập tên nhân viên"
                />
            </View>

            <View style={styles.formGroupRow}>
                <Text style={styles.label}>Trạng thái</Text>
                <View style={styles.formGroupRow1}>
                    <Text style={[styles.statusText, { color: status ? 'green' : 'red', borderColor: status ? 'green' : 'red' }]}>
                        {status ? 'Hoạt động' : 'Ngưng hoạt động'}
                    </Text>
                    <Switch
                        value={status}
                        onValueChange={toggleStatus}
                        thumbColor={status ? 'green' : 'red'}
                        trackColor={{ false: '#d3d3d3', true: '#81b0ff' }}
                    />
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholder="Nhập số điện thoại"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Số Căn cước công dân</Text>
                <TextInput
                    style={styles.input}
                    value={idNumber}
                    editable={true}
                    placeholder="Nhập số CCCD"
                />
            </View>

            <View style={styles.fr2}>
                <Text style={styles.label}>Vị trí</Text>
                <View style={styles.vtr}>
                    <View style={styles.formGroupRow}>
                        <Text style={styles.input}>{position}</Text>
                        <TouchableOpacity onPress={() => setPickerVisible(true)}>
                            <Text style={styles.iconStyle}>Thay đổi</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isPickerVisible}
                        onRequestClose={() => setPickerVisible(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalView}>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setPickerVisible(false)}
                                >
                                    <Text>×</Text>
                                </TouchableOpacity>
                                {positions.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.item}
                                        onPress={() => {
                                            setPosition(item); // Cập nhật vai trò khi người dùng chọn
                                            setPickerVisible(false); // Đóng modal sau khi chọn
                                        }}
                                    >
                                        <Text style={styles.itemText}>{item}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>

            <Button
                title="Lưu"
                onPress={handleSave}
                disabled={!isEdited} // Chỉ kích hoạt nút Lưu nếu có thay đổi
                color={isEdited ? 'blue' : 'gray'}
            />

            {isModalVisible && (
                <UnsavedChangesModal
                    title="Lưu thay đổi"
                    content="Bạn có chắc muốn lưu những thay đổi này?"
                    onConfirm={handleConfirmSave} // Xử lý khi người dùng xác nhận lưu
                    onCancel={() => setModalVisible(false)} // Đóng modal nếu người dùng hủy
                />
            )}
        </ScrollView>
    );
};

export default EditEmployeeInfo;
