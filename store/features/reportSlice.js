import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';

const name = "report"

export const initialState = {
  exclusive: {
    search: {
      year_type: 'ce_year',
      plan_year: '',
      file_type: 'pdf',
    },
}
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
    getExclusive: (state, action) => {
      state.exclusive.search = action.payload.params
    },
  }
})

export const { getExclusive } = slice.actions

export default slice.reducer
