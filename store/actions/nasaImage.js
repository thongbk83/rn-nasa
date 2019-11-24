import * as actionTypes from "./actionTypes";
import { nasaConfig } from "../../constants/apiConfig";
import api from "../../services/api";
import normalizeNasaData from "../../services/normalizeNasaData";

// Get images
export const searchImage = (
  keyword,
  isImage = false,
  isVideo = false
) => async dispatch => {
  if (!keyword || keyword.length === 0) {
    dispatch({
      type: actionTypes.SEARCH_NASA_IMAGES,
      payload: []
    });
    return;
  }

  let mediaType =
    "&media_type=" +
    (isImage && isVideo
      ? "image,video"
      : isImage
      ? "image"
      : isVideo
      ? "video"
      : "image");

  try {
    const res = await api.get(
      `${nasaConfig.API_URL_NASA_IMAGE}/search?q=${keyword}${mediaType}`
    );

    const imageList = await normalizeNasaData.search(res.data);

    dispatch({
      type: actionTypes.SEARCH_NASA_IMAGES,
      payload: imageList
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: actionTypes.GET_IMAGE_ERROR
    });
  }
};
