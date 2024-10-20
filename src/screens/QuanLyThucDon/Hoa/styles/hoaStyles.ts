import {StyleSheet, useWindowDimensions} from 'react-native';
import {colors} from '../contants/hoaColors';

//const {height, width} = useWindowDimensions();

export const hoaStyles = StyleSheet.create({
  container: {
    width: '93%',
    height: '95%',
    margin: 5,
    alignSelf: 'center',
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
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: 10,
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
