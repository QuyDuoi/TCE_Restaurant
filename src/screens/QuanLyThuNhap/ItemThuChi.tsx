import React from "react";
import { View, Text, StyleSheet, } from "react-native";


interface Item {
    time: string,
    status: string,
    money: string,
    description: string
}
const ItemThuChi = (props: Item) => {
    const { time, status, money, description } = props;
    const onlyTime = time.split(' ')[0];
    return (
        <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.time}>Thời gian tạo: <Text style={styles.valueTime}>{onlyTime}</Text></Text>
                <Text style={styles.status}>Trạng thái: <Text style={status === 'Thu' ? styles.statusThu : styles.statusChi}>{status}</Text></Text>
            </View>
            <Text style={styles.money}>Số tiền: {money} ₫</Text>
            <Text style={styles.description}>Nội dung: <Text style={styles.valueDes}>{description}</Text></Text>
        </View>
    );
};


export default ItemThuChi;
const styles = StyleSheet.create({
    card: { padding: 15, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, elevation: 3 },
    time: { fontWeight: 'bold' },
    valueTime: { fontWeight: 'condensed', color: '#8f918f', fontSize: 13 },
    money: { fontWeight: 'bold' },
    status: { fontWeight: 'bold' },
    description: { fontWeight: 'bold' },
    valueDes: { fontWeight: 'normal', color: '#8f918f' },
    statusThu: { color: 'green' },
    statusChi: { color: 'red' },
})