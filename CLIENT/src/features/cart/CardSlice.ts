import { createSlice  } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState = {
  cardItems: [],
  amount: 0,
  total:0,
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  
  },
});



export default cartSlice.reducer;
