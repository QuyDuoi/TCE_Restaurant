import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { FoodOderScreen } from './FoodOderScreen'; // Điều chỉnh theo đúng đường dẫn của bạn
import { useDispatch } from 'react-redux';
import { fetchMonAnTheoId } from '../../store/MonAnSlice';
import { fetchBanTheoId } from '../../store/BanSlice';

interface OrderDetailModalProps {
    visible: boolean;
    onClose: () => void;
    order: FoodOderScreen | null;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ visible, onClose, order }) => {
    const dispatch = useDispatch();
    const [monAn, setMonAn] = useState<any | null>(null);
    const [ban, setBan] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (order?.idMonAn && order?.idBan) {
            setLoading(true);

            const fetchMonAn = dispatch(fetchMonAnTheoId(order.idMonAn));
            const fetchBan = dispatch(fetchBanTheoId(order.idBan));

            Promise.all([fetchMonAn, fetchBan])
                .then(([monAnResponse, banResponse]) => {
                    setMonAn(monAnResponse.payload);
                    setBan(banResponse.payload);
                })
                .finally(() => setLoading(false));
        }
    }, [order?.idMonAn, order?.idBan, dispatch]);

    // useEffect(() => {
    //     if (order?.idMonAn) {
    //         setLoading(true);
    //         dispatch(fetchMonAnTheoId(order?.idMonAn))
    //             .then((response: any) => {
    //                 setMonAn(response.payload);
    //             })
    //             .finally(() => setLoading(false));
    //     }
    // }, [order?.idMonAn, dispatch]);

    // useEffect(() => {
    //     if (order?.idBan) {
    //         setLoading(true);
    //         dispatch(fetchBanTheoId(order?.idBan))
    //             .then((response: any) => {
    //                 setBan(response.payload);
    //             })
    //             .finally(() => setLoading(false));
    //     }
    // }, [order?.idBan, dispatch]);

    const handleDelete = () => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa oder này không?",
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Hủy bỏ xóa"),
                    style: "cancel",
                },
                { text: "Xóa", onPress: () => console.log("Đã xóa đơn hàng") }
            ]
        );
    };

    if (!order) return null;
    if (!visible || loading) return null;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Chi tiết đơn hàng</Text>
                    {loading ? (
                        <Text style={styles.loadingText}>Đang tải...</Text>
                    ) : (
                        <>
                            <Text style={styles.text}>Tên món: <Text style={styles.bold}>{monAn.tenMon}</Text></Text>
                            <Text style={styles.text}>Số lượng: <Text style={styles.bold}>{order.quantity}</Text></Text>
                            <Text style={styles.text}>Vị trí: <Text style={styles.bold}>Bàn {ban.tenBan}</Text></Text>
                            <Text style={styles.text}>Trạng thái:
                                <Text style={order.status ? styles.statusCompleted : styles.statusPending}>
                                    {order.status ? 'Hoàn thành' : 'Chưa hoàn thành'}
                                </Text>
                            </Text>
                            <Image source={{ uri: monAn.anhMonAn }} style={styles.foodImage} />
                        </>
                    )}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Đóng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete} style={[styles.closeButton, styles.deleteButton]}>
                            <Text style={styles.closeButtonText}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginVertical: 5,
        color: '#555',
    },
    bold: {
        fontWeight: 'bold',
        color: '#333',
    },
    foodImage: {
        width: 120,
        height: 120,
        marginVertical: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    closeButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    deleteButton: {
        backgroundColor: 'red',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingText: {
        fontSize: 18,
        color: '#999',
        fontStyle: 'italic',
        marginVertical: 20,
    },
    statusCompleted: {
        color: 'green',
        fontWeight: 'bold',
    },
    statusPending: {
        color: 'red',
        fontWeight: 'bold',
    },
});

export default OrderDetailModal;
