import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { searchImage } from "../store/actions/nasaImage";

const SearchBar = props => {
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();

  const onChangeText = text => {
    setKeyword(text);
  };

  const onSubmit = () => {
    props.onSearching();
    dispatch(searchImage(keyword, true, true));
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        value={keyword}
        placeholder="Input to search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        clearButtonMode="always"
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    backgroundColor: "grey"
  },
  textInput: {
    height: 36,
    backgroundColor: "white",
    color: "black",
    borderRadius: 4,
    paddingHorizontal: 12
  }
});

export default SearchBar;
