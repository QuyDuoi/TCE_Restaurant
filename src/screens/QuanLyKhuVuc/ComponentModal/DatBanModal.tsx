import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import ButtonComponent from '../../QuanLyThucDon/Hoa/components/ButtonComponent'; // Điều chỉnh đường dẫn import theo cấu trúc project của bạn
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors'; // Điều chỉnh đường dẫn import theo cấu trúc project của bạn
import InputComponent from '../../QuanLyThucDon/Hoa/components/InputComponent';
import {Ban, updateBanThunk} from '../../../store/BanSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {KhuVuc} from '../../../store/KhuVucSlice';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import TitleComponent from '../../QuanLyThucDon/Hoa/components/TitleComponent';
import SectionComponent from '../../QuanLyThucDon/Hoa/components/SectionComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';
import ModalDate from '../../QuanLyThucDon/Hoa/caLam/ModalDate';
import ModalTime from '../../QuanLyThucDon/Hoa/caLam/ModalTime';
import {formatTime} from '../../QuanLyThucDon/Hoa/utils/formatUtils';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onCloseParent: () => void;
  selectedBan: any;
}

const DatBanModal = (props: Props) => {
  const {isVisible, onClose, onCloseParent, selectedBan} = props;

  const [ghiChu, setGhiChu] = useState('ghichu');
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isVisibleModalDate, setIsVisibleModalDate] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isVisibleModalTime, setIsVisibleModalTime] = useState(false);
  const [time, setTime] = useState(new Date());

  //console.log(selectedBan._id)

  const dispatch = useDispatch();

  const handleConfirm = async () => {
    const datBanData = {
      ...selectedBan,
      ghiChu: ` Ghi chú thêm: ${ghiChu}`,
      trangThai: 'Đã đặt',
    };
    const result = await dispatch(
      updateBanThunk({
        id: selectedBan?._id as string,
        formData: datBanData as any,
      }) as any,
    );

    //console.log(result);

    if (result.type.endsWith('fulfilled')) {
      onClose();
      onCloseParent();
      ToastAndroid.show('Đặt bàn thành công', ToastAndroid.LONG);
    } else {
      ToastAndroid.show('Đặt bàn thất bại', ToastAndroid.LONG);
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
                <InputComponent
                  value={''}
                  onChangeText={() => {}}
                  type={'normal'}
                  styles={[styles.input, {}]}
                  placeholder={`${
                    selectedBan?.tenBan.length == 1
                      ? 'Ban: ' + selectedBan.tenBan
                      : selectedBan?.tenBan
                  } - ${selectedBan?.kv.tenKhuVuc}`}
                  numberOfLines={1}
                  readonly
                  flex={1}
                />
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
                    onPress={() => {
                      setIsVisibleModalDate(true);
                    }}
                  />
                </RowComponent>
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
            </SectionComponent>
            <SectionComponent>
              <InputComponent
                value={ghiChu}
                onChangeText={setGhiChu}
                placeholder="Ghi chú"
                styles={[styles.input2]}
                numberOfLines={4}
                type="normal"
              />
            </SectionComponent>

            <RowComponent justify="space-between">
              <ButtonComponent
                title="Xác nhận"
                onPress={handleConfirm}
                bgrColor={colors.orange}
                titleColor={colors.white}
                styles={styles.button}
              />
              <ButtonComponent
                title="Hủy"
                onPress={() => {
                  onClose();
                  setDate(new Date());
                  setTime(new Date());
                  setSelectedDate(new Date());
                  setSelectedTime(new Date());
                }}
                bgrColor={colors.gray}
                titleColor={colors.white}
                styles={styles.button}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
      <ModalDate
        visible={isVisibleModalDate}
        onClose={() => setIsVisibleModalDate(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onConfirm={() => {
          setDate(selectedDate);
        }}
      />
      <ModalTime
        visible={isVisibleModalTime}
        onClose={() => setIsVisibleModalTime(false)}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        onConfirm={() => {
          setTime(selectedTime);
        }}
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
    width: '80%',
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
});

export default DatBanModal;
