// reducer/sortReverseData.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SortReverseDataState {
  auctionId: number;
  viewCount: number;
}

const initialState: SortReverseDataState[] = [];

export const sortReverseDataSlice = createSlice({
  name: "sortReverseData",
  initialState,
  reducers: {
    addSortReverseData: (state:any = initialState, action:PayloadAction<SortReverseDataState>) => {
      return [...state, action.payload];
    },

    changeSortReverseData: (state:SortReverseDataState[] = initialState, action:PayloadAction<SortReverseDataState[]>) => {
      return action.payload;
    },

    getListSortReverseData: (state:SortReverseDataState[] = initialState, action:any) => {
      return state;
    },
  },
});

export const { addSortReverseData, getListSortReverseData, changeSortReverseData } = sortReverseDataSlice.actions;
export default sortReverseDataSlice.reducer;
