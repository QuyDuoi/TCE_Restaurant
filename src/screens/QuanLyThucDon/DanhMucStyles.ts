import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        paddingBottom: 80, // Để đảm bảo không bị ẩn phía dưới nút lưu
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    toppingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        marginBottom: 5,
    },
    toppingTextContainer: {
        flex: 1,
    },
    toppingName: {
        fontSize: 16,
    },
    toppingPrice: {
        fontSize: 14,
        color: '#888',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    linkedDishButton: {
        padding: 10,
        marginTop: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    linkedDishText: {
        fontSize: 16,
    },
    linkedDishContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginBottom: 5,
    },
    linkedDishSelected: {
        fontSize: 16,
        marginVertical: 2,
        color: '#4CAF50',
    },
    linkedDishRemoveButton: {
        backgroundColor: '#ff5722',
        padding: 5,
        borderRadius: 5,
    },
    linkedDishRemoveText: {
        color: '#fff',
    },
    removeButton: {
        backgroundColor: '#ff5722',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: '3%',
        left: '3%',
        right: '3%',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        maxHeight: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalItemText: {
        fontSize: 16,
    },
    modalCloseButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    modalOverlayDanhMuc: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentDanhMuc: {
        width: '90%', // Đặt chiều rộng modal là 90% để tạo khoảng cách với các cạnh
        maxHeight: '95%', // Giới hạn chiều cao của modal
        backgroundColor: 'white', // Màu nền trắng
        borderRadius: 10,
        padding: '3%',
        elevation: 5,
        marginHorizontal: '10%', // Cách hai bên 10% để tổng là 20%
    },
});

export default styles;
