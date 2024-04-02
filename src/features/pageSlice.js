import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 1,
}

export const pageSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    increment: (state) => {
      
      state.value += 1
    },
    setPageValue:(state,action)=>{
     state.value=action.payload
    },
    decrement: (state) => {
      state.value -= 1
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement,setPageValue } = pageSlice.actions

export default pageSlice.reducer