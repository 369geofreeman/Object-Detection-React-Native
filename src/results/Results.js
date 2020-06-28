import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Results({
  isModelReady,
  image,
  predictions,
  renderPrediction,
}) {
  return (
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
  );
}

const styles = StyleSheet.create({
  predictionWrapper: {
    height: 100,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
});
