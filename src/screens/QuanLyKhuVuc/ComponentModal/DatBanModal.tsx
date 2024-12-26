import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import ButtonComponent from '../../QuanLyThucDon/Hoa/components/ButtonComponent'; // Điều chỉnh đường dẫn import theo cấu trúc project của bạn
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors'; // Điều chỉnh đường dẫn import theo cấu trúc project của bạn
import InputComponent from '../../QuanLyThucDon/Hoa/components/InputComponent';
import {capNhatBanThunk} from '../../../store/Thunks/banThunks';
import {useDispatch} from 'react-redux';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import TitleComponent from '../../QuanLyThucDon/Hoa/components/TitleComponent';
import SectionComponent from '../../QuanLyThucDon/Hoa/components/SectionComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';
import ModalTime from '../../QuanLyCaLam/ModalTime';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import LoadingModal from 'react-native-loading-modal';
import {useToast} from '../../../customcomponent/CustomToast';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onCloseParent: () => void;
  selectedBan?: any;
}

const DatBanModal = (props: Props) => {
  const {isVisible, onClose, onCloseParent, selectedBan} = props;

  const [ghiChu, setGhiChu] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isVisibleModalTime, setIsVisibleModalTime] = useState(false);
  const [time, setTime] = useState(new Date());
  const [hoTen, setHoTen] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  // Thêm các state để quản lý thông báo lỗi
  const [hoTenError, setHoTenError] = useState('');
  const [soDienThoaiError, setSoDienThoaiError] = useState('');
  const [timeError, setTimeError] = useState('');
  const {showToast} = useToast();

  const dispatch = useDispatch();

  const resetDuLieu = () => {
    setDate(new Date());
    setTime(new Date());
    setSelectedTime(new Date());
    setHoTenError('');
    setSoDienThoaiError('');
    setTimeError('');
    setHoTen('');
    setSoDienThoai('');
    setGhiChu('');
  };

  // Hàm kiểm tra số điện thoại hợp lệ
  const isPhoneNumberValid = (phone: string) => {
    const regex = /^(03|05|07|08|09)\d{8}$/;
    return regex.test(phone);
  };

  // Hàm kiểm tra giờ đặt bàn có phải là thời gian trong tương lai không
  const isValidTime = (selectedTime: Date) => {
    const now = new Date();
    return selectedTime >= now;
  };

  // Xử lý xác nhận đặt bàn
  const handleConfirmDatBan = async () => {
    let valid = true;

    // Reset tất cả các thông báo lỗi
    setHoTenError('');
    setSoDienThoaiError('');
    setTimeError('');

    // Kiểm tra họ tên
    if (hoTen.trim() === '') {
      setHoTenError('Vui lòng nhập họ tên khách!');
      valid = false;
    }

    // Kiểm tra số điện thoại
    if (!isPhoneNumberValid(soDienThoai)) {
      setSoDienThoaiError('Số điện thoại không hợp lệ!');
      valid = false;
    }

    // Kiểm tra thời gian đặt bàn
    if (!isValidTime(time)) {
      setTimeError('Giờ đặt bàn phải là thời gian trong tương lai!');
      valid = false;
    }

    if (!valid) {
      return; // Dừng lại nếu có lỗi
    }

    setIsLoadingModal(true);
    const datBanData = {
      id_khuVuc: selectedBan?.kv?._id,
      ghiChu: `${hoTen} - ${soDienThoai} - ${date.toLocaleDateString(
        'vi-VN',
      )} - ${time.toLocaleTimeString('vi-VN').slice(0, 5)} - ${ghiChu}`,
      trangThai: 'Đã đặt',
    };
    const result = await dispatch(
      capNhatBanThunk({
        id: selectedBan?._id,
        ban: datBanData as any,
      }) as any,
    );

    if (result.type.endsWith('fulfilled')) {
      setIsLoadingModal(false);
      showToast('check', 'Đặt bàn thành công.', '#D1E4B3', 2000);
      onClose();
      onCloseParent();
      resetDuLieu();
    } else {
      setTimeout(() => {
        setIsLoadingModal(false);
      }, 2000);
    }
  };

  return (
    <>
      <Modal visible={isVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Đặt bàn</Text>
            <SectionComponent>
              <RowComponent justify="space-between" styles={{}}>
                <View style={{width: '45%', justifyContent: 'center'}}>
                  <TitleComponent text="Vị trí bàn" styles={[styles.text]} />
                </View>
                {selectedBan ? (
                  <InputComponent
                    value={``}
                    onChangeText={() => {}}
                    type={'normal'}
                    styles={[styles.input, {}]}
                    placeholder={`${
                      selectedBan.tenBan.length === 1
                        ? 'Bàn ' + selectedBan.tenBan
                        : selectedBan.tenBan
                    } - ${selectedBan.kv ? selectedBan.kv.tenKhuVuc : '2'}`}
                    numberOfLines={1}
                    readonly
                    flex={1}
                  />
                ) : null}
              </RowComponent>
            </SectionComponent>
            <SectionComponent>
              <TitleComponent text="Thời gian đặt" />
              <SectionComponent styles={{}}>
                <RowComponent styles={{}}>
                  <View style={{width: '50%', justifyContent: 'center'}}>
                    <TitleComponent
                      text="Ngày đặt bàn"
                      styles={[styles.text2]}
                      size={15}
                    />
                  </View>
                  <InputComponent
                    value={date.toLocaleDateString('vi-VN') ?? new Date()}
                    onChangeText={() => {}}
                    type={'normal'}
                    styles={[styles.input3, {}]}
                    placeholder={``}
                    numberOfLines={1}
                    readonly
                    flex={1}
                    rightIcon={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{
                          alignSelf: 'center',
                          marginRight: 3,
                          color: colors.orange,
                        }}
                      />
                    }
                  />
                </RowComponent>
                {/** Hiển thị thông báo lỗi ngày đặt bàn nếu cần */}
                {/* Nếu có yêu cầu kiểm tra ngày, bạn có thể thêm thông báo lỗi ở đây */}

                <SpaceComponent height={10} />
                <RowComponent>
                  <View style={{width: '50%', justifyContent: 'center'}}>
                    <TitleComponent
                      text="Giờ đặt bàn"
                      styles={[styles.text2]}
                      size={15}
                    />
                  </View>
                  <InputComponent
                    value={
                      time
                        .toLocaleTimeString('vi-VN')
                        .split(':')
                        .slice(0, 2)
                        .join(':') ?? new Date().getTime()
                    }
                    onChangeText={() => {}}
                    type={'normal'}
                    styles={[styles.input3, {}]}
                    placeholder={``}
                    numberOfLines={1}
                    readonly
                    flex={1}
                    rightIcon={
                      <Icon
                        name="clock-o"
                        size={18}
                        style={{
                          alignSelf: 'center',
                          marginRight: 3,
                          color: colors.orange,
                        }}
                      />
                    }
                    onPress={() => {
                      setIsVisibleModalTime(true);
                    }}
                  />
                </RowComponent>
              </SectionComponent>
              {timeError !== '' && (
                <Text style={styles.errorText}>{timeError}</Text>
              )}
            </SectionComponent>
            <SpaceComponent height={6} />
            <RowComponent styles={{width: '100%'}}>
              <View style={styles.title}>
                <TextComponent
                  text="Họ tên"
                  size={15}
                  fontWeight="600"
                  color={colors.black}
                />
              </View>
              <View style={styles.inputTitle}>
                <InputComponent
                  type={'normal'}
                  placeholder={`Nhập họ tên khách`}
                  value={hoTen}
                  onChangeText={setHoTen}
                  styles={{
                    paddingVertical: 0,
                    height: 33,
                  }}
                  fontSize={14}
                />
              </View>
            </RowComponent>
            {hoTenError !== '' && (
              <Text style={styles.errorText}>{hoTenError}</Text>
            )}
            {hoTenError === '' && <SpaceComponent height={10} />}
            <RowComponent styles={{width: '100%'}}>
              <View style={styles.title}>
                <TextComponent
                  text="Số điện thoại"
                  size={15}
                  fontWeight="600"
                  color={colors.black}
                />
              </View>
              <View style={styles.inputTitle}>
                <InputComponent
                  type={'normal'}
                  placeholder={`Số liên hệ`}
                  value={soDienThoai}
                  onChangeText={setSoDienThoai}
                  styles={{
                    paddingVertical: 0,
                    height: 33,
                  }}
                  fontSize={14}
                />
              </View>
            </RowComponent>
            {soDienThoaiError !== '' && (
              <Text style={styles.errorText}>{soDienThoaiError}</Text>
            )}
            {soDienThoaiError === '' && <SpaceComponent height={10} />}

            <InputComponent
              value={ghiChu}
              onChangeText={setGhiChu}
              placeholder="Số lượng khách, cọc tiền, yêu cầu riêng ..."
              styles={[styles.input2]}
              numberOfLines={4}
              type="normal"
            />

            <RowComponent justify="space-between">
              <ButtonComponent
                title="Xác nhận"
                onPress={handleConfirmDatBan}
                bgrColor={colors.orange}
                titleColor={colors.white}
                styles={styles.button}
              />
              <ButtonComponent
                title="Hủy"
                onPress={() => {
                  onClose();
                  resetDuLieu();
                }}
                bgrColor={colors.gray}
                titleColor={colors.white}
                styles={styles.button}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
      <ModalTime
        visible={isVisibleModalTime}
        onClose={() => setIsVisibleModalTime(false)}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        onConfirm={() => {
          setTime(selectedTime);
        }}
      />
      <LoadingModal
        modalVisible={isLoadingModal}
        title="Đang xử lý ..."
        color={colors.orange}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '88%',
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    textAlign: 'left',
  },
  text2: {
    textAlign: 'left',
    color: colors.desc,
  },
  input: {
    borderColor: colors.desc2,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 0,
    textAlign: 'center',
  },
  input2: {
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.gray,
    textAlignVertical: 'top',
    marginTop: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  input3: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    paddingVertical: 1,
  },

  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 2,
  },
  title: {
    width: '30%',
    borderWidth: 1,
    borderTopStartRadius: 5,
    borderBottomLeftRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: colors.desc2,
    paddingLeft: 5,
  },
  inputTitle: {
    flex: 1,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    borderColor: colors.desc2,
    backgroundColor: colors.white,
    padding: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
    marginLeft: '30%', // Đảm bảo thông báo lỗi nằm dưới trường nhập liệu
  },
});

export default DatBanModal;
