import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const FilterOptionItem = ({ type, isActive, onSelect }) => {
    // Xác định màu sắc dựa trên trạng thái
    const backgroundColor =
        type === 'all'
            ? isActive
                ? '#d3d3d3'
                : '#fff'
            : type === 'thu'
            ? isActive
                ? '#d4edda'
                : '#fff'
            : isActive
            ? '#f8d7da'
            : '#fff';

    const textColor =
        type === 'all'
            ? '#333'
            : type === 'thu'
            ? isActive
                ? 'green'
                : '#333'
            : isActive
            ? 'red'
            : '#333';

    return (
        <TouchableOpacity
            style={[styles.filterOptionButton, { backgroundColor }]}
            onPress={onSelect}
        >
            <Text style={[styles.filterOptionText, { color: textColor }]}>
                {type === 'all' ? 'Tất cả' : type === 'thu' ? 'Phiếu thu' : 'Phiếu chi'}
            </Text>
        </TouchableOpacity>
    );
};

// Kiểu dữ liệu truyền vào Component
FilterOptionItem.propTypes = {
    type: PropTypes.oneOf(['all', 'thu', 'chi']).isRequired, // Chỉ nhận giá trị 'all', 'thu', hoặc 'chi'
    isActive: PropTypes.bool.isRequired, // Trạng thái kích hoạt
    onSelect: PropTypes.func.isRequired, // Hàm khi nhấn vào item
};

const styles = StyleSheet.create({
    filterOptionButton: {
        padding: 5,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
        borderWidth: 1,
        marginHorizontal: 5
    },
    filterOptionText: { fontSize: 16 },
});

export default FilterOptionItem;
