import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, Button, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { styles } from './EditEmployeeInfoStyles.tsx';

const EditEmployeeInfo = () => {
    const [name, setName] = useState('Lê Minh Đức');
    const [status, setStatus] = useState(true);
    const [phone, setPhone] = useState('0346677855');
    const [idNumber, setIdNumber] = useState('01234567891');
    const [position, setPosition] = useState('Quản lý');
    const [location, setLocation] = useState('Chay Happy - Trần Hữu Dực');
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [isEdited, setIsEdited] = useState(false);

    const originalData = {
        name: 'Lê Minh Đức',
        status: true,
        position: 'Quản lý'
    };

    const positions = ["Nhân viên", "Quản lý", "Admin", "Bếp"];

    const toggleStatus = () => {
        setStatus(!status);
    };

    const formatPhoneNumber = (inputNumber: string) => {
        return inputNumber.length === 10 ? `+84 ${inputNumber.substring(1)}` : `+84 ${inputNumber.substring(1)}`;
    };

    const handleSave = () => {
        console.log({ name, status, phone: formatPhoneNumber(phone), idNumber, position, location });
    };

    useEffect(() => {
        // Check if any value has been changed compared to the original data
        if (name !== originalData.name || status !== originalData.status || position !== originalData.position) {
            setIsEdited(true);
        } else {
            setIsEdited(false);
        }
    }, [name, status, position]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
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
                <Text style={styles.label}>Số điện thoại nhân viên</Text>
                <TextInput
                    style={styles.input}
                    value={formatPhoneNumber(phone)}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    editable={false}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Căn cước công dân số</Text>
                <TextInput style={styles.input} value={idNumber} editable={false} />
            </View>
            <View style={styles.fr2}>
                <Text style={styles.label}>Vị trí</Text>
                <View style={styles.vtr}>

                    <View>
                        <View style={styles.formGroupRow}>
                            <Text style={styles.input}>{position}</Text>
                            <TouchableOpacity onPress={() => setPickerVisible(true)}>
                                <Text style={styles.iconStyle}> Thay đổi </Text>
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
                    </View>
                    <TextInput style={styles.input} value={location} editable={false} />
                </View>
            </View>

            <Button
                title="Lưu"
                onPress={handleSave}
                disabled={!isEdited}
                color={isEdited ? 'blue' : 'gray'}
            />
        </ScrollView>
    );
};

export default EditEmployeeInfo;
