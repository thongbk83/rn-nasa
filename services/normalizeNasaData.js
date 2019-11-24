import { camelizeKeys } from "humps";

const camelizeJSON = json =>
  camelizeKeys(json, (key, convert) => {
    return /^[A-Z0-9_]+$/.test(key) ? key : convert(key);
  });

const normalizeItem = item => {
  const camelizedItem = camelizeJSON(item);
  const data = camelizedItem.data[0];
  const { dateCreated, description, nasaId, mediaType, title } = data;
  const link = camelizedItem.links[0];
  const { href: image } = link;
  const linkPreview = image;
  let linkFile = image;
  if (mediaType === "video") {
    linkFile = linkFile.replace("~thumb.jpg", "~medium.mp4");
  }
  return {
    dateCreated,
    description,
    nasaId,
    mediaType,
    title,
    linkPreview,
    linkFile
  };
};

const normalizeNasaData = {
  search: ({ collection }) => {
    return collection.items.map(item => normalizeItem(item));
  }
};

export default normalizeNasaData;
