import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ItemThuChi from './ItemThuChi';
import FilterOptionItem from './FilterOptionItem'; // Import Component mới

const API_URLS = {
    all: [
        { id: '1', time: '12:45 20/10/2024', amount: '50,000', status: 'Thu', description: 'Income for October' },
        { id: '2', time: '12:30 20/10/2024', amount: '50,000', status: 'Chi', description: 'Expense for October' },
        { id: '5', time: '12:30 20/10/2024', amount: '50,000', status: 'Chi', description: 'Expense for October' },
        { id: '3', time: '13:30 20/10/2024', amount: '50,000', status: 'Thu', description: 'Income for October' },
        { id: '4', time: '09:30 20/10/2024', amount: '50,000', status: 'Thu', description: 'Income for October' },
    ],
    thu: [
        { id: '1', time: '12:45 20/10/2024', amount: '50,000', status: 'Thu', description: 'Income for October' },
        { id: '2', time: '12:45 20/10/2024', amount: '50,000', status: 'Thu', description: 'Income for October' },
        { id: '3', time: '12:45 20/10/2024', amount: '50,000', status: 'Thu', description: 'Income for October' },
        { id: '4', time: '12:45 20/10/2024', amount: '50,000', status: 'Thu', description: 'Income for October' },
    ],
    chi: [
        { id: '1', time: '12:30 20/10/2024', amount: '50,000', status: 'Chi', description: 'Expense for October' },
        { id: '2', time: '12:30 20/10/2024', amount: '50,000', status: 'Chi', description: 'Expense for October' },
        { id: '3', time: '12:30 20/10/2024', amount: '50,000', status: 'Chi', description: 'Expense for October' },
        { id: '4', time: '12:30 20/10/2024', amount: '50,000', status: 'Chi', description: 'Expense for October' },
        { id: '5', time: '12:30 20/10/2024', amount: '50,000', status: 'Chi', description: 'Expense for October' },
    ]
};

const ThuChiScreen = () => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);

    useEffect(() => {
        setData(API_URLS[filter]);
    }, [filter]);

    const filteredData = data.filter(item =>
        item.description.toLowerCase().includes(search.toLowerCase())
    );

    const renderItemThuChi = ({ item }) => {
        return (
            <ItemThuChi
                time={item.time}
                status={item.status}
                money={item.amount}
                description={item.description}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Danh sách thu chi</Text>
            <TextInput
                style={styles.searchBar}
                placeholder="Tìm kiếm phiếu"
                value={search}
                onChangeText={setSearch}
            />
            {/* Nút lọc */}
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setFilterVisible(prev => !prev)}
                >
                   <FontAwesomeIcon icon='fa-regular fa-filter'/>
                </TouchableOpacity>
                <Text style={filter === 'all' ? styles.currentFilterTextAll : filter === 'thu' ? styles.currentFilterTextThu : styles.currentFilterTextChi}>
                    {filter === 'all' ? 'Tất cả' : filter === 'thu' ? 'Phiếu thu' : 'Phiếu chi'}
                </Text>
            </View>

            {/* Các tùy chọn bộ lọc */}
            {filterVisible && (
                <View style={styles.overlay}>
                    <View style={styles.filterOptions}>
                        {['all', 'thu', 'chi'].map(type => (
                            <FilterOptionItem
                                key={type}
                                type={type}
                                isActive={filter === type}
                                onSelect={() => {
                                    setFilter(type);
                                    setFilterVisible(false);
                                }}
                            />
                        ))}
                    </View>
                </View>
            )}

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={filteredData}
                    renderItem={renderItemThuChi}
                    keyExtractor={item => item.id}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: { padding: 20, paddingTop: 10, backgroundColor: '#f8f8f8' },
    textHeader: { fontSize: 24, fontWeight: 'bold', color: 'red', textAlign: 'center', marginBottom: 10 },
    searchBar: { padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 10 },
    filterContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    filterButton: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ccc' },
    currentFilterTextAll: { paddingHorizontal:15,paddingVertical:5, marginLeft: 10, fontSize: 16, color: '#333',backgroundColor:'#d3d3d3',borderRadius: 5, },
    currentFilterTextThu: {paddingHorizontal:15,paddingVertical:5, marginLeft: 10, fontSize: 16, color: 'green',backgroundColor:'#d4edda',borderRadius: 5, },
    currentFilterTextChi: {paddingHorizontal:15,paddingVertical:5, marginLeft: 10, fontSize: 16, color: 'red',backgroundColor:'#f8d7da',borderRadius: 5, },
    overlay: {
        position: 'absolute',
        width:'40%',
        top:'22%',
        left: 10,
        right: 0,
        zIndex: 1,
       
    },
    filterOptions: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    }
});

export default ThuChiScreen;

