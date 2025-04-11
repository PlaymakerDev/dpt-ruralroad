import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';

const name = "master"

export const initialState = {
  station: {
    all: [],
    detail: {
      station_id: '',
      station_name: '',
      station_description: '',
      station_type: '',
      province_id: '',
      latitude: '',
      longtitude: '',
      total: '',
      over: '',
      is_enable: '',
      enf_id: '',
      ip_address: '',
      last_update: ''
    }
  },
  wim: {
    all: [],
    detail: {
      station_id: '',
      station_name: '',
      station_description: '',
      location_description: '',
      station_type: '',
      province_id: '',
      latitude: '',
      longtitude: '',
      total: '',
      over: '',
      is_enable: '',
      enf_id: '',
      ip_address: '',
      last_update: '',
      owner: ''
    }
  },
  departments: {
    overview: {
      search: {
        order: 'ASC',
        page: 1,
        page_size: 10
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
    all: {
      data: []
    },
    detail: {
      id: '',
      name: '',
      type: '',
      group: '',
      province: '',
      group_drr: '',
      station_id: '',
      office_no: '',
      name2: ''
    }
  },
  spot: {
    all: [],
    detail: {
      id: '',
      name: '',
      type: '',
      group: '',
      province: '',
      group_drr: '',
      station_id: '',
      office_no: '',
      name2: ''
    }
  },
  station_types: {
    data: []
  },
  collaborative_list: {
    data: []
  },
  way: {
    all: [],
    overview: {
      search: {
        order: 'ASC',
        page: 1,
        page_size: 10
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
      id: '',
      way_code: '',
      province: '',
      dept_group: '',
      dept_id: '',
      name: '',
      subdistrict: '',
      district: '',
      distance: ''
    }
  },
  province: {
    overview: {
      search: {
        page: 1,
        page_size: 10,
        text_search: null,
        region_id: null,
        id: null
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
    all: [],
    detail: {
      id: '',
      pid: '',
      name_th: '',
      name_en: '',
      region_id: '',
      region_name_th: '',
      region_name_en: '',
      created_at: '',
      updated_at: '',
      deleted_at: ''
    }
  },
   province: {
    overview: {
      search: {
        page: 1,
        page_size: 10,
        text_search: null,
        region_id: null,
        id: null
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
    all: [],
    detail: {
      id: '',
      pid: '',
      name_th: '',
      name_en: '',
      region_id: '',
      region_name_th: '',
      region_name_en: '',
      created_at: '',
      updated_at: '',
      deleted_at: ''
    }
  },
  district: {
    overview: {
      search: {
        page: 1,
        page_size: 10,
        text_search: null,
        province_id: null,
        id: null
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
    all: [],
    detail: {
      id: '',
      province_id: '',
      name_th: '',
      name_en: '',
      created_at: '',
      updated_at: '',
      deleted_at: ''
    }
  },
  district2: {
    overview: {
      search: {
        page: 1,
        page_size: 10,
        text_search: null,
        province_id: null,
        id: null
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
    all: [],
    detail: {
      id: '',
      province_id: '',
      name_th: '',
      name_en: '',
      created_at: '',
      updated_at: '',
      deleted_at: ''
    }
  },
  sub_district: {
    overview: {
      search: {
        page: 1,
        page_size: 10,
        text_search: null,
        district_id: null,
        id: null
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
    all: [],
    detail: {
      id: '',
      district_id: '',
      name_th: '',
      name_en: '',
      created_at: '',
      updated_at: '',
      deleted_at: ''
    }
  },
  sub_district2: {
    overview: {
      search: {
        page: 1,
        page_size: 10,
        text_search: null,
        district_id: null,
        id: null
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
    all: [],
    detail: {
      id: '',
      district_id: '',
      name_th: '',
      name_en: '',
      created_at: '',
      updated_at: '',
      deleted_at: ''
    }
  },
  goods: {
    overview: {
      search: {
        search: '',
        page: 1,
        page: 10
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
    }
  },
  user_group: {
    overview: {
      search: {
        search: '',
        page: 1,
        page_size: 10
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
  user_role: {
    overview: {
      search: {
        search: '',
        page: 1,
        page_size: 10
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
  vehicle_class: {
    vehicle_class: {
      search: {
        page: 1,
        page_size: 10
      },
      data: [],
      meta: {
        page: 1,
        page_size: 100,
        total: 0,
        page_count: 0,
        has_previous_page: false,
        has_next_page: false
      }
    }
  },
  roads: {
    overview: {
      search: {
        page: 1,
        page_size: 20,
        order: 'ASC'
      },
      data: [],
      meta: {
        page: 1,
        page_size: 100,
        total: 0,
        page_count: 0,
        has_previous_page: false,
        has_next_page: false
      }
    },
    id: {
      road_id: '',
      deptid: '',
      road_code: '',
      road_name: '',
      province: '',
      district: '',
      distance: '',
      lon_start: '',
      lon_end: '',
      lat_start: '',
      lat_end: '',
      geom: {
        type: '',
        coordinates: []
      }
    },
    road_code: {
      road_id: '',
      deptid: '',
      road_code: '',
      road_name: '',
      province: '',
      district: '',
      distance: '',
      lon_start: '',
      lon_end: '',
      lat_start: '',
      lat_end: '',
      geom: {
        type: '',
        coordinates: []
      }
    }
  },
  prefix: {
    search: {
      text_search: ''
    },
    data: []
  },
  province_plate: {
    search: {
      page: 1,
      page_size: 2000000,
      // text_search: '',
      // id: '',
      // id_ppa: ''
    },
    data: [],
    meta: {
      page: 1,
      page_size: 2000000,
      total: 0,
      page_count: 0,
      has_previous_page: false,
      has_next_page: false
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
    getStation: (state, action) => {
      state.station.all = action.payload.data.data
    },
    getStationDetail: (state, action) => {
      state.station.detail = action.payload.data.data
    },
    getWIM: (state, action) => {
      state.wim.all = action.payload.data.data
    },
    getDepartment: (state, action) => {
      state.departments.overview.data = action.payload.data.data,
        state.departments.overview.meta = action.payload.data.meta,
        state.departments.overview.search = action.payload.params
    },
    getDepartmentAll: (state, action) => {
      state.departments.all.data = action.payload.data.data
    },
    getStationType: (state, action) => {
      state.station_types.data = action.payload.data.data
    },
    getCollaborativeList: (state, action) => {
      state.collaborative_list.data = action.payload.data.data
    },
    getWayAll: (state, action) => {
      state.way.all = action.payload.data.data
    },
    getWayDetail: (state, action) => {
      state.way.detail = action.payload.data.data
    },
    getGoods: (state, action) => {
      state.goods.overview.data = action.payload.data.data,
        state.goods.overview.meta = action.payload.data.meta,
        state.goods.overview.search = action.payload.params
    },
    // ALL ABOUT REGION
    getAllProvince: (state, action) => {
      state.province.all = action.payload.data.data
    },
    getProvinceDetail: (state, action) => {
      state.province.detail = action.payload.data.data
    },
    getProvince: (state, action) => {
      state.province.overview.data = action.payload.data.data,
        state.province.overview.meta = action.payload.data.meta,
        state.province.overview.search = action.payload.params
    },
    getDistrict: (state, action) => {
      state.district.overview.data = action.payload.data.data,
        state.district.overview.meta = action.payload.data.meta,
        state.district.overview.search = action.payload.params
    },
    getDistrict2: (state, action) => {
      state.district2.overview.data = action.payload.data.data,
        state.district2.overview.meta = action.payload.data.meta,
        state.district2.overview.search = action.payload.params
    },
    getSubDistrict: (state, action) => {
      state.sub_district.overview.data = action.payload.data.data,
        state.sub_district.overview.meta = action.payload.data.meta,
        state.sub_district.overview.search = action.payload.params
    },
    getSubDistrict2: (state, action) => {
      state.sub_district2.overview.data = action.payload.data.data,
        state.sub_district2.overview.meta = action.payload.data.meta,
        state.sub_district2.overview.search = action.payload.params
    },
    // CLEAR
    clearProvince: (state) => {
      state.province.overview.data = initialState.province.overview.data,
        state.province.overview.meta = initialState.province.overview.meta,
        state.province.overview.search = initialState.province.overview.search
    },
    clearDistrict: (state) => {
      state.district.overview.data = initialState.district.overview.data,
        state.district.overview.meta = initialState.district.overview.meta,
        state.district.overview.search = initialState.district.overview.search
    },
    clearSubDistrict: (state) => {
      state.sub_district.overview.data = initialState.sub_district.overview.data,
        state.sub_district.overview.meta = initialState.sub_district.overview.meta,
        state.sub_district.overview.search = initialState.sub_district.overview.search
    },
    clearWayDetail: (state) => {
      state.way.detail = initialState.way.detail
    },
    // ALL ABOUT USER_GROUP
    getUserGroup: (state, action) => {
      state.user_group.overview.data = action.payload.data.data,
        state.user_group.overview.meta = action.payload.data.meta,
        state.user_group.overview.search = action.payload.params
    },
    getUserRole: (state, action) => {
      state.user_role.overview.data = action.payload.data.data,
        state.user_role.overview.meta = action.payload.data.meta,
        state.user_role.overview.search = action.payload.params
    },
    getVehicleClass: (state, action) => {
      state.vehicle_class.vehicle_class.data = action.payload.data.data.data,
        state.vehicle_class.vehicle_class.meta = action.payload.data.data.meta,
        state.vehicle_class.vehicle_class.search = action.payload.data.params
    },
    getRoadDetailByRoadCode: (state, action) => {
      state.roads.road_code = action.payload.data.data
    },
    getPrefix: (state, action) => {
      state.prefix.search = action.payload.params,
        state.prefix.data = action.payload.data.data
    },
    getProvincePlate: (state, action) => {
      state.province_plate.data = action.payload.data.data,
        state.province_plate.meta = action.payload.data.meta,
        state.province_plate.search = action.payload.params
    }
  }
})

export const {
  getStation,
  getStationDetail,
  getWIM,
  getDepartment,
  getDepartmentAll,
  getStationType,
  getCollaborativeList,
  getWayAll,
  getWayDetail,
  getGoods,
  // ALL ABOUT REGION
  getAllProvince,
  getProvince,
  getProvinceDetail,
  getDistrict,
  getDistrict2,
  getSubDistrict,
  getSubDistrict2,
  clearProvince,
  clearDistrict,
  clearSubDistrict,
  // CLEAR
  clearWayDetail,
  // ALL ABOUT USER_GROUP
  getUserGroup,
  getUserRole,
  // VEHICLE
  getVehicleClass,
  getRoadDetailByRoadCode,
  getPrefix,
  getProvincePlate
} = slice.actions

export default slice.reducer
