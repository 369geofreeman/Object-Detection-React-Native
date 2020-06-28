import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

export default function Header({ isTfReady, isModelReady }) {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.text}>
        TFJS ready? {isTfReady ? <Text>✅</Text> : ""}
      </Text>
      <View style={styles.loadingModelContainer}>
        <Text style={styles.text}>Model ready? </Text>
        {isModelReady ? (
          <Text style={styles.text}>✅</Text>
        ) : (
          <ActivityIndicator size="small" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: 80,
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
  loadingModelContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});
