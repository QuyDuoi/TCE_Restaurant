
export const api_IPV4 = 'https://tce-restaurant-api.onrender.com/api';

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemThuChi from './ItemThuChi';
import FilterOptionItem from './FilterOptionItem'; // Import Component mới

const ThuChiScreen = ({route}) => {
    const {caLam} = route.params;
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [dataAll, setDataAll] = useState([]);
    const [dataThu, setDataThu] = useState([]);
    const [dataChi, setDataChi] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false); // Thêm trạng thái refreshing
    
    const id_caLamViec = caLam._id;

    // Hàm lấy dữ liệu
    const fetchDataThuChi = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${api_IPV4}/layDsThuChi?id_caLamViec=${id_caLamViec}`);
            const result = await response.json();

            const modifiedData = result.tatCa.map(item => {
                if (item.soTienThu) {
                    return {
                        id: item._id,
                        time: new Date(item.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                        description: item.moTa,
                        amount: item.soTienThu.toLocaleString('vi-VN'),
                        status: 'Thu'
                    };
                }
                if (item.soTienChi) {
                    return {
                        id: item._id,
                        time: new Date(item.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                        description: item.moTa,
                        amount: item.soTienChi.toLocaleString('vi-VN'),
                        status: 'Chi'
                    };
                }
                return item;
            });
            setDataAll(modifiedData);

            setDataThu(
                result.thu.map(item => ({
                    id: item._id,
                    time: new Date(item.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                    description: item.moTa,
                    amount: item.soTienThu.toLocaleString('vi-VN'),
                    status: 'Thu'
                }))
            );

            setDataChi(
                result.chi.map(item => ({
                    id: item._id,
                    time: new Date(item.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                    description: item.moTa,
                    amount: item.soTienChi.toLocaleString('vi-VN'),
                    status: 'Chi'
                }))
            );

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false); // Khi dữ liệu được tải xong, tắt trạng thái refreshing
        }
    };

    useEffect(() => {
        fetchDataThuChi();
    }, []);

    useEffect(() => {
        const API_URLS = {
            all: dataAll,
            thu: dataThu,
            chi: dataChi
        };
        setData(API_URLS[filter] || []);
    }, [filter, dataAll, dataChi, dataThu]);

    const filteredData = data.filter(item =>
        item.description.toLowerCase().includes(search.toLowerCase())
    );

    const renderItemThuChi = ({ item }) => {
        return (
            <ItemThuChi
                id={item.id}
                time={item.time}
                status={item.status}
                money={item.amount}
                description={item.description}
            />
        );
    };

    // Hàm xử lý khi kéo xuống để refresh dữ liệu
    const onRefresh = () => {
        setRefreshing(true);
        fetchDataThuChi(); // Gọi lại hàm fetch dữ liệu
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
                    <Icon name="filter" size={20} color="#333" />
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

            <View style={{ width: '100%', height: '80%' }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={filteredData}
                        renderItem={renderItemThuChi}
                        keyExtractor={item => item.id}
                        refreshing={refreshing} // Cập nhật trạng thái refreshing
                        onRefresh={onRefresh}  // Hàm gọi lại khi kéo xuống
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, paddingTop: 10, backgroundColor: '#f8f8f8' },
    textHeader: { fontSize: 24, fontWeight: 'bold', color: 'red', textAlign: 'center', marginBottom: 10 },
    searchBar: { padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 10 },
    filterContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    filterButton: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
    currentFilterTextAll: { paddingHorizontal: 15, paddingVertical: 5, marginLeft: 10, fontSize: 16, color: '#333', backgroundColor: '#d3d3d3', borderRadius: 5 },
    currentFilterTextThu: { paddingHorizontal: 15, paddingVertical: 5, marginLeft: 10, fontSize: 16, color: 'green', backgroundColor: '#d4edda', borderRadius: 5 },
    currentFilterTextChi: { paddingHorizontal: 15, paddingVertical: 5, marginLeft: 10, fontSize: 16, color: 'red', backgroundColor: '#f8d7da', borderRadius: 5 },
    overlay: {
        position: 'absolute',
        width: '40%',
        top: '22%',
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
