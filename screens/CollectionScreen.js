import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getCollection } from "../store/actions/collection";
import NasaItem from "../components/NasaItem";

import BottomNavigation, {
  FullTab
} from "react-native-material-bottom-navigation";

const Collection = props => {
  const collection = useSelector(state => state.collection);
  const dispatch = useDispatch();

  const tabs = [
    {
      key: "Collection",
      icon: "ios-list",
      label: "Collection",
      barColor: "#388E3C",
      color: "yellow",
      pressColor: "rgba(255, 255, 255, 0.16)"
    },
    {
      key: "Favorite",
      icon: "ios-star",
      label: "Favorite",
      barColor: "#B71C1C",
      color: "white",
      pressColor: "rgba(255, 255, 255, 0.16)"
    }
  ];

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

  useEffect(() => {
    dispatch(getCollection());
  }, [getCollection]);

  const onClickIconHandler = key => {
    props.navigation.navigate({
      routeName: key
    });
  };

  const renderNasaItem = itemData => {
    return (
      <NasaItem
        title={itemData.item.title}
        image={itemData.item.linkPreview}
        onSelectNasaItem={() => {
          props.navigation.navigate({
            routeName: "ItemDetail",
            params: {
              itemDetail: itemData.item,
              isCollection: true
            }
          });
        }}
      ></NasaItem>
    );
  };

  const renderList = () => {
    if (collection) {
      return (
        <View style={styles.screen}>
          <FlatList
            data={collection.collections}
            style={{ width: "100%" }}
            keyExtractor={(item, index) => item.id}
            renderItem={renderNasaItem}
          ></FlatList>
        </View>
      );
    } else {
      return "";
    }
  };

  return collection.loading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      {renderList()}
      <BottomNavigation
        onTabPress={newTab => onClickIconHandler(newTab.key)}
        renderTab={renderTab}
        tabs={tabs}
      />
    </View>
  );
};

Collection.navigationOptions = navigationData => {
  return {
    headerRight: (
      <TouchableOpacity
        onPress={() => navigationData.navigation.navigate("Search")}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Ionicons
            name="ios-add"
            size={30}
            color={Platform.OS === "android" ? "white" : "#ff6f00"}
          ></Ionicons>
        </View>
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Collection;
