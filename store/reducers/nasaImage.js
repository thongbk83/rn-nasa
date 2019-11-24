import * as actionTypes from "../actions/actionTypes";

const initialState = {
  images: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SEARCH_NASA_IMAGES:
      return {
        ...state,
        images: payload,
        loading: false
      };
    case actionTypes.GET_IMAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default: {
      return state;
    }
  }
}
