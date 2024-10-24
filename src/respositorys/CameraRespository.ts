import { PermissionsAndroid, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const openCamera = async (): Promise<string | undefined> => {
  const hasCameraPermission = await requestCameraPermission();
  if (!hasCameraPermission) {
    Alert.alert('Lỗi', 'Ứng dụng cần quyền truy cập camera');
    return;
  }

  return new Promise((resolve, reject) => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          resolve(undefined); // Người dùng hủy không chụp ảnh
        } else if (response.errorCode) {
          console.error('Lỗi khi chụp ảnh:', response.errorMessage);
          reject(response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          resolve(uri); // Trả về URI của ảnh chụp
        } else {
          resolve(undefined);
        }
      },
    );
  });
};

export const openImageLibrary = (): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        resolve(undefined); // Người dùng hủy chọn ảnh
      } else if (response.errorCode) {
        console.error('Lỗi khi chọn ảnh:', response.errorMessage);
        reject(response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        resolve(uri); // Trả về URI của ảnh đã chọn
      } else {
        resolve(undefined);
      }
    });
  });
};
