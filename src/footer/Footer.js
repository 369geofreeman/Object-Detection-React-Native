import React, { useEffect } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  blue,
  windowWidth,
  windowHeight,
  red,
  yellow,
  darkBlue,
  green,
} from "../constants";

export default function Footer() {
  const buttonAnimation = new Animated.Value(0);

  useEffect(() => {
    animation();
  }, []);

  const animation = () => {
    Animated.loop(
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 2100,
        easing: Easing.easeIn,
        useNativeDriver: true,
      })
    ).start();
  };

  const btnScale = buttonAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.13, 1],
  });

  return (
    <View style={styles.footer}>
      <Animated.View style={{ transform: [{ scale: btnScale }] }}>
        <MaterialCommunityIcons
          name="circle-slice-8"
          size={windowWidth * 0.28}
          color={green}
          style={styles.icon}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: windowHeight * 0.2,
    backgroundColor: red,
    opacity: 0.6,
    alignItems: "center",
    borderTopRightRadius: windowWidth * 0.1,
    borderTopLeftRadius: windowWidth * 0.1,
  },
  icon: {
    marginTop: windowHeight * 0.025,
    zIndex: 1,
  },
});
