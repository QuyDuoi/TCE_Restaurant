import {Dimensions, StyleSheet, useWindowDimensions} from 'react-native';
import {colors} from '../contants/hoaColors';

const {width: MaxWidth, height: MaxHeight} = Dimensions.get('window');

export const hoaStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    margin: 5,
    alignSelf: 'center',
  },
  containerTopping: {
    width: MaxWidth * 0.98,
    height: '99%',
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    alignSelf: 'center',
  },
  indicator: {
    borderBottomWidth: 2,

    borderBottomColor: colors.text,
  },
  inputContainer: {
    backgroundColor: colors.desc,
    borderRadius: 10,
  },
  section: {
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  card: {
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '89%',
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 5,
  },
  tabViewContainer: {
    flex: 1,
    marginTop: 10,
  },
  tabViewScene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator2: {
    width: '100%',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5,
    borderColor: colors.desc2,
  },
});
