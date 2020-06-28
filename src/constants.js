import { Dimensions, LayoutAnimation } from "react-native";
const { width, height } = Dimensions.get("window");

// Sizes
export const windowWidth = width;
export const windowHeight = height;

// Colours
export const blue = "#06418C";
export const darkBlue = "#022E69";
export const yellow = "#FBFC39";
export const red = "#f34607";
export const green = "#3BF516";

// Animations
export const customLayoutAnimation = {
  duration: 300,
  create: {
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeIn,
  },
  update: {
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeIn,
  },
  delete: {
    duration: 500,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.keyboard,
  },
};
