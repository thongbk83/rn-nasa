import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { useScreens } from "react-native-screens";

import store from "./store/store";
import MealsNavigator from "./navigation/Nagivator";

export default function App() {
  return (
    <Provider store={store}>
      <MealsNavigator></MealsNavigator>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
