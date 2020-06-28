import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { windowHeight, windowWidth, green, blue } from "../constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function CameraView({ getImage, setCameraOpen }) {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const snap = async () => {
    if (cameraRef) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log("THE PHOTOS ARE HERE, MILDRED", photo);
      // getImage(photo);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef}>
        <View style={styles.cameraView}>
          <Ionicons
            name="ios-qr-scanner"
            size={windowWidth * 1.1}
            color={"#fff"}
            style={styles.icon}
          />
        </View>
      </Camera>
      <TouchableWithoutFeedback onPress={snap}>
        <MaterialCommunityIcons
          name="circle-slice-8"
          size={windowWidth * 0.28}
          color={"#fff"}
          style={styles.iconBtn}
        />
      </TouchableWithoutFeedback>

      <View style={styles.backBtn}>
        <TouchableWithoutFeedback onPress={setCameraOpen}>
          <Text>Back</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: windowHeight,
  },
  camera: {
    flex: 1,
  },
  cameraView: {
    position: "absolute",
    top: windowWidth * 0.35,
    left: windowWidth * 0.06,
  },
  icon: {
    opacity: 0.3,
  },
  iconBtn: {
    position: "absolute",
    bottom: windowHeight * 0.05,
    left: windowWidth * 0.356,
    zIndex: 10,
  },
  backBtn: {
    position: "absolute",
    bottom: windowHeight * 0.1,
    right: windowWidth * 0.05,
  },
});
