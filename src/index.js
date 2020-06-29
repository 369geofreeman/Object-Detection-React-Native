import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  LayoutAnimation,
  Modal,
} from "react-native";
import { customLayoutAnimation, windowWidth } from "./constants";
import * as ImagePicker from "expo-image-picker";
import * as tf from "@tensorflow/tfjs";
import { fetch } from "@tensorflow/tfjs-react-native";
import * as mobilenet from "@tensorflow-models/mobilenet";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as jpeg from "jpeg-js";
// Components
import Header from "./header/Header";
import PickImage from "./pickImage/PickImage";
import CameraView from "./camera/CameraView";
import Results from "./results/Results";
import Footer from "./footer/Footer";

const AppMain = () => {
  const [isTfReady, setIsTfReady] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [mobileModel, setMobileModel] = useState(null);
  const [image, setImage] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(customLayoutAnimation);

  useEffect(() => {
    (async () => {
      await tf.ready();
      setIsTfReady(true);
      const model = await mobilenet.load();
      await setMobileModel(model);
      setIsModelReady(true);
    })();
    getPermissionAsync();
    if (image) setModalVisible(true);
  }, [
    tf,
    mobilenet,
    setIsTfReady,
    setMobileModel,
    setIsModelReady,
    getPermissionAsync,
    setModalVisible,
    predictions,
  ]);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const imageToTensor = (rawImageData) => {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];

      offset += 4;
    }

    return tf.tensor3d(buffer, [height, width, 3]);
  };

  const classifyImage = async (source) => {
    try {
      const imageAssetPath = await Image.resolveAssetSource(source);
      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
      const rawImageData = await response.arrayBuffer();
      const imageTensor = await imageToTensor(rawImageData);
      const predictions = await mobileModel.classify(imageTensor);
      setPredictions(predictions);
    } catch (error) {
      console.log(error);
    }
  };

  const selectImage = async () => {
    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!response.cancelled) {
        const source = { uri: response.uri };
        await setImage(source);
        classifyImage(source);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const photoPrediction = async (source) => {
    await setImage(source);
    await setCameraOpen(true);
    setCameraOpen(false);
    classifyImage(source);
  };

  const renderPrediction = (prediction) => {
    return (
      <Text key={prediction.className} style={styles.text}>
        {prediction.className}
      </Text>
    );
  };

  const closeModal = async () => {
    await setPredictions(null);
    await setImage(null);
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.formContainer}>
        {cameraOpen && (
          <View style={styles.screenSwipe}>
            <CameraView
              setImage={(source) => photoPrediction(source)}
              setCameraOpen={() => setCameraOpen(!cameraOpen)}
            />
          </View>
        )}
        <View style={styles.screenSwipe}>
          <Header />
          <PickImage
            isModelReady={isModelReady}
            selectImage={selectImage}
            image={image}
          />
        </View>
      </View>

      <Footer
        toggleCamera={() => setCameraOpen(!cameraOpen)}
        showBtn={cameraOpen}
        isModelReady={isModelReady}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Results
          isModelReady={isModelReady}
          image={image}
          predictions={predictions}
          renderPrediction={renderPrediction}
          closeModal={closeModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  formContainer: {
    flexDirection: "row",
    width: windowWidth,
  },
  screenSwipe: {
    width: windowWidth,
  },
  text: {
    fontFamily: "Copperplate",
    fontSize: 20,
  },
});

export default AppMain;
