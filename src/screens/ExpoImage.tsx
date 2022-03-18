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

export default function ExpoImage() {
  const [image, setImage] = useState(null);


  // handle picking image from gallery 
  const openImagePickerAsync = async () => {
    //   request permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // permission denied
    if (!permission.granted) {
      alert(permission.status);
      return;
    }

    // open gallery
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    // nothing selected from gallery
    if (pickerResult.cancelled) {
      alert("Cancelled image picker");
    }

    // selected from gallery
    setImage({ localUri: pickerResult.uri });
  };


  // handling clicking image from camera 
  const openImageCapture = async () => {
    // request camera access permission 
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    // permission denied 
    if (!permission.granted) {
      alert(permission.status);
    }

    // capture image from camera 

    const captureResult = await ImagePicker.launchCameraAsync();

    if (captureResult.cancelled) {
      alert("Cancelled camera capture");
    }

    setImage({ localUri: captureResult.uri });
  };


  // handling image sharing 
  const openShareDialogAsync = async () => {

    // web does not support sharing 
    if (Platform.OS === "web") {
      alert("Browser does not support sharing");
      return;
    }
    // open share dialog 

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
