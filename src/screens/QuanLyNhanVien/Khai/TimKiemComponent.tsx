// SearchComponent.tsx
import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors'; // Thay đổi đường dẫn nếu cần

interface SearchComponentProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm"
        value={searchQuery}
        onChangeText={onSearchChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    backgroundColor: colors.search,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
});

export default SearchComponent;
