import { Action, ThunkAction } from "@reduxjs/toolkit";
import { makeStore } from "./store";

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export type Store = ReturnType<typeof makeStore>;
export type AppDispatch = Store["dispatch"];
