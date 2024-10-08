import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); // Lấy kích thước màn hình để thiết lập chiều rộng cho modalView

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 50,
    height: 79,
    marginLeft: -5,
    marginRight: 20,
    alignItems: 'center',
  },
  backText: {
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formGroup: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
  },
  fr2:{
    borderTopColor:'gray',
    borderTopWidth:10,
    paddingLeft:10,

  },
  vtr: {
    borderWidth:2,
    marginRight:10,
    marginBottom:30,
    borderColor: 'gray',
    paddingLeft: 10,
  },
  formGroupRow: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',

  },
  formGroupRow1: {
    width:"80%",
    flexDirection: 'row',
    justifyContent:'flex-end'
  },
  formGroup1: {
    padding: 5,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'gray',
    paddingLeft: 10,
  },
  label: {
    marginTop:5,
    fontSize: 14,
    paddingLeft: 3,
  },
  input: {
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  statusText: {
    width: 120,
    textAlign: 'center',
    borderWidth: 1,
    padding: 4,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width, // Modal chiếm toàn bộ chiều rộng màn hình
  },
  item: {
    backgroundColor: "gray",
    margin: 2,
    padding: 4,
    width: '100%', // Đảm bảo mỗi item chiếm toàn bộ chiều rộng của modal
  },
  itemText: {
    color: "black",
    textAlign: "center",
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconStyle: {
    marginLeft:160,
    fontSize: 12,
  color:'red',
    padding: 10,
  },
  positionDisplay: {
    marginLeft: 10, // Adjust spacing as needed
    padding: 5,
    backgroundColor: '#f0f0f0', // Light background for visibility
    borderRadius: 5,
},

positionText: {
    fontSize: 16,
    color: 'black',
}
});