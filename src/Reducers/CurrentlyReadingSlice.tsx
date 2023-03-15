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
const currentlyReadingSlice = createSlice({
  name: "currentlyReadingBookShelve",
  initialState,
  reducers: {
    currentlyReading: (state, action: PayloadAction<book>) => {
      return {
        ...state,
        currentlyReading: [...state.currentlyReading, action.payload],
      };
    },
    removeCurrentlyReading: (
      state = initialState,
      action: PayloadAction<book>
    ) => {
      const data = state.currentlyReading.filter(
        (b) => b.title !== action.payload.title
      );
      return { ...state, currentlyReading: data };
    },
    searchBook:  (state =initialState, action: PayloadAction<string>)=> {
      const clonedState = JSON.parse(JSON.stringify(state.currentlyReading));
     const SearchInCurrentlyReadingdata = 
     clonedState.filter(
       (b:book) => b.title.includes(action.payload));
       if(action.payload!=='') {
        return { ...state,results:SearchInCurrentlyReadingdata}}
        else{ return { ...state, results: [...state.currentlyReading]}
    }
     },
    }});
export const currentlyReadingAction = currentlyReadingSlice.actions;
export default currentlyReadingSlice;
