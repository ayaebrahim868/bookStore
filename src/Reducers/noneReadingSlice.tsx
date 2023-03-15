import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ShelvesList } from "../Models/ShelvesList.model";
import { book } from '../Models/book.model';
const initialState:ShelvesList = {
    read: [],
    wantToRead: [],
    currentlyReading: [],
    none:[],
    results:[]
  };
const noneSlice = createSlice({
  name: 'noneReadingBookShelve',
  initialState,
  reducers: {
    none:  (state =initialState, action: PayloadAction<book>) => {
      return { ...state, none: [...state.none, action.payload] };
    
    }}});
    export const noneAction= noneSlice.actions;
    export  default noneSlice;