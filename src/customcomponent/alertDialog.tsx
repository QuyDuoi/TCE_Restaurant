import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';

interface AlertDialogProps {
    isSuccess: boolean;
    message: string;
    onDismiss: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ isSuccess, message, onDismiss }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 2000); // Tự động đóng sau 2 giây

        return () => clearTimeout(timer); // Dọn dẹp timer
    }, [onDismiss]);

    if (!visible) return null;

    return (
        <View style={[styles.alertContainer, isSuccess ? styles.successBorder : styles.errorBorder]}>
            <View style={styles.contentWrapper}>
                <View style={[styles.iconCircle, isSuccess ? styles.successBackground : styles.errorBackground]}>
                    <FontAwesomeIcon 
                        icon={isSuccess ? faCheckCircle : faTimesCircle} 
                        size={20} 
                        color={isSuccess ? '#12B76A' : '#F04438'} 
                    />
                </View>
                <Text style={styles.messageText}>
                    {message} {/* Hiển thị thông điệp */}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    alertContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 50,
        padding: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    successBorder: {
        borderColor: '#12B76A',
    },
    errorBorder: {
        borderColor: '#F04438',
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center', 
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    successBackground: {
        backgroundColor: '#E6F4EA',
    },
    errorBackground: {
        backgroundColor: '#FEE4E2',
    },
    messageText: {
        color: '#344054',
        fontSize: 14,
        width: '85%',
    },
});

export default AlertDialog;
