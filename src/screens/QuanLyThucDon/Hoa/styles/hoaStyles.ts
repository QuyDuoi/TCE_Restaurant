import {StyleSheet, useWindowDimensions} from 'react-native';
import {colors} from '../contants/hoaColors';

//const {height, width} = useWindowDimensions();

export const hoaStyles = StyleSheet.create({
  container: {
    width: '93%',
    height: '95%',
    margin: 5,
  },
  containerTopping: {
    width: '98%',
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
    width: 70,
    height: 55,
    borderRadius: 10,
  },
  indicator: {
    borderBottomWidth: 2,

    borderBottomColor: colors.text,
  },
  inputContainer: {
    backgroundColor: colors.desc,
    borderRadius: 10,
  },
});
