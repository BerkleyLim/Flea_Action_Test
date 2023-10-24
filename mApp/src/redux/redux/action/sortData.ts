// reducer/sortData.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SortDataState {
  auctionId: number;
  viewCount: number;
}

const initialState: SortDataState[] = [];


export const SortDataSlice = createSlice({
  name: "sortData",
  initialState,
  reducers: {
    addSortData(state:SortDataState[] = initialState, action:PayloadAction<SortDataState>) {
      return [...state, action.payload]
    },

    changeSortData(state:SortDataState[] = initialState, action:PayloadAction<SortDataState[]>) {
      console.log(action)
      return action.payload
    },

    getListSortData(state:SortDataState[] = initialState, action:any) {
      return state;
    },
  },
});

export const { addSortData,  getListSortData, changeSortData } = SortDataSlice.actions;
export default SortDataSlice.reducer;
