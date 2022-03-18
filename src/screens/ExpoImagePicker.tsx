import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
export default function ExpoImagePicker() {
  const [image, setImage] = useState(null);

  const openImagePickerAsync = async () => {
    //   request permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert(permission.status);
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) {
      alert("Cancelled image picker");
    }
    setImage({ localUri: pickerResult.uri });
  };

  const openImageCapture = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert(permission.status);
    }

    const captureResult = await ImagePicker.launchCameraAsync()

    if(captureResult.cancelled){
        alert("Cancelled camera capture")
    }

    setImage({localUri:captureResult.uri})
  };
  return (
    <View>
      <View style={styles.buttonGroup}>
        <Button title="Pick Image" onPress={openImagePickerAsync} />
        <Button title="Capture Image" onPress={openImageCapture} />
      </View>
      <View>
        {image && (
          <Image source={{ uri: image.localUri }} style={styles.thumbnail} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* Other styles hidden to keep the example brief... */
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
