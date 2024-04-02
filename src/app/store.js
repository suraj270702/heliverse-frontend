import { configureStore } from '@reduxjs/toolkit'
import pageSliceReduce from '../features/pageSlice'
import { userAPi,teamsApi } from '../services/UserApi'
import  filterSliceReduce  from '../features/FilterSlice'
import teamsSliceReduce from '../features/teamSlice'


export const store = configureStore({
  reducer: {
    pagination:pageSliceReduce,
    [userAPi.reducerPath]:userAPi.reducer,
    [teamsApi.reducerPath]:teamsApi.reducer,
    filter:filterSliceReduce,
    teams:teamsSliceReduce
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPi.middleware).concat(teamsApi.middleware),
})