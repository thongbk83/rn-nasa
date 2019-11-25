import React from "react";
import { Provider } from "react-redux";

import store from "./store/store";
import NasaNavigator from "./navigation/Nagivator";

export default function App() {
  return (
    <Provider store={store}>
      <NasaNavigator></NasaNavigator>
    </Provider>
  );
}
