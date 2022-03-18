import {
  Button,
  Image,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
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
    console.log(pickerResult);
  };

  const openImageCapture = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert(permission.status);
    }

    const captureResult = await ImagePicker.launchCameraAsync();

    if (captureResult.cancelled) {
      alert("Cancelled camera capture");
    }

    setImage({ localUri: captureResult.uri });
  };

  const openShareDialogAsync = async () => {
    if (Platform.OS === "web") {
      alert("Browser does not support sharing");
      return;
    }

    await Sharing.shareAsync(image.localUri);
  };
  return (
    <View>
      <View style={styles.buttonGroup}>
        <Button title="Pick Image" onPress={openImagePickerAsync} />
        <Button title="Capture Image" onPress={openImageCapture} />
      </View>

      {image && (
        <View>
          <TouchableOpacity onPress={openShareDialogAsync}>
            <Image source={{ uri: image.localUri }} style={styles.thumbnail} />
          </TouchableOpacity>
        </View>
      )}
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
