import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';

const name = "dashboard"

export const initialState = {
  daily_weighed_vehicles_sum: {
    search: {
      date: '',
    },
    data: {
      items: [],
      all_sum: {
        total: 0,
        over: 0
      }
    }
  },
  vehicle_weight_inspection: {
    station: {
      search: {
        date: '',
        number_day: '',
        staion_type_id: ''
      },
      data: []
    },
    wim: {
      search: {
        date: '',
        number_day: '',
        staion_type_id: ''
      },
      data: []
    },
    mobile: {
      search: {
        date: '',
        number_day: '',
        staion_type_id: ''
      },
      data: []
    },
  },
  way_traffic: {
    top_vehicle: {
      search: {
        limit: '',
        start_date: '',
        end_date: ''
      },
      data: []
    }
  },
  way: {
    transaction: {
      search: {
        date: '',
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
    display: {
      id: '',
      way_code: '',
      Province: '',
      dept_group: '',
      dept_id: '',
      name: '',
      subdistrict: '',
      district: '',
      distance: ''
    },
    detail: {
      id: '',
      way_code: '',
      Province: '',
      dept_group: '',
      dept_id: '',
      name: '',
      subdistrict: '',
      district: '',
      distance: ''
    }
  },
  weight_wim_over: {
    search: {
      td_id: ''
    },
    data: {
      td_id: '',
      t_id: '',
      enf_id: '',
      way_id: '',
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
      image_01_name: '',
      image_02_name: '',
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
      axle_01_seperation: '',
      axle_01_weight: '',
      axle_01_max: '',
      axle_01_group: '',
      axle_01_tire_code: '',
      axle_02_seperation: '',
      axle_02_weight: '',
      axle_02_max: '',
      axle_02_group: '',
      axle_02_tire_code: '',
      axle_03_seperation: '',
      axle_03_weight: '',
      axle_03_max: '',
      axle_03_group: '',
      axle_03_tire_code: '',
      axle_04_seperation: '',
      axle_04_weight: '',
      axle_04_max: '',
      axle_04_group: '',
      axle_04_tire_code: '',
      axle_05_seperation: '',
      axle_05_weight: '',
      axle_05_max: '',
      axle_05_group: '',
      axle_05_tire_code: '',
      axle_06_seperation: '',
      axle_06_weight: '',
      axle_06_max: '',
      axle_06_group: '',
      axle_06_tire_code: '',
      axle_07_seperation: '',
      axle_07_weight: '',
      axle_07_max: '',
      axle_07_group: '',
      axle_07_tire_code: '',
      axle_08_seperation: '',
      axle_08_weight: '',
      axle_08_max: '',
      axle_08_group: '',
      axle_08_tire_code: '',
      axle_09_seperation: '',
      axle_09_weight: '',
      axle_09_max: '',
      axle_09_group: '',
      axle_09_tire_code: '',
      axle_10_seperation: '',
      axle_10_weight: '',
      axle_10_max: '',
      axle_10_group: '',
      axle_10_tire_code: '',
      axle_11_seperation: '',
      axle_11_weight: '',
      axle_11_max: '',
      axle_11_group: '',
      axle_11_tire_code: '',
      axle_12_seperation: '',
      axle_12_weight: '',
      axle_12_max: '',
      axle_12_group: '',
      axle_12_tire_code: '',
      axle_13_seperation: '',
      axle_13_weight: '',
      axle_13_max: '',
      axle_13_group: '',
      axle_13_tire_code: '',
      axle_14_seperation: '',
      axle_14_weight: '',
      axle_14_max: '',
      axle_14_group: '',
      axle_14_tire_code: ''
    }
  },
  all_weight_over: {
    // search: {
    //   td_id: ''
    // },
    // data: {
    //   td_id: '',
    //   time_stamp: '',
    //   vehicle_class_id: '',
    //   is_over_weight: '',
    //   t_id: '',
    //   enfid: '',
    //   material_name: '',
    //   lp_head_no: '',
    //   lp_head_province_id: '',
    //   lp_tail_no: '',
    //   lp_tail_province_id: '',
    //   drive_shaft: '',
    //   ds1: '',
    //   ds2: '',
    //   ds3: '',
    //   ds4: '',
    //   ds5: '',
    //   ds6: '',
    //   ds7: '',
    //   gross_weight: '',
    //   gross_weight_over: '',
    //   legal_weight: '',
    //   driver_name: '',
    //   drive_shaft_over: '',
    //   address_no: '',
    //   moo: '',
    //   soi: '',
    //   road: '',
    //   subdistrict: '',
    //   district: '',
    //   province: '',
    //   brand: '',
    //   officer1: '',
    //   officer2: '',
    //   witness1: '',
    //   witness2: '',
    //   witness_sender: '',
    //   book_no: '',
    //   police_station: '',
    //   copy_lp_no: '',
    //   driver_license_type: '',
    //   weight_slip_from_company: '',
    //   process: '',
    //   consider: '',
    //   asset_value: '',
    //   parole_year: '',
    //   jail_month: '',
    //   imprison_month: '',
    //   probation_Year: '',
    //   fine: '',
    //   sequestrate_list: '',
    //   case_number: '',
    //   case_date_time: '',
    //   accept_weight: '',
    //   accept_weight_By: '',
    //   edit_weight: '',
    //   edit_weight_By: '',
    //   is_arrested: '',
    //   master: {
    //     t_id: '',
    //     department_id: '',
    //     department_group: '',
    //     department_type: '',
    //     way_id: '',
    //     way_code: '',
    //     way_name: '',
    //     way_subdistrict: '',
    //     way_district: '',
    //     way_province: '',
    //     city: '',
    //     province: '',
    //     km_from: '',
    //     km_to: '',
    //     create_date: '',
    //     time_from: '',
    //     time_to: '',
    //     is_open: '',
    //     latitude: '',
    //     longitude: '',
    //     collaboration: '',
    //     police_station: '',
    //     operator: ''
    //   },
    //   vehicle_class: {
    //     id: '',
    //     vehicle_class_id: '',
    //     vehicle_class_id_ref: '',
    //     vehicle_class_name: '',
    //     vehicle_class_desc: '',
    //     legal_weight: '',
    //     drive_shaft: '',
    //     drive_shaft_ref: '',
    //     vehicle_class_desc2: '',
    //     vehicle_class_desc3: ''
    //   },
    //   lp_head_province: {
    //     id: '',
    //     name: '',
    //     id_ppa: ''
    //   },
    //   lp_tail_province: {
    //     id: '',
    //     name: '',
    //     id_ppa: ''
    //   },
    //   station_type: ''
    // }
  },
  cctv: {
    data: []
  },
  work_plan_actual_way: {
    search: {
      year: '',
      department_id: ''
    },
    data: {
      item: {
        planWays: [],
        actualWays: []
      },
      all_sum: {
        actual_way_total: 0,
        plan_way_total: 0
      }
    }
  },
  work_plan_actual: {
    search: {
      year: '',
      department_id: ''
    },
    data: {
      item: {
        plans: [],
        actuals: []
      },
      all_sum: {
        actual_total: 0,
        plan_total: 0
      }
    }
  },
  view_sum_plan_chart: {
    search: {
      year: '',
      department_id: ''
    },
    data: {
      item: [],
      all_sum: {
        plan_total: 0,
        result_total: 0
      }
    }
  },
  sum_weight_year: {
    data: []
  },
  daily_weighed_vehicles_sum_station: {
    overview: {
      search: {
        date: ''
      },
      data: [],
      meta: {
        page: 1,
        page_size: 20,
        total: 0,
        page_count: 0,
        has_previous_page: false,
        has_next_page: true
      }
    },
    detail: {}
  },
  daily_weighed_vehicles_sum_wim: {
    overview: {
      search: {
        date: ''
      },
      data: [],
      meta: {
        page: 1,
        page_size: 20,
        total: 0,
        page_count: 0,
        has_previous_page: false,
        has_next_page: true
      }
    },
    detail: {}
  },
  daily_weighed_vehicles_sum_spot: {
    overview: {
      search: {
        date: {}
      },
      data: [],
      meta: {
        page: 1,
        page_size: 20,
        total: 0,
        page_count: 0,
        has_previous_page: false,
        has_next_page: true
      }
    },
    detail: {}
  },
  daily_weighed_vehicles_checkpoint: {
    search: {
      date: ''
    },
    data: []
  },
  vehicle_class: {
    search: {
      station_id: ''
    },
    data: {
      column: [],
      value: []
    }
  },
  vehicle_avgspeed_hour: {
    search: {
      station_id: ''
    },
    data: {
      column: [],
      value: []
    }
  },
  vehicle_count_hour: {
    search: {
      station_id: ''
    },
    data: {
      column: [],
      value: []
    }
  },
  last_seven_days: {
    search: {
      station_id: ''
    },
    data: {
      column: [],
      total: [],
      over: [],
    }
  },
  position: {
    overview: {
      search: {
        province: '',
        station_type: ''
      },
      data: {
        station: [],
        wim: [],
        mobile: []
      },
    },
    detail: {
      search: {
        station_id: '',
        StationType: ''
      },
      data: []
    },
  },
  sum_weight_year_v2: {
    search: {
      start_year: '',
      end_year: '',
    },
    data: {
      summary: [],
      data: []
    }
  },
  position_province: {
    data: []
  },
  recent_weight: {
    search: {
      station_id: '',
      limit: 5
    },
    data: []
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
    getDailyWeighedVehiclesCheckpoint: (state, action) => {
      state.daily_weighed_vehicles_checkpoint.data = action.payload.data
    },
    getDailyWeighedVehiclesSum: (state, action) => {
      state.daily_weighed_vehicles_sum.data = action.payload.data.data,
        state.daily_weighed_vehicles_sum.search = action.payload.params
    },
    getVehicleWeightInspectionForStation: (state, action) => {
      state.vehicle_weight_inspection.station.data = action.payload.data.data,
        state.vehicle_weight_inspection.station.search = action.payload.params
    },
    getVehicleWeightInspectionForWIM: (state, action) => {
      state.vehicle_weight_inspection.wim.data = action.payload.data.data,
        state.vehicle_weight_inspection.wim.search = action.payload.params
    },
    getVehicleWeightInspectionForMobile: (state, action) => {
      state.vehicle_weight_inspection.mobile.data = action.payload.data.data,
        state.vehicle_weight_inspection.mobile.search = action.payload.params
    },
    getWayTraffic: (state, action) => {
      state.way_traffic.top_vehicle.data = action.payload.data.data,
        state.way_traffic.top_vehicle.search = action.payload.params
    },
    getWeightWIMOver: (state, action) => {
      state.weight_wim_over.data = action.payload.data.data,
        state.weight_wim_over.search = action.payload.params
    },
    getAllWeightOver: (state, action) => {
      state.all_weight_over = action.payload.data.data
      // state.all_weight_over.data = action.payload.data.data,
      // state.all_weight_over.search = action.payload.params
    },
    getWayDisplay: (state, action) => {
      state.way.display = action.payload.data.data
    },
    getWayDetail: (state, action) => {
      state.way.detail = action.payload.data.data
    },
    getWayTransaction: (state, action) => {
      state.way.transaction.data = action.payload.data.data,
        state.way.transaction.meta = action.payload.data.meta,
        state.way.transaction.search = action.payload.params
    },
    getWorkPlanActual: (state, action) => {
      state.work_plan_actual.data = action.payload.data.data,
        state.work_plan_actual.search = action.payload.params
    },
    getViewSumPlanChart: (state, action) => {
      state.view_sum_plan_chart.data = action.payload.data,
      state.view_sum_plan_chart.search = action.payload.params
    },
    getCCTV: (state, action) => {
      state.cctv.data = action.payload.data.data
    },
    getSumWeightYear: (state, action) => {
      state.sum_weight_year.data = action.payload.data.data
    },
    getDailyWeighedVehiclesSumStation: (state, action) => {
      state.daily_weighed_vehicles_sum_station.overview.data = action.payload.data.data,
        state.daily_weighed_vehicles_sum_station.overview.meta = action.payload.data.meta,
        state.daily_weighed_vehicles_sum_station.overview.search = action.payload.params
    },
    getDailyWeighedVehiclesSumWIM: (state, action) => {
      state.daily_weighed_vehicles_sum_wim.overview.data = action.payload.data.data,
        state.daily_weighed_vehicles_sum_wim.overview.meta = action.payload.data.meta,
        state.daily_weighed_vehicles_sum_wim.overview.search = action.payload.params
    },
    getDailyWeighedVehiclesSumSpot: (state, action) => {
      state.daily_weighed_vehicles_sum_spot.overview.data = action.payload.data.data,
        state.daily_weighed_vehicles_sum_spot.overview.meta = action.payload.data.meta,
        state.daily_weighed_vehicles_sum_spot.overview.search = action.payload.params
    },
    getVehicleClass: (state, action) => {
      state.vehicle_class.data = action.payload.data,
        state.vehicle_class.search = action.payload.params
    },
    getVehicleCountHour: (state, action) => {
      state.vehicle_count_hour.data = action.payload.data,
        state.vehicle_count_hour.search = action.payload.params
    },
    getVehicleAvgSpeedHour: (state, action) => {
      state.vehicle_avgspeed_hour.data = action.payload.data,
        state.vehicle_avgspeed_hour.search = action.payload.params
    },
    getLastSevenDays: (state, action) => {
      state.last_seven_days.data = action.payload.data,
        state.last_seven_days.search = action.payload.params
    },
    getPosition: (state, action) => {
      state.position.overview.data = action.payload.data,
        state.position.overview.search = action.payload.params
    },
    getPositionDetail: (state, action) => {
      state.position.detail.data = action.payload.data,
        state.position.detail.search = action.payload.params
    },
    getSumWeightYearV2: (state, action) => {
      state.sum_weight_year_v2.data = action.payload.data,
        state.sum_weight_year_v2.search = action.payload.params
    },
    getPositionProvince: (state, action) => {
      state.position_province.data = action.payload.data
    },
    getRecentWeight: (state, action) => {
      state.recent_weight.data = action.payload.data,
        state.recent_weight.search = action.payload.params
    }
  }
})

export const {
  getDailyWeighedVehiclesCheckpoint,
  getDailyWeighedVehiclesSum,
  // getVehicleWeightInspection,
  getVehicleWeightInspectionForStation,
  getVehicleWeightInspectionForWIM,
  getVehicleWeightInspectionForMobile,
  getWayTraffic,
  getWayDisplay,
  getWayDetail,
  getWayTransaction,
  getWeightWIMOver,
  getAllWeightOver,
  getWorkPlanActualWay,
  getWorkPlanActual,
  getViewSumPlanChart,
  getCCTV,
  getSumWeightYear,
  getDailyWeighedVehiclesSumStation,
  getDailyWeighedVehiclesSumWIM,
  getDailyWeighedVehiclesSumSpot,
  getVehicleClass,
  getVehicleCountHour,
  getVehicleAvgSpeedHour,
  getLastSevenDays,
  getPosition,
  getPositionDetail,
  getSumWeightYearV2,
  getPositionProvince,
  getRecentWeight
} = slice.actions

export default slice.reducer
