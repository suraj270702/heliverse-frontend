import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
}

export const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    addUser:(state,action)=>{
        state.users.push({userId:action.payload})
    },
    clearUsers:(state)=>{
        state.users=[]
    },
    removeUser:(state,action)=>{
        state.users = state.users.filter((item)=>item.userId !== action.payload)
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { addUser,clearUsers,removeUser } = teamSlice.actions

export default teamSlice.reducer