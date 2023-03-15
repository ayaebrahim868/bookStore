import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import currentlyReadingSlice from "../Reducers/CurrentlyReadingSlice";
import readSlice from "../Reducers/ReadSlice";
import wantTReadSlice from "../Reducers/WantTReadSlice";
import noneSlice from "../Reducers/noneReadingSlice";
export function renderWithProviders(
  ui: any,
  {
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        currentlyReadingReducer: currentlyReadingSlice.reducer,
        readReducer: readSlice.reducer,
        wantToReadReducer: wantTReadSlice.reducer,
        noneReducer: noneSlice.reducer,
      },
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: any }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
