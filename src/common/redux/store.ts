import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, Context } from "next-redux-wrapper";
import { AppStore } from "./types";

import userReducer from "./reducers/user";
import offconvasesReducer from "./reducers/offconvases";
import dynamicReducer from "./reducers/dynamic";

// const isDevMode = process.env.NODE_ENV === "development";

export const reducers = combineReducers({
  user: userReducer,
  offconvases: offconvasesReducer,
  dynamic: dynamicReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: reducers,
    // devTools: isDevMode,
  });
};

// export const wrapper = createWrapper<AppStore>(makeStore, { debug: isDevMode });
export const wrapper = createWrapper<AppStore>(makeStore);
