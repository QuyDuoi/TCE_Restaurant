import React, {createContext, useContext, useState} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Sử dụng FontAwesome hoặc thay thế với icon khác

// Định nghĩa kiểu cho ToastContext
interface ToastContextProps {
  showToast: (iconName: string, message: string, color: string, time: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Custom hook sử dụng ToastContext
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Cập nhật ToastProvider
export const ToastProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [toast, setToast] = useState<{
    iconName: string;
    message: string;
    color: string;
    time: number;
  } | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0)); // Để điều khiển độ mờ của Toast

  // Hàm để hiển thị toast
  const showToast = (iconName: string, message: string, color: string, time: number) => {
    setToast({iconName, message, color, time});

    // Bắt đầu fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Đóng Toast sau 1.5 giây
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setToast(null); // Đóng Toast sau khi fade-out xong
      });
    }, time);
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      {toast && (
        <Animated.View style={[styles.toastContainer, {opacity: fadeAnim}]}>
          <View style={styles.iconContainer}>
            <Icon name={toast.iconName} size={24} color={toast.color} />
          </View>
          <Text style={styles.toastMessage}>{toast.message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#656565',
    paddingVertical: 10,
    borderRadius: 15,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginRight: 10,
  },
  toastMessage: {
    color: 'white',
    fontSize: 16,
  },
});
