// /src/store/persistMigrations.ts
import { SortDataState } from './action/sortData'
import { SortReverseDataState } from './action/sortReverseData';

/**
 * Redux store migrations.
 */
export default {
  sortData: (state: SortDataState): SortDataState => {
    return {
      ...state,
    };
  },
  sortReverseData: (state: SortReverseDataState): SortDataState => {
    return {
      ...state,
    };
  },
};