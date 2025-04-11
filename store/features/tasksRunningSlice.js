import { createSlice } from '@reduxjs/toolkit'

export const initialState = {}

export const tasksRunningSlice = createSlice({
  name: 'tasksRunning',
  initialState,
  reducers: {
    start: (state, action) => {
      state[action.payload.name] = {
        loading: true,
        loadType: action.payload.loadType,
        data: null,
        errorMessage: '',
        errorCode: '',
      }
      state[action.payload.name].loadType = action.payload.loadType
    },
    finished: (state, action) => {
      state[action.payload.name].loading = false;
    },
  }
})
export const { start, finished } = tasksRunningSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTasksRunning = (state) => state


const getLoadingOverlay = (tasksRunning) => {
  if (!tasksRunning) {
    return false
  } else if (Object.keys(tasksRunning).length <= 0) {
    return false
  } else if (Object.keys(tasksRunning).length > 0) {
    return Object.keys(tasksRunning).some(key => tasksRunning[key]?.loading !== false && tasksRunning[key]?.loadType === 'overlay')
  } else {
    return false
  }
}

const getCancelTokens = (tasksRunning) => {
  if (!tasksRunning) {
    return []
  } else if (Object.keys(tasksRunning).length <= 0) {
    return []
  } else if (Object.keys(tasksRunning).length > 0) {
    return Object.keys(tasksRunning).map(key => tasksRunning[key]?.cancelToken || {})
  } else {
    return []
  }
}

export const getTasksRunning = (tasksRunning) => {
  return {
    loadingOverlay: getLoadingOverlay(tasksRunning),
    cancelTokens: getCancelTokens(tasksRunning)
  }
}

export default tasksRunningSlice.reducer
