import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Picker,
  Alert
} from "react-native";

import { useDispatch } from "react-redux";
import { updateImageOnCollection } from "../store/actions/collection";

const EditItemScreen = props => {
  const dispatch = new useDispatch();
  const image = props.navigation.getParam("itemDetail");
  const [formData, setFormData] = useState({
    id: "",
    like: false,
    title: "",
    description: "",
    mediaType: "",
    linkPreview: "",
    linkFile: ""
  });

  useEffect(() => {
    setFormData({
      id: !image.id ? "" : image.id,
      like: !image.like ? false : image.like,
      title: !image.title ? "" : image.title,
      description: !image.description ? "" : image.description,
      mediaType: !image.mediaType ? "image" : image.mediaType,
      linkPreview: !image.linkPreview ? "" : image.linkPreview,
      linkFile: !image.linkFile ? "" : image.linkFile
    });
  }, [image]);

  const { title, description, mediaType, linkPreview, linkFile } = formData;

  const onSubmit = () => {
    dispatch(updateImageOnCollection(image.id, formData));
    setTimeout(() => {
      alertToNotify();
    }, 500);
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
    <ScrollView>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          name="title"
          placeholder="title"
          value={title}
          onChangeText={text => setFormData({ ...formData, title: text })}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          placeholder="description"
          name="description"
          multiline={true}
          numberOfLines={6}
          value={description}
          onChangeText={text => setFormData({ ...formData, description: text })}
        />

        <Text style={styles.label}>Type</Text>
        <Picker
          selectedValue={mediaType}
          name="mediaType"
          style={styles.textInput}
          onValueChange={(itemValue, itemIndex) =>
            setFormData({ ...formData, mediaType: itemValue })
          }
        >
          <Picker.Item label="Image" value="image" />
          <Picker.Item label="Video" value="video" />
        </Picker>
        <Text style={styles.label}>Link Preview</Text>
        <TextInput
          value={linkPreview}
          name="linkPreview"
          style={styles.textInput}
          placeholder="link preview"
          onChangeText={text => setFormData({ ...formData, linkPreview: text })}
        />
        <Text style={styles.label}>Link File</Text>
        <TextInput
          value={linkFile}
          name="linkFile"
          style={styles.textInput}
          placeholder="link file"
          onChangeText={text => setFormData({ ...formData, linkFile: text })}
        />

        <TouchableOpacity style={styles.saveButton} onPress={() => onSubmit()}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    paddingVertical: 10
  },
  label: {
    justifyContent: "flex-start",
    fontSize: 20,
    marginTop: 20,
    paddingHorizontal: 10
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderWidth: 2,
    borderRadius: 5,
    width: "98%",
    height: 50,
    fontSize: 14,
    paddingHorizontal: 10,
    marginHorizontal: 5
  },
  textArea: {
    borderColor: "#CCCCCC",
    borderWidth: 2,
    borderRadius: 5,
    width: "98%",
    height: 100,
    fontSize: 14,
    paddingHorizontal: 10,
    marginHorizontal: 5
  },
  saveButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  }
});

export default EditItemScreen;
