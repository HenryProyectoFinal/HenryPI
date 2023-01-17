import { createSlice  } from '@reduxjs/toolkit';



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
