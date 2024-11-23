import React from "react";
import { View, Text, StyleSheet, } from "react-native";


interface Item {
    id: string,
    time: string,
    status: string,
    money: string,
    description: string
}
const ItemThuChi = (props: Item) => {
    const {id, time, status, money, description } = props;
    const onlyTime = time.split(' ')[0];
    return (
        <View style={styles.card} key={id}>
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
    card: { padding: 15, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, elevation: 5 },
    time: { fontWeight: 'bold' , color: 'black'},
    valueTime: { fontWeight: 'normal', color: 'black', fontSize: 13 },
    money: { fontWeight: 'bold', color: 'black', marginVertical: 3},
    status: { fontWeight: 'bold' , color: 'black'},
    description: { fontWeight: 'bold', color: 'black'},
    valueDes: { fontWeight: 'normal', color: 'black' },
    statusThu: { color: 'green' },
    statusChi: { color: 'red' },
})