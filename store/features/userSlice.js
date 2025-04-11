import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';

export const initialState = {
  username: null,
  group_name: null,
  map_group_name: null,
  title: null,
  first_name: null,
  last_name: null,
  email: null,
  stock_request: null,
  approve_request: null,
  approve_distribute: null,
  stock_out: null,
  u_status: null,
  last_update: null,
  cus_id: null,
  dept_id: null,
  dept_group: null,
  dept_type: null,
  position: null,
  role: null,
  token: null,
  refresh_token: null,
  header: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return state = {
        ...state,
        ...(action?.['payload']?.['user'] || {})
      };
    });
  },
  reducers: {
    signIn: (state, action) => {
      state.username = action.payload.username || null,
        state.group_name = action.payload.group_name || null,
        state.map_group_name = action.payload.map_group_name || null,
        state.title = action.payload.title || null,
        state.first_name = action.payload.first_name || null,
        state.last_name = action.payload.last_name || null,
        state.email = action.payload.email || null,
        state.stock_request = action.payload.stock_request || null,
        state.approve_request = action.payload.approve_request || null,
        state.approve_distribute = action.payload.approve_distribute || null,
        state.stock_out = action.payload.stock_out || null,
        state.u_status = action.payload.u_status || null,
        state.last_update = action.payload.last_update || null,
        state.cus_id = action.payload.cus_id || null,
        state.dept_id = action.payload.dept_id || null,
        state.dept_group = action.payload.dept_group || null,
        state.dept_type = action.payload.dept_type || null,
        state.position = action.payload.position || null,
        state.role = action.payload.role || null,
        state.token = action.payload.token || null,
        state.refresh_token = action.payload.refresh_token || null,
        state.header = action.payload.header || null
    },
    signOut: (state, action) => {
      return initialState
    },
  }
})
export const { signIn, signOut } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state) => state

export default userSlice.reducer
