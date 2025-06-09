import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';

const name = "vehicleWeight"

export const initialState = {
  station: {
    overview: {
      search: {
        start_date: '',
        end_date: '',
        station_id: '',
        page: 1,
        page_size: 10,
        ordering: 'ASC'
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
    detail: {
      table: {
        search: {
          start_date: '',
          end_date: '',
          station: '',
          page: 1,
          page_size: 10,
          ordering: 'ASC'
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
      modal: {
        data: {
          td_id: '',
          t_id: '',
          enf_id: '',
          station_id: '',
          time_stamp: '',
          vehicle_class_id: '',
          material_name: '',
          lp_head_no: '',
          lp_head_province_id: '',
          lp_tail_no: '',
          lp_tail_province_id: '',
          gross_weight: '',
          gross_weight_over: '',
          legal_weight: '',
          is_over_weight: '',
          driver_name: '',
          last_update: '',
          images: []
        }
      }
    }
  },
  wim: {
    overview: {
      search: {
        start_date: '',
        end_date: '',
        station_id: '',
        page: 1,
        page_size: 10,
        ordering: 'ASC'
      },
      data: [],
      meta: {
        page: 1,
        page_size: 10,
        total: 0,
        page_count: 0,
        has_previous_page: false,
        has_next_page: false
      },
      is_over10percent_count: 0
    },
    detail: {
      table: {
        search: {
          start_date: '',
          end_date: '',
          station: '',
          page: 1,
          page_size: 10,
          ordering: 'ASC'
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
      modal: {
        data: {
          td_id: '',
          t_id: '',
          enfid: '',
          station_id: '',
          time_stamp: '',
          vehicle_class_id: '',
          material_name: '',
          lp_head_no: '',
          lp_head_province_id: '',
          lp_tail_no: '',
          lp_tail_province_id: '',
          gross_weight: '',
          legal_weight: '',
          gross_weight_over: '',
          is_over_weight: '',
          driver_name: '',
          last_update: '',
          image01_name: '',
          image02_name: '',
          vehicle_number: '',
          axle_count: '',
          lane: '',
          speed: '',
          length: '',
          front_over_hang: '',
          rear_over_hang: '',
          esal: '',
          esal2: '',
          esal3: '',
          axle01_seperation: '',
          axle01_weight: '',
          axle01_max: '',
          axle01_group: '',
          axle01_tire_code: '',
          axle02_seperation: '',
          axle02_weight: '',
          axle02_max: '',
          axle02_group: '',
          axle02_tire_code: '',
          axle03_seperation: '',
          axle03_weight: '',
          axle03_max: '',
          axle03_group: '',
          axle03_tire_code: '',
          axle04_seperation: '',
          axle04_weight: '',
          axle04_max: '',
          axle04_group: '',
          axle04_tire_code: '',
          axle05_seperation: '',
          axle05_weight: '',
          axle05_max: '',
          axle05_group: '',
          axle05_tire_code: '',
          axle06_seperation: '',
          axle06_weight: '',
          axle06_max: '',
          axle06_group: '',
          axle06_tire_code: '',
          axle07_seperation: '',
          axle07_weight: '',
          axle07_wax: '',
          axle07_group: '',
          axle07_tire_code: '',
          axle08_seperation: '',
          axle08_weight: '',
          axle08_max: '',
          axle08_group: '',
          axle08_tire_code: '',
          axle09_seperation: '',
          axle09_weight: '',
          axle09_max: '',
          axle09_group: '',
          axle09_tire_code: '',
          axle10_seperation: '',
          axle10_weight: '',
          axle10_max: '',
          axle10_group: '',
          axle10_tire_code: '',
          axle11_weight: '',
          axle11_seperation: '',
          axle11_max: '',
          axle11_group: '',
          axle11_tire_code: '',
          axle12_seperation: '',
          axle12_weight: '',
          axle12_max: '',
          axle12_group: '',
          axle12_tire_code: '',
          axle13_seperation: '',
          axle13_weight: '',
          axle13_max: '',
          axle13_group: '',
          axle13_tire_code: '',
          axle14_seperation: '',
          axle14_weight: '',
          axle14_max: '',
          axle14_group: '',
          axle14_tire_code: ''
        }
      }
    }
  },
  mobile: {
    overview: {
      search: {
        start_date: '',
        end_date: '',
        branch: '',
        page: 1,
        page_size: 10,
        ordering: 'ASC'
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
    detail: {
      table: {
        search: {
          tid: '',
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
      card: {
        data: []
      },
      modal: {
        data: []
      }
    },
    imagepreview: {
      data: []
    }
  },
  summary: {
    overview: {
      search: {
        start_date: '',
        end_date: '',
        search: '',
        page: 1,
        page_size: 10,
        ordering: 'ASC'
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
    detail: {}
  },
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
    // MAIN PAGE
    getStation: (state, action) => {
      state.station.overview.data = action.payload.data.data,
        state.station.overview.meta = action.payload.data.meta,
        state.station.overview.search = action.payload.params
    },
    getWIM: (state, action) => {
      state.wim.overview.data = action.payload.data.data,
        state.wim.overview.meta = action.payload.data.meta,
        state.wim.overview.search = action.payload.params,
        state.wim.overview.is_over10percent_count = action.payload.data.is_over10percent_count
    },
    getMobile: (state, action) => {
      state.mobile.overview.data = action.payload.data.data,
        state.mobile.overview.meta = action.payload.data.meta,
        state.mobile.overview.search = action.payload.params
    },
    getSummary: (state, action) => {
      state.summary.overview.data = action.payload.data.data,
        state.summary.overview.meta = action.payload.data.meta,
        state.summary.overview.search = action.payload.params
    },
    // DETAIL PAGE
    getWeightStationLog: (state, action) => {
      state.station.detail.table.data = action.payload.data.data,
        state.station.detail.table.meta = action.payload.data.meta,
        state.station.detail.table.search = action.payload.params
    },
    clearWeightStationLog: (state, action) => {
      state.station.detail.table.data = [],
        state.station.detail.table.meta =
        state.station.detail.table.search = {}
    },
    getWeightStationLogDetail: (state, action) => {
      state.station.detail.modal.data = action.payload.data.data
    },
    getWeightWIMLog: (state, action) => {
      state.wim.detail.table.data = action.payload.data.data,
        state.wim.detail.table.meta = action.payload.data.meta,
        state.wim.detail.table.search = action.payload.params
    },
    getWeightWIMLogDetail: (state, action) => {
      state.wim.detail.modal.data = action.payload.data.data
    },
    clearWeightMobileCar: (state, action) => {
      state.mobile.detail.table.data = []
      state.mobile.detail.table.meta = {}
      state.mobile.detail.table.search = {}
    },
    getWeightMobileCar: (state, action) => {
      state.mobile.detail.table.data = action.payload.data.data.data,
        state.mobile.detail.table.meta = action.payload.data.data.meta,
        state.mobile.detail.table.search = action.payload.params
    },
    getWeightMobileMasterDepartment: (state, action) => {
      state.mobile.detail.card.data = action.payload.data.data
    },
    getWeightMobileCarDetail: (state, action) => {
      state.mobile.detail.modal.data = action.payload.data.data
    },
    // CLEAR
    clearStation: (state) => {
      state.station.overview.search = initialState.station.overview.search
    },
    clearWIM: (state) => {
      state.wim.overview.search = initialState.station.overview.search
    },
    clearWIMDetail: (state) => {
      state.wim.detail.search = initialState.station.detail.search
    },
    clearMobile: (state) => {
      state.mobile.overview.search = initialState.station.overview.search
    },
    clearSummary: (state) => {
      state.summary.overview.search = initialState.station.overview.search
    },
    // IMAGE
    getImagePreview: (state, action) => {
      state.mobile.imagepreview.data = action.payload.data.data
    },
  }
})

export const {
  // MAIN PAGE
  getStation,
  getWIM,
  getMobile,
  getSummary,
  // DETAIL PAGE
  getWeightStationLog,
  getWeightStationLogDetail,
  getWeightWIMLog,
  getWeightWIMLogDetail,
  getWeightMobileCar,
  getWeightMobileMasterDepartment,
  getWeightMobileCarDetail,
  clearWeightStationLog,
  clearWeightMobileCar,
  // CLEAR
  clearStation,
  clearWIM,
  clearWIMDetail,
  clearMobile,
  clearSummary,
  //IMAGE
  getImagePreview
} = slice.actions

export default slice.reducer
