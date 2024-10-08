import { Alert } from 'react-native';
import { Linking } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';


// Hàm xử lý khi nhấn vào biểu tượng điện thoại
export const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
};

// Hàm xử lý khi nhấn vào biểu tượng sao chép
export const handleCopy = (phoneNumber: string) => {
    Clipboard.setString(phoneNumber); // Sao chép số điện thoại vào clipboard
    Alert.alert('Số điện thoại đã được sao chép!'); // Thông báo cho người dùng
};

export const handleDelete = (setModalVisible: boolean) => {
    // Xử lý xóa tài khoản ở đây
    Alert.alert('Tài khoản đã được xóa!'); // Bạn có thể thêm logic xóa tài khoản ở đây
};

export const marsePhoneNumber = (phoneNumber: String) => {
    if (phoneNumber.startsWith('0')) {
        return phoneNumber.replace(/^0/, '+84 | ');
    }
    return phoneNumber; // Trả về số gốc nếu không bắt đầu bằng '0'
};