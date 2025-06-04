import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';

const name = "cctv"

export const initialState = {
  department_group: {
    search: {
      // department_id: '',
      // station_id: '',
      page: 1,
      page_size: 30,
    },
    data: [],
    meta: {
      page: 1,
      page_size: 30,
      total: 0,
      page_count: 0,
      has_previous_page: false,
      has_next_page: false
    }
  },
  deparment_list_sum: {
    search: {
      department_id: '',
      // station_id: '',
      page: 1,
      page_size: 10,
    },
    data: [],
    meta: {
      page: 1,
      page_size: 10,
      total: 0,
      page_count: 0,
      has_previous_page: false,
      has_next_page: false
    }
  },
  list: {
    search: {
      department_id: '',
      // station_id: '',
      page: 1,
      page_size: 10,
    },
    data: [],
    meta: {
      page: 1,
      page_size: 10,
      total: 0,
      page_count: 0,
      has_previous_page: false,
      has_next_page: false
    }
  },
  station_sum: {
    data: {
      station_id: '',
      station_description: '',
      station_type_id: '',
      station_type_desc: '',
      station_type_name: '',
      department_id: '',
      department_name: '',
      total_cameras: '',
      online_cameras: '',
      offline_cameras: ''
    }
  },
  camera_status: {
    search: {
      department_id: '',
    },
    // data: []
    data: {
      online_cameras: '',
      offline_cameras: '',
      total_cameras: ''
    }
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
    getDepartmentGroup: (state, action) => {
      state.department_group.data = action.payload.data.data,
        state.department_group.meta = action.payload.data.meta,
        state.department_group.search = action.payload.params
    },
    getDepartmentListSum: (state, action) => {
      state.deparment_list_sum.data = action.payload.data.data,
        state.deparment_list_sum.meta = action.payload.data.meta,
        state.deparment_list_sum.search = action.payload.params
    },
    getList: (state, action) => {
      state.list.data = action.payload.data.data,
        state.list.meta = action.payload.data.meta,
        state.list.search = action.payload.params
    },
    getStationSum: (state, action) => {
      state.station_sum.data = action.payload.data.data
    },
    getCameraStatus: (state, action) => {
      state.camera_status.data = action.payload.data.data[0],
        state.camera_status.search = action.payload.params
    },
    clearDepartmentListSum: (state) => {
      state.deparment_list_sum = initialState.deparment_list_sum
    },
    clearList: (state) => state.list = initialState.list,
    clearStationSum: (state) => state.station_sum = initialState.station_sum,
  }
})

export const {
  getDepartmentGroup,
  getDepartmentListSum,
  getList,
  getStationSum,
  clearDepartmentListSum,
  clearList,
  clearStationSum,
  getCameraStatus
} = slice.actions

export default slice.reducer
