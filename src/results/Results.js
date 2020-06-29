import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import { windowHeight, green, red } from "../constants";

export default function Results({
  isModelReady,
  image,
  predictions,
  renderPrediction,
  closeModal,
}) {
  return (
    <TouchableHighlight
      onPress={closeModal}
      style={styles.centeredView}
      activeOpacity={0.9}
    >
      <View style={styles.modalView}>
        {image && <Image source={image} style={styles.imageContainer} />}
        <View style={styles.predictionWrapper}>
          {isModelReady && image && (
            <Text style={styles.text}>
              Predictions: {predictions ? "" : "Predicting..."}
            </Text>
          )}
          {isModelReady &&
            predictions &&
            predictions.map((p) => renderPrediction(p))}
        </View>
        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: red }}
          onPress={closeModal}
        >
          <Text style={styles.textStyle}>Hide Modal</Text>
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  predictionWrapper: {
    marginVertical: windowHeight * 0.01,
    alignItems: "center",
  },
  text: {
    fontFamily: "Copperplate",
    color: "#333",
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 5,
  },
  // Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "darkgrey",
    borderColor: green,
    borderWidth: 3,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Copperplate",
    fontSize: 15,
  },
  imageContainer: {
    width: 250,
    height: 250,
  },
});
