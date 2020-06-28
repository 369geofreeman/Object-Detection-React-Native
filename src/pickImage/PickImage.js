import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { windowWidth, red, windowHeight, yellow } from "../constants";
import LottieView from "lottie-react-native";

export default function PickImage({ isModelReady, selectImage, image }) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/space-circle-2.json")}
        style={styles.lottieContainer}
        loop
        autoPlay
      />
      <TouchableOpacity
        style={styles.imageWrapper}
        onPress={isModelReady ? selectImage : undefined}
      >
        {image && <Image source={image} style={styles.imageContainer} />}
        {isModelReady ? (
          <View style={styles.textContainer}>
            <Text style={styles.transparentText}>Tap to choose image</Text>
            <Text style={styles.transparentText}>- OR -</Text>
            <Text style={styles.transparentText}>Open camera below</Text>
          </View>
        ) : (
          <Text style={styles.transparentText}>"Model Loading..."</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageWrapper: {
    width: 280,
    height: 280,
    padding: 10,
    marginTop: 40,
    marginBottom: 10,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 250,
    height: 250,
    position: "absolute",
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
  },
  textContainer: {
    marginTop: windowHeight * 0.05,
  },
  transparentText: {
    color: yellow,
    textAlign: "center",
    marginTop: windowHeight * 0.01,
    fontWeight: "800",
    fontSize: windowWidth * 0.06,
    shadowColor: "#fff",
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.643359375,
    shadowRadius: 11.7671875,
  },
  lottieContainer: {
    width: windowWidth * 0.98,
    height: windowWidth * 0.98,
    backgroundColor: "transparent",
    position: "absolute",
  },
});
