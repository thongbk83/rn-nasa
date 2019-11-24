import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";

const NasaItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelectNasaItem}>
      <View style={styles.nasaItem}>
        <View style={{ ...styles.nasaRow, ...styles.nasaHeader }}>
          <ImageBackground source={{ uri: props.image }} style={styles.bgImage}>
            <Text style={styles.title} numberOfLines={1}>
              {props.title}
            </Text>
          </ImageBackground>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nasaItem: {
    height: 250,
    width: "100%",
    backgroundColor: "#f5f5f5",
    marginBottom: 1
  },
  nasaRow: {
    flexDirection: "row"
  },
  nasaHeader: {
    height: "100%"
  },
  nasaDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%"
  },
  bgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    flex: 1,
    justifyContent: "flex-end"
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

export default NasaItem;
