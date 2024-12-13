import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    container: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
      color: 'black'
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      marginVertical: 5,
    },
    required: {
      color: 'red',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    errorBorder: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      alignItems: 'center',
      marginTop: 15,
    },
    cancelButton: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 20,
      width: 90,
      alignItems: 'center',
    },
    cancelButtonText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 18,
    },
    confirmButton: {
      backgroundColor: '#ff7a45',
      borderRadius: 12,
      width: 130,
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    confirmButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16, // Khoảng cách dưới giữa các hàng
    },
    column: {
      flex: 1, // Chia đều không gian giữa các cột
      marginHorizontal: 8, // Khoảng cách ngang giữa các cột
    },
  });