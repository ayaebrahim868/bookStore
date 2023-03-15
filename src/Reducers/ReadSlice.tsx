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
const readSlice = createSlice({
  name: "currentlyReadingBookShelve",
  initialState,
  reducers: {
    read: (state, action: PayloadAction<book>): ShelvesList => {
      return { ...state, read: [...state.read, action.payload] };
    },
    removeRead: (state = initialState, action: PayloadAction<book>) => {
      const data = state.read.filter((b) => b.title !== action.payload.title);
      return { ...state, read: data };
    },
    searchBook:  (state =initialState, action: PayloadAction<string>)=> {
      const clonedState = JSON.parse(JSON.stringify(state.read));
      const SearchInReadData = clonedState.filter(
        (b:book) => {
          return b.title.includes(action.payload)}) 
      if(action.payload!=='') {
        return { ...state,results:SearchInReadData}}
        else{ return { ...state, results: [...state.read]}}
    }
    }})
     
export const readAction = readSlice.actions;
export default readSlice;
