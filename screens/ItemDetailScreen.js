import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  Alert
} from "react-native";
import { useDispatch } from "react-redux";
import { Video } from "expo-av";

import BottomNavigation, {
  FullTab
} from "react-native-material-bottom-navigation";

import { Ionicons } from "@expo/vector-icons";

import {
  updateImageOnCollection,
  deleteImageOnCollection,
  addToCollection
} from "../store/actions/collection";

const ItemDetailScreen = props => {
  const itemDetail = props.navigation.getParam("itemDetail");
  const isCollection = props.navigation.getParam("isCollection");
  const dispatch = new useDispatch();

  const tabsCollection = [
    {
      key: "like",
      icon: "ios-heart",
      label: "Like",
      barColor: "#388E3C",
      color: itemDetail.like ? "red" : "white",
      pressColor: "rgba(255, 255, 255, 0.16)"
    },
    {
      key: "delete",
      icon: "ios-trash",
      label: "Delete",
      barColor: "#B71C1C",
      color: "white",
      pressColor: "rgba(255, 255, 255, 0.16)"
    },
    {
      key: "edit",
      icon: "ios-paper",
      label: "Edit",
      barColor: "#E64A19",
      color: "white",
      pressColor: "rgba(255, 255, 255, 0.16)"
    }
  ];

  const tabsSearch = [
    {
      key: "addToCollection",
      icon: "ios-add",
      label: "Add To Collection",
      barColor: "#388E3C",
      color: "white",
      pressColor: "rgba(255, 255, 255, 0.16)"
    }
  ];

  const tabs = isCollection ? tabsCollection : tabsSearch;

  const renderMedia = () => {
    if (itemDetail.mediaType === "image") {
      return (
        <Image source={{ uri: itemDetail.linkFile }} style={styles.image} />
      );
    }
    if (itemDetail.mediaType === "video") {
      return (
        <Video
          source={{ uri: itemDetail.linkFile }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: "100%", height: 300 }}
        />
      );
    }
  };

  const renderIcon = (icon, color) => ({ isActive }) => (
    <Ionicons size={24} color={color} name={icon} />
  );

  const renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={renderIcon(tab.icon, tab.color)}
    />
  );

  const onClickIconHandler = key => {
    if (key === "like") {
      itemDetail.like = !itemDetail.like;
      dispatch(updateImageOnCollection(itemDetail.id, itemDetail));
      alertToNotify();
    } else if (key === "delete") {
      Alert.alert("Info", "Are you sure to remove it ?", [
        {
          text: "Ok",
          style: "destructive",
          onPress: () => {
            dispatch(deleteImageOnCollection(itemDetail.id));
            alertToNotify();
          }
        },
        { text: "Cancel", style: "cancel" }
      ]);
    } else if (key === "addToCollection") {
      dispatch(addToCollection(itemDetail));
      alertToNotify();
    } else if (key === "edit") {
      props.navigation.navigate({
        routeName: "EditItem",
        params: {
          itemDetail: itemDetail
        }
      });
    }
  };

  const alertToNotify = () => {
    Alert.alert("Info", "update success and go back to collection page", [
      {
        text: "Ok",
        style: "destructive",
        onPress: () =>
          props.navigation.navigate({
            routeName: "Collection"
          })
      }
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.scrollview]}>
        {renderMedia()}
        <Text style={styles.title}>{itemDetail.title}</Text>
        <Text style={styles.details}>{itemDetail.description}</Text>
      </ScrollView>
      <ImageBackground
        style={[styles.fixed, styles.containter, { zIndex: -1 }]}
        source={{ uri: "https://i.ibb.co/N2KF18b/background.jpg" }}
      />

      <BottomNavigation
        onTabPress={newTab => onClickIconHandler(newTab.key)}
        renderTab={renderTab}
        tabs={tabs}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height //for full screen
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  scrollview: {
    flex: 1,
    backgroundColor: "transparent"
  },

  image: {
    width: "100%",
    height: 300
  },
  details: {
    fontSize: 18,
    color: "white",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 22,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 7,
    textAlign: "center"
  }
});

export default ItemDetailScreen;
