// if the state is present in local storage use that as initial state or create new
const stateVal = JSON.parse(localStorage.getItem("main"));

const initialState = stateVal ? stateVal : { favs: [], read: [] };

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "mail/addFav":
      return { ...state, favs: [...state.favs, action.payload] };

    case "mail/removeFav":
      return {
        ...state,
        favs: state.favs.filter((id) => {
          return id !== action.payload;
        }),
      };

    case "mail/addRead":
      return { ...state, read: [...state.read, action.payload] };
    default:
      return state;
  }
};
