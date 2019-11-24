import * as actionTypes from "../actions/actionTypes";

const initialState = {
  collections: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ADD_IMAGE_TO_COLLECTION:
      return {
        ...state,
        collections: [payload, ...state.collections],
        loading: false
      };
    case actionTypes.GET_COLLECTION: {
      return {
        ...state,
        collections: payload,
        loading: false
      };
    }
    case actionTypes.REMOVE_IMAGE_ON_COLLECTION: {
      return {
        ...state,
        collections: state.collections.filter(image => image.id !== payload),
        loading: false
      };
    }
    case actionTypes.UPDATE_IMAGE_ON_COLLECTION: {
      return {
        ...state,
        collections: state.collections.map(item => {
          if (item.id === payload.id) {
            return {
              ...item,
              like: payload.like,
              title: payload.title,
              description: payload.description,
              mediaType: payload.mediaType,
              linkPreview: payload.linkPreview,
              linkFile: payload.linkFile
            };
          }
          return item;
        }),
        loading: false
      };
    }

    default: {
      return state;
    }
  }
}
