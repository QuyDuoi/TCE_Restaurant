import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, Button, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { styles } from './EditEmployeeInfoStyles.tsx';
import UnsavedChangesModal from '../../customcomponent/modalSave.tsx';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '../../store/EmployeeSlice'; // Import Redux action để cập nhật nhân viên
import { useNavigation, useRoute } from '@react-navigation/native';

const EditEmployeeInfo = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    // Nhận dữ liệu nhân viên từ route.params
    const { nhanVien } = route.params;

    const [name, setName] = useState(nhanVien.nameNhanVien || '');
    const [status, setStatus] = useState(nhanVien.status || true);
    const [phone, setPhone] = useState(nhanVien.phone || '');
    const [idNumber, setIdNumber] = useState(nhanVien.idNumber || '');
    const [position, setPosition] = useState(nhanVien.position || 'Nhân viên');
    const [location, setLocation] = useState(nhanVien.location || ''); // Vị trí cửa hàng
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [isEdited, setIsEdited] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false); // State cho modal xác nhận

    const positions = ["Nhân viên", "Quản lý", "Admin", "Bếp"];

    // Kiểm tra nếu thông tin đã bị thay đổi so với dữ liệu ban đầu
    useEffect(() => {
        if (
            name !== nhanVien.nameNhanVien ||
            status !== nhanVien.status ||
            phone !== nhanVien.phone ||
            position !== nhanVien.position
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
            nameNhanVien: name,
            status: status,
            phone: phone,
            idNumber: idNumber,
            position: position,
        };

        try {
            // Cập nhật dữ liệu lên Backend
            const response = await fetch(`http://your-api-url.com/employees/${nhanVien.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEmployee),
            });

            if (response.ok) {
                // Cập nhật lên Store Redux sau khi API thành công
                dispatch(updateEmployee(updatedEmployee));

                Alert.alert('Thành công', 'Cập nhật thông tin nhân viên thành công');
                navigation.goBack(); // Quay về trang danh sách
            } else {
                Alert.alert('Lỗi', 'Cập nhật thông tin không thành công');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật nhân viên:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật thông tin');
        }
    };

    // Chuyển đổi trạng thái hoạt động
    const toggleStatus = () => {
        setStatus(!status);
    };

    // Định dạng số điện thoại
    const formatPhoneNumber = (inputNumber: string) => {
        return inputNumber.length === 10 ? `+84 ${inputNumber.substring(1)}` : inputNumber;
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
                <TextInput style={styles.input} value={name} onChangeText={setName} />
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
                    value={formatPhoneNumber(phone)}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Căn cước công dân số</Text>
                <TextInput style={styles.input} value={idNumber} editable={false} />
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
                                            setPosition(item);
                                            setPickerVisible(false);
                                        }}
                                    >
                                        <Text style={styles.itemText}>{item}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </Modal>
                    <TextInput style={styles.input} value={location} editable={false} />
                </View>
            </View>

            <Button
                title="Lưu"
                onPress={handleSave}
                disabled={!isEdited}
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
