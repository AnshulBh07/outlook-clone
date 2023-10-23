export const addToFav = (item) => {
  return { type: "mail/addFav", payload: item };
};

export const removeFromFav = (item) => {
  return { type: "mail/removeFav", payload: item };
};
