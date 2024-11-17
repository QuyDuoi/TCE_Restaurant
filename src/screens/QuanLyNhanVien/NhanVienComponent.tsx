import {
  View,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import ButtonComponent from '../QuanLyThucDon/Hoa/components/ButtonComponent';
import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';
import SectionComponent from '../QuanLyThucDon/Hoa/components/SectionComponent';
import TitleComponent from '../QuanLyThucDon/Hoa/components/TitleComponent';
import InputComponent from '../QuanLyThucDon/Hoa/components/InputComponent';
import SpaceComponent from '../QuanLyThucDon/Hoa/components/SpaceComponent';
import ItemNhanVien from './ItemNhanVien';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchNhanViens, NhanVienSlice} from '../../store/Slices/NhanVienSlice';
import {RootState} from '../../store/store';
import type {AppDispatch} from '../../store/store';
import {applyFilters} from './hamTimKiem';
import {IPV4} from '../../services/api';
import {fetchDanhMucs} from '../../store/Slices/DanhMucSlice';
import { fetchDanhMucVaMonAn } from '../../store/Thunks/danhMucThunks';

export interface FiltersModelTest {
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

const NhanVienComponent = props => {
  const navigation = useNavigation();
  const [isVisibleDialog, setIsVisibleDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FiltersModelTest>(defaultFilters);
  const [filterNhanVienList, setFilterNhanVienList] = useState<NhanVienSlice[]>(
    [],
  );
  const dispatch = useDispatch<AppDispatch>();
  const dsNhanVien = useSelector(
    (state: RootState) => state.nhanVien.nhanViens,
  );
  const status = useSelector((state: RootState) => state.nhanVien.status);
  
  // **Lấy dữ liệu nhân viên từ API**
  // Sử dụng useEffect để cập nhật danh sách nhân viên khi Redux store thay đổi
  useEffect(() => {
    const id_NhaHang = '66fab50fa28ec489c7137537';
    if (status === 'idle') {
      dispatch(fetchNhanViens());
      dispatch(fetchDanhMucVaMonAn(id_NhaHang));
      setIsLoading(true);
    } else if (status === 'succeeded') {
      setFilterNhanVienList(dsNhanVien || []); // Cập nhật danh sách nhân viên từ store
      setIsLoading(false);
    } else if (status === 'failed') {
      setIsLoading(false);
    }
  }, [dispatch, status, dsNhanVien]);

  // Reload dữ liệu mỗi khi màn hình được focus lại
  useFocusEffect(
    React.useCallback(() => {
      if (status !== 'loading') {
        dispatch(fetchNhanViens()); // Fetch lại danh sách nhân viên khi màn hình được focus lại
      }
    }, [dispatch]),
  );

  // Cập nhật danh sách nhân viên khi tìm kiếm hoặc bộ lọc thay đổi
  useEffect(() => {
    const filteredNhanVienList = applyFilters(
      dsNhanVien || [],
      searchQuery,
      filters,
    ); // Đảm bảo dsNhanVien không undefined
    setFilterNhanVienList(filteredNhanVienList);
  }, [searchQuery, filters, dsNhanVien]);

  const toggleFilter = (filterName: keyof typeof filters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const renderItem = ({item}: {item: NhanVienSlice}) => {
    // Kiểm tra và thay thế localhost bằng địa chỉ IP hợp lệ
    const employeeImage = item.hinhAnh
      ? item.hinhAnh.replace('localhost', IPV4) // Đổi 192.168.x.x thành IP của server của bạn
      : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';

    return (
      <ItemNhanVien
        onPress={() =>
          props.navigation.navigate('EmployeeDetails', {nhanVien: item})
        }
        nameNhanVien={item.hoTen}
        position={item.vaiTro}
        status={item.trangThai}
        colorStatus={item.trangThai ? '#E7F4FF' : '#FFD2CD'}
        avatar={employeeImage} // Truyền đúng trường đại diện cho avatar
      />
    );
  };

  if (isLoading) {
    return (
      <View
        style={[
          hoaStyles.containerTopping,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
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
            onChangeText={text => setSearchQuery(text)}
            elevation={10}
            allowClear
            styleIconX={{alignSelf: 'center', marginRight: 5}}
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
            onPress={() => props.navigation.navigate('AddEmployee')}
            bgrColor="#5664F5"
            styles={{width: '52%', height: 48}}
            boderRadius={8}
            titleColor="white"
            titleSize={16.5}
          />
          <ButtonComponent
            title="Lọc"
            onPress={() => setIsVisibleDialog(true)}
            styles={{width: '20%', height: 47}}
            boderRadius={4}
            titleSize={18}
            evalation={15}
          />
        </RowComponent>
        <SectionComponent styles={{flex: 1}}>
          {filterNhanVienList.length > 0 ? (
            <FlatList
              data={filterNhanVienList}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TitleComponent
                text="Không tìm thấy nhân viên"
                color={colors.desc}
              />
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
                  text="Lọc danh sách"
                  styles={{marginVertical: 5}}
                  size={19}
                />
                <SectionComponent
                  styles={{
                    width: '100%',
                  }}>
                  <TitleComponent
                    text="Trạng thái"
                    styles={{
                      marginVertical: 8,
                    }}
                  />
                  <RowComponent justify="space-between" styles={{}}>
                    <ButtonComponent
                      title="Hoạt động"
                      onPress={() => toggleFilter('hoatDong')}
                      styles={[{width: '48%', height: 40}]}
                      bgrColor={colors.desc2}
                      boderRadius={6}
                      titleSize={15}
                      borderColor={filters.hoatDong ? colors.orange : ''}
                      boederWidth={filters.hoatDong ? 1 : 0}
                    />
                    <ButtonComponent
                      title="Ngưng hoạt động"
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
                    text="Vị trí"
                    styles={{
                      marginVertical: 8,
                    }}
                  />
                  <RowComponent justify="space-between" styles={{}}>
                    <ButtonComponent
                      title="Quản lý"
                      onPress={() => toggleFilter('quanLy')}
                      styles={[{width: '48%', height: 40}]}
                      bgrColor={colors.desc2}
                      boderRadius={6}
                      titleSize={15}
                      borderColor={filters.quanLy ? colors.orange : ''}
                      boederWidth={filters.quanLy ? 1 : 0}
                    />
                    <ButtonComponent
                      title="Nhân viên thu ngân"
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
                        title="Nhân viên phục vụ"
                        onPress={() => toggleFilter('phucVu')}
                        styles={[{width: '48%', height: 40}]}
                        bgrColor={colors.desc2}
                        boderRadius={6}
                        titleSize={14}
                        borderColor={filters.phucVu ? colors.orange : ''}
                        boederWidth={filters.phucVu ? 1 : 0}
                      />
                      <ButtonComponent
                        title="Đầu bếp"
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
                      title="Thiết lập lại"
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
                      title="Áp dụng"
                      onPress={() => {
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
