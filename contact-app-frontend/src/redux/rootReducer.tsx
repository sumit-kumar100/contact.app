import contactReducer from "@/services/contacts";
import { AnyAction, Reducer, combineReducers } from "@reduxjs/toolkit";
import { cloneDeep, merge } from "lodash";
import { persistReducer } from "redux-persist";

import { storage } from "./create-web-storage";
import { RootState } from "./store";

/**

* This code merges the existing application state (...state) from the client-side with the 
* data received from the "HYDRATE" action (...action.payload) representing the server-side 
* slice or state. The spread operator (...) combines the current state with the hydrated 
* data, effectively updating only the specific slices fetched from the server while preserving
* the rest of the client-side state. This process ensures that the state on the client-side 
* remains intact, and only the relevant data from the server is incorporated into the 
* application state.

**/

const combinedReducers = combineReducers({
  contact: contactReducer,
});

const rootReducer: Reducer<RootState> = (
  state: RootState | undefined,
  action: AnyAction
) => {
  if (action.type === "HYDRATE") {
    if (action.payload.hasOwnProperty("_persist")) {
      delete action.payload._persist;
    }

    const previousStates = cloneDeep(state);
    const currentStates = cloneDeep(action.payload);
    const hyderateStates = merge(previousStates, currentStates);

    return combinedReducers(hyderateStates, action);
  }

  return combinedReducers(state, action);
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

export const persistReducers = persistReducer(persistConfig, rootReducer);
