import * as actionTypes from "./actionTypes";
import api from "../../services/api";

// add to Collection
export const addToCollection = imageData => async dispatch => {
  try {
    const res = await api.post(
      "https://nasa-collection-b906d.firebaseio.com/collection.json",
      JSON.stringify(imageData)
    );

    dispatch(getCollection());
  } catch (err) {
    console.log(err);
    dispatch({
      type: actionTypes.GET_IMAGE_ERROR,
      payload: err
    });
  }
};

// add to Collection
export const getCollection = () => async dispatch => {
  try {
    const res = await api.get(
      "https://nasa-collection-b906d.firebaseio.com/collection.json"
    );

    let keys = [];
    if (res.data) {
      keys = Object.keys(res.data);
    }

    let collectionsData = keys.map(key =>
      Object.assign({ ...res.data[key], id: key })
    );

    dispatch({
      type: actionTypes.GET_COLLECTION,
      payload: collectionsData
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: actionTypes.GET_IMAGE_ERROR,
      payload: err
    });
  }
};

// delete image
export const deleteImageOnCollection = id => async dispatch => {
  try {
    const res = await api.delete(
      `https://nasa-collection-b906d.firebaseio.com/collection/${id}.json`
    );

    dispatch({
      type: actionTypes.REMOVE_IMAGE_ON_COLLECTION,
      payload: id
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: actionTypes.GET_IMAGE_ERROR,
      payload: err
    });
  }
};

// delete image
export const updateImageOnCollection = (id, imageData) => async dispatch => {
  try {
    const res = await api.patch(
      `https://nasa-collection-b906d.firebaseio.com/collection/${id}.json`,
      JSON.stringify(imageData)
    );

    dispatch({
      type: actionTypes.UPDATE_IMAGE_ON_COLLECTION,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: actionTypes.GET_IMAGE_ERROR,
      payload: err
    });
  }
};
