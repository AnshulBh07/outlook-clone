// file that stores our react redux store
import { configureStore } from "@reduxjs/toolkit";
import { mainReducer } from "./reducers/mainReducer";

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});
