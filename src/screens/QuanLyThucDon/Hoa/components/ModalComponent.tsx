import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import React, {memo, ReactNode, useCallback} from 'react';
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
  stylesTitle?: StyleProp<TextStyle>;
  isClose?: boolean;
  borderRadius?: number;
  stylesContainer?: StyleProp<ViewStyle>;
}
const ModalComponent = (props: Props) => {
  const {
    children,
    visible,
    onClose,
    title,
    isClose,
    stylesTitle,
    borderRadius,
    stylesContainer,
  } = props;

  const handleClose = useCallback(() => {
    onClose && onClose();
  }, [onClose]);
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={[hoaStyles.modalContainer, stylesContainer]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                hoaStyles.modalContent,
                {
                  borderRadius: borderRadius ? borderRadius : 10,
                },
              ]}>
              {isClose && title ? (
                <RowComponent
                  activeOpacity={1}
                  justify="space-between"
                  styles={{width: '100%', paddingHorizontal: 4}}>
                  <SpaceComponent width={1} />
                  <TitleComponent
                    text={title ? title : ''}
                    size={19}
                    styles={[
                      {
                        paddingTop: 10,
                      },
                      stylesTitle,
                    ]}
                  />
                  <TouchableOpacity onPress={handleClose}>
                    <Icon name="close" size={18} />
                  </TouchableOpacity>
                </RowComponent>
              ) : !isClose && title ? (
                <TitleComponent
                  text={title ? title : ''}
                  size={20}
                  styles={[{paddingTop: 10}, stylesTitle]}
                  fontWeight="700"
                />
              ) : null}

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

export default React.memo(ModalComponent);
