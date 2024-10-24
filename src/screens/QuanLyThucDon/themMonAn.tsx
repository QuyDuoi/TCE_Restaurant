import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

function ManThemMonAn(): React.JSX.Element {
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Hình Ảnh Section */}
        <View style={styles.imageSection}>
          <View style={styles.imageTittle}>
            <Text style={styles.sectionTitle}>Hình Ảnh <Text style={styles.required}>*</Text></Text>
            <Text style={styles.imageDescription}>
              Món có ảnh sẽ được khách đặt nhiều hơn. Tỷ lệ ảnh yêu cầu: 1:1.
            </Text>
          </View>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Tải ảnh mô tả</Text>
          </TouchableOpacity>
        </View>

        {/* Tên Món */}
        <View style={styles.row}>
          <Text style={styles.label}>
            Tên <Text style={styles.required}>*</Text>
          </Text>
          <TextInput style={styles.input} placeholder="VD: Khoai tây chiên" />
        </View>

        {/* Giá */}
        <View style={styles.row}>
          <Text style={styles.label}>
            Giá <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="đ"
            keyboardType="numeric"
          />
        </View>

        {/* Danh mục */}
        <View style={styles.row}>
          <Text style={styles.label}>
            Danh mục <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>Chọn danh mục</Text>
          </TouchableOpacity>
        </View>

        {/* Mô tả */}
        <View style={styles.row}>
          <Text style={styles.label}>Mô tả</Text>
          <TextInput
            style={styles.input}
            placeholder="VD: Cà chua + Khoai tây chiên + Tương ớt"
          />
        </View>

        {/* Nhóm Topping */}
        <View style={styles.row}>
          <Text style={styles.label}>Nhóm Topping</Text>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>Chọn nhóm Topping</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Nút Lưu */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  scrollContainer: {
    paddingBottom: 100, // Để tránh che nội dung bởi nút Lưu cố định
  },
  imageSection: {
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageTittle: {
    width: '72%'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  imageDescription: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  required: {
    color: 'red',
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#ff4500',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    width: 100,
    height: 100
  },
  uploadButtonText: {
    color: '#ff4500',
    fontSize: 16,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    width: '25%',
    fontSize: 14,
    color: 'black',
  },
  input: {
    width: '75%',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Đường gạch chân nhẹ thay cho border
  },
  categoryButton: {
    width: '75%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#000',
  },
  saveButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ff4500',
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ManThemMonAn;
