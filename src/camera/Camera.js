import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { windowHeight, green } from "../constants";

export default function Camera() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CAMERA OPEN BOI!!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: green,
    fontSize: windowHeight * 0.05,
  },
});
