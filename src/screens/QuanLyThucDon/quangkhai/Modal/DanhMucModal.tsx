import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, SafeAreaView, TextInput, Alert, StyleSheet } from 'react-native';

import styles from '../Styles/DanhMucStyles';
import { ScrollView, Switch } from 'react-native-gesture-handler';
import ToppingModal from './ToppingModal';

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

interface CategoryModalProps {
    visible: boolean; // Xác định modal có hiện hay không
    isAddingNew: boolean; // Xác định nếu modal đang trong chế độ thêm mới
    categories: Category;
    categoryName: string; // Tên của ô tô được chọn
    items: Item[]; // Giá của ô tô được chọn
    onClose: () => void; // Hàm để đóng modal
    onSave: () => void; // Hàm để lưu lại dữ liệu ô tô
}

const linkedDishesData = [
    { id: 1, name: 'Margherita' },
    { id: 2, name: 'BBQ Chicken' },
    { id: 3, name: 'Hawaiian' },
];



const CategoryModal: React.FC<CategoryModalProps> = ({ visible, isAddingNew, categories, categoryName, items, onClose, onSave }) => {
    const [nameCategory, setNameCategory] = useState(categories.name);
    const [categoryId, setCategoryId] = useState(categories.id);
    const [topping, setTopping] = useState(categories.items);

    useEffect(() => {
        setCategoryId(categoryId);
        setNameCategory(categoryName);
        setTopping(items);
    })

    const [originalCategoryName, setOriginalCategoryName] = useState(categoryName);

    const [selectedToppings, setSelectedToppings] = useState(topping.map(topping => topping.id));


    const [modalVisible, setModalVisible] = useState(false);

    const [linkedDishes, setLinkedDishes] = useState<string[]>([]);

    //state topping
    //state lưu danh mục khi chọn
    const [selectedTopping, setSelectedTopping] = useState<Item | null>(null);
    // State để xác định chế độ thêm mới hoặc chỉnh sửa
    const [isAddingNewTopping, setIsAddingNewTopping] = useState(false);
    // State để kiểm soát việc hiển thị modal
    const [modalToppingVisible, setModalToppingVisible] = useState(false);


    const handleBlur = () => {
        if (!categoryName.trim()) {
            setNameCategory(originalCategoryName);
        }
    };

    const toggleSwitch = (id: number) => {
        setSelectedToppings(prev => {
            if (prev.includes(id)) {
                return prev.filter(toppingId => toppingId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const removeLinkedDish = (dish: string) => {
        setLinkedDishes(prev => prev.filter(item => item !== dish));
    };

    const removeToppingGroup = () => {
        Alert.alert("Xóa nhóm topping", "Bạn có chắc chắn muốn xóa nhóm topping này?", [
            { text: "Hủy", style: "cancel" },
            { text: "Xóa", onPress: () => setSelectedToppings([]) }
        ]);
    };

    const saveChanges = () => {
        Alert.alert("Lưu thay đổi", "Các thay đổi đã được lưu!");
        setOriginalCategoryName(categoryName);
        onClose();
    };

    const addLinkedDish = (dish: string) => {
        setLinkedDishes(prev => [...prev, dish]);
        setModalVisible(false);
    };

    //modal Topping
    const openModalTopping = (topping?: Item) => {
        if (topping) {
            setSelectedTopping(topping);
            setIsAddingNewTopping(false);
        }
        else {
            // setSelectedTopping(null);
            setSelectedTopping({ id: Date.now(), name: '', price: 0 }); // Tạo danh mục mới với id duy nhất
            setIsAddingNewTopping(true);
            console.log("adding new topping")
        }
        setModalToppingVisible(true);
    }

    const closeModalTopping = () => {
        setModalToppingVisible(false); // Ẩn modal
    };

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.modalOverlayDanhMuc}>
                <SafeAreaView style={styles.modalContentDanhMuc}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <Text style={styles.label}>Mã:</Text>
                        <Text style={styles.value}>{isAddingNew ? 'Tự tạo mã' : categories.id}</Text>
                        <View style={styles.separator} />

                        {/* Tên danh mục có thể chỉnh sửa */}
                        <Text style={styles.label}>Tên:</Text>
                        {isAddingNew ? (
                            <TextInput
                                style={styles.input}
                                onChangeText={setNameCategory}
                                onBlur={handleBlur}
                            />
                        ) : (
                            <TouchableOpacity onPress={() => {
                                setOriginalCategoryName(categoryName);
                            }}>
                                <Text style={styles.value}>{categoryName}</Text>
                            </TouchableOpacity>
                        )}

                        <View style={styles.separator} />

                        <Text style={styles.label}>Danh sách topping:</Text>
                        <FlatList
                            data={topping}
                            renderItem={({ item }) => (
                                <View style={styles.toppingContainer}>
                                    <TouchableOpacity
                                        style={styles.toppingTextContainer}
                                        onLongPress={() => openModalTopping(item)}
                                    >
                                        <Text style={styles.toppingName}>{item.name}</Text>
                                        <Text style={styles.toppingPrice}>${item.price.toFixed(2)}</Text>
                                    </TouchableOpacity>

                                    <Switch
                                        value={selectedToppings.includes(item.id)}
                                        onValueChange={() => toggleSwitch(item.id)}
                                    />
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            scrollEnabled={false} // Tắt cuộn cho FlatList để chỉ có ScrollView cuộn
                        />

                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => openModalTopping()}
                        >
                            <Text style={styles.addButtonText}>Thêm topping</Text>
                        </TouchableOpacity>

                        <Text style={styles.label}>Món đã liên kết:</Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.linkedDishButton}>
                            <Text style={styles.linkedDishText}>Xem món đã liên kết</Text>
                        </TouchableOpacity>

                        <Text style={styles.label}>Món đã liên kết đã chọn:</Text>
                        {linkedDishes.map((dish, index) => (
                            <View key={index} style={styles.linkedDishContainer}>
                                <Text style={styles.linkedDishSelected}>{dish}</Text>
                                <TouchableOpacity onPress={() => removeLinkedDish(dish)} style={styles.linkedDishRemoveButton}>
                                    <Text style={styles.linkedDishRemoveText}>Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        ))}

                        <View style={{ display: isAddingNew ? 'none' : 'flex' }} >
                            <TouchableOpacity onPress={removeToppingGroup} style={styles.removeButton}>
                                <Text style={styles.removeButtonText}>Xóa nhóm topping</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    <TouchableOpacity onPress={saveChanges} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Lưu</Text>
                    </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Chọn món đã liên kết</Text>
                                <FlatList
                                    data={linkedDishesData}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => addLinkedDish(item.name)} style={styles.modalItem}>
                                            <Text style={styles.modalItemText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
                                    <Text style={styles.modalCloseButtonText}>Đóng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {selectedTopping && (
                        <ToppingModal
                            visible={modalToppingVisible}
                            selectedCategory={categories}
                            isAddingNew={isAddingNewTopping}
                            topping={selectedTopping || null}
                            toppingName={selectedTopping?.name || ''}
                            priceTopping={selectedTopping?.price || 0}
                            onClose={closeModalTopping}
                            onAddTopping={(name, price) => {
                                const newTopping = {
                                    id: topping.length + 1,
                                    name: name,
                                    price: price,
                                };
                                topping.push(newTopping); // Thêm topping mới vào danh sách
                                setSelectedToppings(prev => [...prev, newTopping.id]); // Chọn topping mới
                                // setModalVisibleForAddTopping(false); // Đóng modal
                            }}
                        />
                    )}

                </SafeAreaView>
            </View>
        </Modal>
    );
};



export default CategoryModal;
