import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import NasaItem from "../components/NasaItem";

const FavoriteScreen = props => {
  const collection = useSelector(state => state.collection);
  const [favCollection, setFavCollection] = useState([]);

  useEffect(() => {
    tempFav = collection.collections.filter(image => image.like);
    setFavCollection(tempFav);
  }, [collection]);

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
            data={favCollection}
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

  return renderList();
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default FavoriteScreen;
