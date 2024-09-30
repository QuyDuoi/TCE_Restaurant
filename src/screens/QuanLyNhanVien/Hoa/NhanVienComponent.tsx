import {
  View,
  Text,
  Image,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hoaStyles} from '../../QuanLyThucDon/Hoa/styles/hoaStyles';
import ButtonComponent from '../../QuanLyThucDon/Hoa/components/ButtonComponent';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import CardComponent from '../../QuanLyThucDon/Hoa/components/CardComponent';
import SectionComponent from '../../QuanLyThucDon/Hoa/components/SectionComponent';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import ItemNhanVien from '../../QuanLyThucDon/Hoa/lists/ItemNhanVien';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import TitleComponent from '../../QuanLyThucDon/Hoa/components/TitleComponent';
import InputComponent from '../../QuanLyThucDon/Hoa/components/InputComponent';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';

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
  const [isVisibleDialog, setIsVisibleDialog] = useState(false);

  const [nhanVienList, setNhanVienList] = useState<nhanVienModelTest[]>([
    {
      id: 1,
      nameNhanVien: 'Nguyen Van A',
      position: 'Quan ly',
      status: true,
      avatar:
        'https://i.pinimg.com/236x/8a/df/6d/8adf6d438e833a8423021c06510c9049.jpg',
      id_cuaHang: 1,
    },
    {
      id: 2,
      nameNhanVien: 'Nguyen Van B',
      position: 'Nhan vien phuc vu',
      status: true,
      avatar:
        'https://i.pinimg.com/236x/8a/df/6d/8adf6d438e833a8423021c06510c9049.jpg',
      id_cuaHang: 1,
    },
    {
      id: 3,
      nameNhanVien: 'Tran Thi C',
      position: 'Nhan vien phuc vu',
      status: false,
      avatar:
        'https://anhdephd.vn/wp-content/uploads/2022/05/hinh-anh-ngon-tay-giua.jpg',
      id_cuaHang: 1,
    },
    {
      id: 4,
      nameNhanVien: 'Bui Van D',
      position: 'Nhan vien thu ngan',
      status: false,
      avatar:
        'https://anhdephd.vn/wp-content/uploads/2022/05/hinh-anh-ngon-tay-giua.jpg',
      id_cuaHang: 3,
    },
    {
      id: 5,
      nameNhanVien: 'Nguyen Thi E',
      position: 'Dau bep',
      status: true,
      avatar:
        'https://anhdephd.vn/wp-content/uploads/2022/05/hinh-anh-ngon-tay-giua.jpg',
      id_cuaHang: 3,
    },
    {
      id: 6,
      nameNhanVien: 'Nguyen Van F',
      position: 'Dau bep',
      status: true,
      avatar:
        'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg',
      id_cuaHang: 3,
    },
    {
      id: 7,
      nameNhanVien: 'Nguyen Van G',
      position: 'Nhan vien phuc vu',
      status: true,
      avatar:
        'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg',
      id_cuaHang: 1,
    },
    {
      id: 8,
      nameNhanVien: 'Nguyen Van H',
      position: 'Nhan vien thu ngan',
      status: true,
      avatar:
        'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg',
      id_cuaHang: 1,
    },
  ]);

  const [filters, setFilters] = useState<FiltersModelTest>(defaultFilters);
  const [searchQuery, setSearchQuery] = useState('');

  const [filterNhanVienList, setFilterNhanVienList] = useState<
    nhanVienModelTest[]
  >([]);

  useEffect(() => {
    setFilterNhanVienList(nhanVienList);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery]);

  const applyFilters = () => {
    //chon nhieu tieu chi
    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    //search
    let filteredResult = nhanVienList.filter(nv =>
      nv.nameNhanVien.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    //console.log(filteredResult);

    if (activeFilters.length === 0) {
      setFilterNhanVienList(filteredResult);
      return;
    }

    //ket hop
    if (activeFilters.length > 0) {
      //so sanh
      filteredResult = filteredResult.filter(nv => {
        const statusFilter =
          (!filters.hoatDong && !filters.ngungHoatDong) ||
          (filters.hoatDong && nv.status) ||
          (filters.ngungHoatDong && !nv.status);

        //console.log(statusFilter);

        const positionFilter =
          (!filters.quanLy &&
            !filters.thuNgan &&
            !filters.phucVu &&
            !filters.dauBep) ||
          (filters.quanLy && nv.position === 'Quan ly') ||
          (filters.thuNgan && nv.position === 'Nhan vien thu ngan') ||
          (filters.phucVu && nv.position === 'Nhan vien phuc vu') ||
          (filters.dauBep && nv.position === 'Dau bep');

        //console.log(positionFilter);

        return statusFilter && positionFilter;
      });
      setFilterNhanVienList(filteredResult);
    }
  };

  const toggleFilter = (filterName: keyof typeof filters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  //const filterNhanVien = nhanVienList.filter(item => item.id_cuaHang === 1);

  const renderItem = ({item}: {item: nhanVienModelTest}) => {
    return (
      <View>
        {nhanVienList.length > 0 ? (
          <ItemNhanVien
            onPress={() => console.log(item.id)}
            nameNhanVien={item.nameNhanVien}
            position={item.position}
            status={item.status}
            colorStatus={item.status ? '#E7F4FF' : '#FFD2CD'}
            avatar={item.avatar}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TitleComponent text="Khong co nhan vien nao" />
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <View style={[hoaStyles.containerTopping, {}]}>
        <View style={{}}>
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
            onPress={() => console.log('them moi')}
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
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TitleComponent
                text="Khong tim thay nhan vien "
                color={colors.desc}
              />
            </View>
          )}
        </SectionComponent>
      </View>

      <Modal visible={isVisibleDialog} transparent animationType="fade">
        <TouchableWithoutFeedback
          onPress={() => {
            setIsVisibleDialog(false);
          }}>
          <View style={[hoaStyles.modelContainer]}>
            <TouchableWithoutFeedback>
              <View style={[hoaStyles.modelContent]}>
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
