import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.poweredBy}>Powered by:</Text>
      <Image
        source={require("../../assets/tensorflowLogo.png")}
        style={styles.tfLogo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 40,
  },
  poweredBy: {
    fontSize: 20,
    color: "#e69e34",
    marginBottom: 6,
    textAlign: "center",
  },
  tfLogo: {
    width: 125,
    height: 100,
  },
});
