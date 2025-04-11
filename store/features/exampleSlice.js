import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';

const name = "example"

export const initialState = {
  data: null
}

export const slice = createSlice({
  name,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return state = {
        ...state,
        ...(action?.['payload']?.[name] || {})
      };
    });
  },
  reducers: {
    fetchIndex: (state, action) => {
      state.data = action.payload
    },
  }
})

export const { fetchIndex } = slice.actions

export default slice.reducer
