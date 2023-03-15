import { configureStore } from '@reduxjs/toolkit'
import currentlyReadingSlice from '../Reducers/CurrentlyReadingSlice';
import readSlice  from "../Reducers/ReadSlice";
import wantTReadSlice from '../Reducers/WantTReadSlice';
import noneSlice from '../Reducers/noneReadingSlice';

const store = configureStore({
    reducer: {
        currentlyReadingReducer: currentlyReadingSlice.reducer,
        readReducer: readSlice.reducer,
        wantToReadReducer:wantTReadSlice.reducer,
        noneReducer :noneSlice.reducer
    },
  })
export type RootState = ReturnType<typeof store.getState>
export default store;
