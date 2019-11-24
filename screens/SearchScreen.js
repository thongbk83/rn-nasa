import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";

import NasaItem from "../components/NasaItem";

import SearchBar from "../components/SearchBar";

const SearchScreen = props => {
  const { images } = useSelector(state => state.nasaImage);
  const [isInit, setIsInit] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(false);
  }, [images]);

  const handleOnSearching = () => {
    setIsSearching(true);
    setIsInit(false);
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
              isCollection: false
            }
          });
        }}
      ></NasaItem>
    );
  };

  const renderImages = () => {
    if (isSearching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else if (!isInit && !isSearching && images && images.length === 0) {
      return (
        <Text>
          Ooops, we haven't found anything, please search with other term.
        </Text>
      );
    } else {
      return (
        <View>
          <FlatList
            data={images}
            style={{ width: "100%" }}
            keyExtractor={(item, index) => item.nasaId}
            renderItem={renderNasaItem}
          ></FlatList>
        </View>
      );
    }
  };

  return (
    <View>
      <SearchBar onSearching={handleOnSearching} />
      {renderImages()}
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  }
});

export default SearchScreen;
