import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
  Button,
} from 'react-native';
import CategoryModal from './DanhMucModal';

interface Item {
  id: number;
  name: string;
  price: number;
}

interface Category {
  id: number;
  name: string;
  items: Item[];
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Pizza',
    items: [
      { id: 1, name: 'Cheese', price: 666 },
      { id: 2, name: 'Pepperoni', price: 666 },
      { id: 3, name: 'Vegetable', price: 666 },
    ],
  },
  {
    id: 2,
    name: 'Burger',
    items: [
      { id: 4, name: 'Beef', price: 666 },
      { id: 5, name: 'Chicken', price: 666 },
      { id: 6, name: 'Vegan', price: 666 },
    ],
  },
  { id: 3, name: 'Salad', items: [] },
];

const CategoryScreen = ({ user }: { user: any }) => {
  const idUser = user.email;
  //state lưu danh mục khi chọn
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  // State để kiểm soát việc hiển thị modal
  const [modalVisible, setModalVisible] = useState(false);
  // State để xác định chế độ thêm mới hoặc chỉnh sửa
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);

  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  //Thêm

  const toggleCategory = (id: number) => {
    setExpandedCategories(prev =>
      prev.includes(id)
        ? prev.filter(categoryId => categoryId !== id)
        : [...prev, id],
    );
  };

  // const handleLongPress = (category: Category) => {
  //     setSelectedCategory(category); // Lưu danh mục được chọn
  //     setModalVisible(true); // Hiện modal
  // };

  const openModal = (categories?: Category) => {
    if (categories) {
      setSelectedCategory(categories);
      setIsAddingNewCategory(false);
    } else {
      // setSelectedCategory(null);
      setSelectedCategory({ id: Date.now(), name: '', items: [] }); // Tạo danh mục mới với id duy nhất
      setIsAddingNewCategory(true);
      console.log('adding new category');
    }
    setModalVisible(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setModalVisible(false); // Ẩn modal
    console.log(user.uid);
  };

  const addNew = () => {
    Alert.alert('Đã lưu');
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  // const openModalForAdd = () => {
  //     setModalVisible(true); // Mở modal
  // };

  const renderCategory = ({ item }: { item: Category }) => {
    const isExpanded = expandedCategories.includes(item.id);

    return (
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          onPress={() => toggleCategory(item.id)}
          onLongPress={() => openModal(item)} // Nhấn giữ để mở modal
          style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>{item.name}</Text>
          <Text style={styles.itemCount}>({item.items.length})</Text>
        </TouchableOpacity>
        {isExpanded && (
          <FlatList
            data={item.items}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.categoryTitle}>{idUser}</Text>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id.toString()}
      />
      {selectedCategory && (
        <CategoryModal
          visible={modalVisible} // Điều khiển hiển thị modal
          isAddingNew={isAddingNewCategory} // Truyền vào chế độ thêm mới hay chỉnh sửa
          categories={selectedCategory || null}
          categoryName={selectedCategory?.name || ''} // Tên ô tô nếu chỉnh sửa, hoặc rỗng nếu thêm mới
          items={
            Array.isArray(selectedCategory?.items) ? selectedCategory.items : []
          } // Kiểm tra nếu items là một mảng, nếu không thì truyền mảng rỗng
          onClose={closeModal} // Hàm đóng modal
          onSave={addNew} // Hàm để lưu ô tô mới
        />
      )}
      <Button title="Thêm danh mục" onPress={() => openModal()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  categoryContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemCount: {
    fontSize: 16,
    color: '#888',
  },
  itemContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: '3%',
    left: '3%',
    right: '3%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CategoryScreen;
