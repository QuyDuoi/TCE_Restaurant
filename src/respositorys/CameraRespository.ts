import { PermissionsAndroid, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const requestCameraPermission = async (): Promise<boolean> => {
  let permissionGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);

  if (!permissionGranted) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );

      // Kiểm tra trạng thái quyền
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        permissionGranted = true;
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        Alert.alert('Lỗi', 'Bạn đã từ chối cấp quyền truy cập camera');
        permissionGranted = false;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Quyền bị từ chối vĩnh viễn',
          'Bạn đã chọn không hỏi lại. Vui lòng vào cài đặt để cấp quyền truy cập camera.',
        );
        permissionGranted = false;
      }
    } catch (err) {
      console.warn(err);
      permissionGranted = false;
    }
  }

  return permissionGranted;
};

export const openCamera = async (): Promise<string | undefined> => {
  const hasCameraPermission = await requestCameraPermission();
  if (!hasCameraPermission) {
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
