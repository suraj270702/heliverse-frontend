import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  domain: "",
  available:"",
  gender:"",
  name:""
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addDomain: (state,action) => {
      
      state.domain=action.payload
    },
    addGender: (state,action) => {
      
        state.gender=action.payload
      },
    addAvailability: (state,action) => {
      
        state.available=action.payload
      },
      addName:(state,action)=>{
        state.name=action.payload
      }
    
  },
})


export const { addDomain, addGender, addAvailability,addName } = filterSlice.actions

export default filterSlice.reducer