import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShelvesList } from "../Models/ShelvesList.model";
import { book } from "../Models/book.model";
const initialState: ShelvesList = {
  read: [],
  wantToRead: [],
  currentlyReading: [],
  none: [],
  results:[]
};
const wantToReadSlice = createSlice({
  name: "wantToReadBookShelve",
  initialState,
  reducers: {
    wantToRead: (
      state ,
      action: PayloadAction<book>
    ): ShelvesList => {
      return { ...state, wantToRead: [...state.wantToRead, action.payload] };
    },

    removeWantTORead: (state = initialState, action: PayloadAction<book>) => {
      const data = state.wantToRead.filter(
        (b) => b.title !== action.payload.title
      );
      return { ...state, wantToRead: data };
    },
    searchBook: (state = initialState, action: PayloadAction<string>) => {
      const clonedState = JSON.parse(JSON.stringify(state.wantToRead));
      const SearchInwantToReadData = clonedState.filter((b: book) => {
        return b.title.includes(action.payload);
      });
      if (action.payload !== "") {
        return { ...state,results: SearchInwantToReadData };
      } else {
        return { ...state, results: [...state.wantToRead] };
      }
    },
  },
});
export const wantToReadAction = wantToReadSlice.actions;
export default wantToReadSlice;
