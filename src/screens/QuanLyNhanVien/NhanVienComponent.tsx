import {
  View,
  Text,
  Image,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { hoaStyles } from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import ButtonComponent from '../QuanLyThucDon/Hoa/components/ButtonComponent';
import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';
import SectionComponent from '../QuanLyThucDon/Hoa/components/SectionComponent';
import TitleComponent from '../QuanLyThucDon/Hoa/components/TitleComponent';
import InputComponent from '../QuanLyThucDon/Hoa/components/InputComponent';
import SpaceComponent from '../QuanLyThucDon/Hoa/components/SpaceComponent';
import ItemNhanVien from './ItemNhanVien';
import { colors } from '../QuanLyThucDon/Hoa/contants/hoaColors';
import { useNavigation, useRoute } from '@react-navigation/native';

interface nhanVienModelTest {
  id: number;
  nameNhanVien: string;
  position: string;
  status: boolean;
  avatar: string;
  id_cuaHang: number;
}

interface FiltersModelTest {
  hoatDong: boolean;
  ngungHoatDong: boolean;
  quanLy: boolean;
  thuNgan: boolean;
  phucVu: boolean;
  dauBep: boolean;
}

const defaultFilters: FiltersModelTest = {
  hoatDong: false,
  ngungHoatDong: false,
  quanLy: false,
  thuNgan: false,
  phucVu: false,
  dauBep: false,
};

const NhanVienComponent = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Lấy dữ liệu từ navigation route
  const [isVisibleDialog, setIsVisibleDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [nhanVienList, setNhanVienList] = useState<nhanVienModelTest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FiltersModelTest>(defaultFilters);
  const [filterNhanVienList, setFilterNhanVienList] = useState<nhanVienModelTest[]>([]);

  // Sử dụng useEffect để kiểm tra nếu có dữ liệu mới từ route.params
  useEffect(() => {
    if (route.params?.newEmployee) {
      // Thêm nhân viên mới vào danh sách hiện tại
      setNhanVienList((prevList) => [...prevList, route.params.newEmployee]);
    }
  }, [route.params?.newEmployee]);

  // **Lấy dữ liệu nhân viên từ API**
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://your-api-url.com/employees'); // Thay bằng URL API của bạn
        const data = await response.json();
        setNhanVienList(data); // Cập nhật danh sách nhân viên
        setFilterNhanVienList(data); // Cập nhật danh sách để lọc
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu nhân viên: ', error);
      } finally {
        setIsLoading(false); // Ngừng trạng thái loading
      }
    };

    fetchEmployees();
  }, []);

  // Khi tìm kiếm hoặc lọc thay đổi, cập nhật danh sách được hiển thị
  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters]);

  const applyFilters = () => {
    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    let filteredResult = nhanVienList.filter((nv) =>
      nv.nameNhanVien.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeFilters.length === 0) {
      setFilterNhanVienList(filteredResult);
      return;
    }

    filteredResult = filteredResult.filter((nv) => {
      const statusFilter =
        (!filters.hoatDong && !filters.ngungHoatDong) ||
        (filters.hoatDong && nv.status) ||
        (filters.ngungHoatDong && !nv.status);

      const positionFilter =
        (!filters.quanLy && !filters.thuNgan && !filters.phucVu && !filters.dauBep) ||
        (filters.quanLy && nv.position === 'Quan ly') ||
        (filters.thuNgan && nv.position === 'Nhan vien thu ngan') ||
        (filters.phucVu && nv.position === 'Nhan vien phuc vu') ||
        (filters.dauBep && nv.position === 'Dau bep');

      return statusFilter && positionFilter;
    });

    setFilterNhanVienList(filteredResult);
  };

  const toggleFilter = (filterName: keyof typeof filters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const renderItem = ({ item }: { item: nhanVienModelTest }) => {
    return (
      <ItemNhanVien
        onPress={() => navigation.navigate('employeeDetails', { nhanVien: item })}
        nameNhanVien={item.nameNhanVien}
        position={item.position}
        status={item.status}
        colorStatus={item.status ? '#E7F4FF' : '#FFD2CD'}
        avatar={item.avatar}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={[hoaStyles.containerTopping, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <View style={[hoaStyles.containerTopping]}>
        <View>
          <InputComponent
            placeholder="Tìm kiếm nhân viên"
            styles={{
              backgroundColor: colors.white,
              paddingHorizontal: 5,
              marginTop: 10,
            }}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            elevation={10}
            allowClear
            styleIconX={{ alignSelf: 'center', marginRight: 5 }}
            fontSize={16}
          />
        </View>
        <SpaceComponent height={15} />
        <RowComponent
          justify="space-between"
          styles={{
            paddingHorizontal: 12,
          }}>
          <ButtonComponent
            title="Thêm nhân viên mới"
            onPress={() => navigation.navigate('AddEmployee')}
            bgrColor="#5664F5"
            styles={{ width: '52%', height: 48 }}
            boderRadius={8}
            titleColor="white"
            titleSize={16.5}
          />
          <ButtonComponent
            title="Lọc"
            onPress={() => setIsVisibleDialog(true)}
            styles={{ width: '20%', height: 47 }}
            boderRadius={4}
            titleSize={18}
            evalation={15}
          />
        </RowComponent>
        <SectionComponent styles={{ flex: 1 }}>
          {filterNhanVienList.length > 0 ? (
            <FlatList
              data={filterNhanVienList}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TitleComponent text="Không tìm thấy nhân viên" color={colors.desc} />
            </View>
          )}
        </SectionComponent>
      </View>

      {/* Modal lọc danh sách nhân viên */}
      <Modal visible={isVisibleDialog} transparent animationType="fade">
          <TouchableWithoutFeedback
            onPress={() => {
              setIsVisibleDialog(false);
            }}>
            <View style={[hoaStyles.modalContainer]}>
              <TouchableWithoutFeedback>
                <View style={[hoaStyles.modalContent]}>
                  <TitleComponent
                    text="Loc danh sach"
                    styles={{marginVertical: 5}}
                    size={19}
                  />
                  <SectionComponent
                    styles={{
                      width: '100%',
                    }}>
                    <TitleComponent
                      text="Trang thai"
                      styles={{
                        marginVertical: 8,
                      }}
                    />
                    <RowComponent justify="space-between" styles={{}}>
                      <ButtonComponent
                        title="Hoat dong"
                        onPress={() => {
                          toggleFilter('hoatDong');
                          //console.log(filters.hoatDong);
                        }}
                        styles={[{width: '48%', height: 40}]}
                        bgrColor={colors.desc2}
                        boderRadius={6}
                        titleSize={15}
                        borderColor={filters.hoatDong ? colors.orange : ''}
                        boederWidth={filters.hoatDong ? 1 : 0}
                      />
                      <ButtonComponent
                        title="Ngung hoat dong"
                        onPress={() => toggleFilter('ngungHoatDong')}
                        styles={[{width: '48%', height: 40}]}
                        bgrColor={colors.desc2}
                        boderRadius={6}
                        titleSize={15}
                        borderColor={filters.ngungHoatDong ? colors.orange : ''}
                        boederWidth={filters.ngungHoatDong ? 1 : 0}
                      />
                    </RowComponent>
                  </SectionComponent>
                  <SectionComponent
                    styles={{
                      width: '100%',
                    }}>
                    <TitleComponent
                      text="Vi tri"
                      styles={{
                        marginVertical: 8,
                      }}
                    />
                    <RowComponent justify="space-between" styles={{}}>
                      <ButtonComponent
                        title="Quan ly"
                        onPress={() => toggleFilter('quanLy')}
                        styles={[{width: '48%', height: 40}]}
                        bgrColor={colors.desc2}
                        boderRadius={6}
                        titleSize={15}
                        borderColor={filters.quanLy ? colors.orange : ''}
                        boederWidth={filters.quanLy ? 1 : 0}
                      />
                      <ButtonComponent
                        title="Nhan vien thu ngan"
                        onPress={() => toggleFilter('thuNgan')}
                        styles={[{width: '48%', height: 40}]}
                        bgrColor={colors.desc2}
                        boderRadius={6}
                        titleSize={14}
                        borderColor={filters.thuNgan ? colors.orange : ''}
                        boederWidth={filters.thuNgan ? 1 : 0}
                      />
                    </RowComponent>
                    <View
                      style={{
                        marginVertical: 9,
                      }}>
                      <RowComponent justify="space-between" styles={{}}>
                        <ButtonComponent
                          title="Nhan vien phuc vu"
                          onPress={() => toggleFilter('phucVu')}
                          styles={[{width: '48%', height: 40}]}
                          bgrColor={colors.desc2}
                          boderRadius={6}
                          titleSize={14}
                          borderColor={filters.phucVu ? colors.orange : ''}
                          boederWidth={filters.phucVu ? 1 : 0}
                        />
                        <ButtonComponent
                          title="Dau bep"
                          onPress={() => toggleFilter('dauBep')}
                          styles={[{width: '48%', height: 40}]}
                          bgrColor={colors.desc2}
                          boderRadius={6}
                          titleSize={15}
                          borderColor={filters.dauBep ? colors.orange : ''}
                          boederWidth={filters.dauBep ? 1 : 0}
                        />
                      </RowComponent>
                    </View>
                  </SectionComponent>
                  <View
                    style={{
                      marginBottom: 10,
                      marginTop: 10,
                    }}>
                    <RowComponent justify="space-between" styles={{}}>
                      <ButtonComponent
                        title="Thiet lap lai"
                        onPress={resetFilters}
                        styles={[{width: '48%', height: 40}]}
                        bgrColor={colors.white}
                        boderRadius={2}
                        titleSize={15}
                        borderColor={colors.orange}
                        boederWidth={1}
                        titleColor={colors.orange}
                      />
                      <ButtonComponent
                        title="Ap dung"
                        onPress={() => {
                          applyFilters();
                          setIsVisibleDialog(false);
                        }}
                        styles={[{width: '48%', height: 40}]}
                        bgrColor={colors.orange}
                        boderRadius={6}
                        titleSize={15}
                        titleColor={colors.white}
                      />
                    </RowComponent>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
    </>
  );
};

export default NhanVienComponent;