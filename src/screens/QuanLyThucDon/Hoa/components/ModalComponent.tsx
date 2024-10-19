import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import {hoaStyles} from '../styles/hoaStyles';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import TitleComponent from './TitleComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import SectionComponent from './SectionComponent';
interface Props {
  children: ReactNode;
  visible: boolean;
  onClose?: () => void;
  title?: string;
  stylesTitle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  isClose?: boolean;
}
const ModalComponent = (props: Props) => {
  const {children, visible, onClose, title, onPress, isClose, stylesTitle} =
    props;
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[hoaStyles.modalContainer]}>
          <TouchableWithoutFeedback>
            <View style={[hoaStyles.modalContent]}>
              {isClose ? (
                <RowComponent
                  activeOpacity={1}
                  justify="space-between"
                  styles={{width: '100%', paddingHorizontal: 4}}>
                  <SpaceComponent width={1} />
                  <TitleComponent
                    text={title ? title : ''}
                    size={19}
                    styles={[
                      stylesTitle,
                      {
                        paddingTop: 10,
                      },
                    ]}
                  />
                  <TouchableOpacity onPress={onClose}>
                    <Icon name="close" size={18} />
                  </TouchableOpacity>
                </RowComponent>
              ) : (
                <TitleComponent
                  text={title ? title : ''}
                  size={20}
                  styles={{paddingTop: 10}}
                />
              )}
              <SpaceComponent height={10} />
              <SectionComponent styles={{width: '100%'}}>
                {children}
              </SectionComponent>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalComponent;
