import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import { createAppContainer } from "react-navigation";
import CollectionScreen from "../screens/CollectionScreen";
import SearchScreen from "../screens/SearchScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import EditItemScreen from "../screens/EditItemScreen";
import FavoriteScreen from "../screens/FavoriteScreen";

import Color from "../constants/Color";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Color.blueColor : ""
  },
  headerTintColor: Platform.OS === "android" ? "white" : Color.accentColor
};

const NasaNavigator = createStackNavigator(
  {
    Collection: {
      screen: CollectionScreen,
      navigationOptions: {
        headerTitle: "Collection"
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        headerTitle: "Search"
      }
    },
    ItemDetail: {
      screen: ItemDetailScreen
    },
    EditItem: {
      screen: EditItemScreen,
      navigationOptions: {
        headerTitle: "Edit"
      }
    },
    Favorite: {
      screen: FavoriteScreen,
      navigationOptions: {
        headerTitle: "My Favorite"
      }
    }
  },
  {
    defaultNavigationOptions: defaultNavigationOptions
  }
);

export default createAppContainer(NasaNavigator);
