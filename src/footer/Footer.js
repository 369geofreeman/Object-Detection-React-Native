import React, { useEffect } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { windowWidth, windowHeight, red, green } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Footer({ toggleCamera, showBtn, isModelReady }) {
  const buttonAnimation = new Animated.Value(0);
  const cardShrink = new Animated.Value(1);

  useEffect(() => {
    animation();

    if (showBtn) cardAnimation();
    cardAnimateBack();
  }, [showBtn]);

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

  const cardAnimation = () => {
    Animated.timing(cardShrink, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const cardAnimateBack = () => {
    Animated.timing(cardShrink, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const btnScale = buttonAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.13, 1],
  });
  const cardTop = cardShrink.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -windowHeight * 0.3],
  });
  const cardBack = cardShrink.interpolate({
    inputRange: [0, 1],
    outputRange: [-windowHeight * 0.3, 0],
  });

  return (
    <Animated.View
      style={[styles.footer, { bottom: showBtn ? cardTop : cardBack }]}
    >
      {!showBtn && (
        <TouchableOpacity onPress={isModelReady ? toggleCamera : null}>
          <Animated.View style={{ transform: [{ scale: btnScale }] }}>
            <MaterialCommunityIcons
              name="circle-slice-8"
              size={windowWidth * 0.28}
              color={green}
              style={styles.icon}
            />
          </Animated.View>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: windowHeight * 0.2,
    backgroundColor: red,
    opacity: 0.6,
    alignItems: "center",
    borderTopRightRadius: windowWidth * 0.1,
    borderTopLeftRadius: windowWidth * 0.1,
    borderWidth: 4,
    borderTopColor: green,
    borderLeftColor: green,
    borderRightColor: green,
  },
  icon: {
    marginTop: windowHeight * 0.025,
    opacity: 0.8,
  },
});
