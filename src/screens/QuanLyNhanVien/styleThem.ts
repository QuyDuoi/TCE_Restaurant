import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      right: 15,
    },
    backButton: {
      marginRight: 8,
      left: -100,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      fontWeight: '700',
      color: 'black',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    dropdown: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    imageContainer: {
      borderColor: '#ccc',
      borderRadius: 5,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      height: 100,
      width: '100%',
    },
    imageContainer1: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      width: '15%',
    },
    selectedImage: {
      width: '100%',
      height: '100%',
    },
    uploadStatus: {
      textAlign: 'center',
      fontWeight: 'bold',
      height: '90%',
      width: '90%',
      fontSize: 18,
    },
    saveButton: {
      backgroundColor: '#007bff',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 30,
    },
    saveButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Đây là phần làm nền mờ
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    modalBackground: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalButton: {
      padding: 15,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      width: '100%',
      alignItems: 'center',
    },
    textButImage: {
      fontSize: 18,
    },
    imageViewContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 300,
      height: 300,
    },
    errorBorder: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
  });