import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        paddingTop: 20, // Sát lên trên
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        paddingBottom: 10, // Giảm khoảng cách dưới
    },
    backButton: {
        fontSize: 24,
        color: '#007bff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    avatarContainerGreen: {
        borderWidth: 4, // Độ dày viền (dày hơn 1 chút)
        borderColor: 'green', // Đặt màu viền ở đây
        borderRadius: 64, // Bán kính của viền
        // padding: 2, // Giảm khoảng cách giữa viền và ảnh
        marginBottom: 10,
        overflow: 'hidden', // Đảm bảo ảnh không bị tràn ra ngoài viền
    },
    avatarContainerRed: {
        borderWidth: 4, // Độ dày viền (dày hơn 1 chút)
        borderColor: 'red', // Đặt màu viền ở đây
        borderRadius: 64, // Bán kính của viền
        // padding: 2, // Giảm khoảng cách giữa viền và ảnh
        marginBottom: 10,
        overflow: 'hidden', // Đảm bảo ảnh không bị tràn ra ngoài viền
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60, // Bán kính của ảnh
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    status: {
        color: '#6c757d',
        marginBottom: 30,
        fontWeight: 'bold',
    },
    infoContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#e9ecef',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    icon: {
        fontSize: 18,
    },
    infoTextContainer: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6c757d',
    },
    infoValue: {

        fontSize: 16,
        fontWeight: 'bold',
    },
    copyIcon: {
        fontSize: 18,
        color: '#007bff',
    },
    buttonContainer: {
        width: '90%',
        position: 'absolute',
        bottom: 30, // Dịch sát xuống dưới
        alignItems: 'center',
    },
    buttonUpdate: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonTextUpdate: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonDelete: {
        backgroundColor: '#f8f9fa',
        paddingVertical: 15,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        borderColor: '#dc3545',
        borderWidth: 1,
    },
    buttonTextDelete: {
        color: '#dc3545',
        fontSize: 16,
        fontWeight: 'bold',
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    phoneCode: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
    },
    phoneNumber: {
        fontSize: 16,
        color: '#6c757d',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5,
    },
    modalWarning: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: 'red',
    },
    confirmButton: {
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default styles;