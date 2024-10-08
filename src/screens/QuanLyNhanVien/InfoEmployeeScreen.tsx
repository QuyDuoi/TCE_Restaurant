import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, Alert, Modal } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';


//handles
import {
    handleCall,
    handleCopy,
    handleDelete,
    marsePhoneNumber,
} from './Khai/Controller/EmployeeController'
import styles from './Khai/Styles/EmployeeDetailStyles';


const isActive = true;

const phoneNumber = '0382315208';


const EmployeeDetailsScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.backButton}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Thông tin nhân viên</Text>
            </View>

            <View
                style={isActive ? styles.avatarContainerGreen : styles.avatarContainerRed}
            >
                <Image
                    source={{ uri: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg' }}
                    style={styles.avatar}
                />
            </View>

            <Text style={styles.name}>Quang Khải</Text>
            <Text style={[styles.status, { color: isActive ? 'green' : 'red' }]}>
                {isActive ? 'Active now' : 'Not Active'}
            </Text>

            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <TouchableOpacity onPress={() => handleCall(phoneNumber)}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>📞</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoLabel}>Số điện thoại</Text>
                        <Text style={styles.phoneContainer}>
                            <Text style={styles.phoneCode}>{marsePhoneNumber(phoneNumber)}</Text> {/* Mã vùng */}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleCopy(phoneNumber)}>
                        <Text style={styles.copyIcon}>📋</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>🆔</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoLabel}>Căn cước công dân</Text>
                        <Text style={styles.infoValue}>PH25638</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>👤</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoLabel}>Vai trò</Text>
                        <Text style={styles.infoValue}>Nhà hàng</Text>
                        <Text style={styles.infoValue}>Địa chỉ</Text>
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonUpdate}>
                    <Text style={styles.buttonTextUpdate}>Cập nhập thông tin</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonDelete}>
                    <Text style={styles.buttonTextDelete}>Xóa nhân viên</Text>
                </TouchableOpacity>
            </View>
            {/* Modal xác nhận xóa tài khoản */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Thông báo</Text>
                        <Text style={styles.modalMessage}>
                            Bạn có chắc chắn xóa nhân viên này không?
                        </Text>
                        <Text style={styles.modalWarning}>
                            Lưu ý: Mọi thông tin của nhân viên sẽ bị xóa và không thể khôi phục.
                        </Text>

                        <View style={styles.buttonContainerModal}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={[styles.button, styles.cancelButton]}
                            >
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleDelete(modalVisible)}
                                style={[styles.button, styles.confirmButton]}
                            >
                                <Text style={styles.buttonText}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
export default EmployeeDetailsScreen;
