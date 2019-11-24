import React from "react";
import { Platform, TouchableHighlight, View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import CollectionScreen from "../screens/CollectionScreen";
import SearchScreen from "../screens/SearchScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import EditItemScreen from "../screens/EditItemScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import HeaderButton from "../components/HeaderButton";

import Color from "../constants/Color";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Color.blueColor : ""
  },
  headerTintColor: Platform.OS === "android" ? "white" : Color.accentColor
};

const MealsNavigator = createStackNavigator(
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

export default createAppContainer(MealsNavigator);
