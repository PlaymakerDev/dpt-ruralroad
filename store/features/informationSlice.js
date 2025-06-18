import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';

const name = "information"

export const initialState = {
  unit_establishment_plan: {
    workplans: {
      search: {
        year_type: 'ce_year',
        plan_year: '',
        department_id: '',
        page: 1,
        page_size: 10,
        order: 'ASC'
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
  },
  overweight_vehicle: {
    stationary: {
      overview: {
        search: {
          plan_year: '',
          start_date: '',
          end_date: '',
          year_type: 'ce_year',
          station_id: '',
          page: 1,
          page_size: 10,
          order: 'ASC',
        },
        data: [],
        meta: {
          page: 1,
          page_size: 10,
          total: 0,
          page_count: 0,
          has_previous_page: false,
          has_next_page: true
        }
      },
      detail: {
        data: {
          id: '',
          td_id: '',
          station_type: '',
          arrest_date: '',
          driver_name: '',
          address_no: '',
          moo: '',
          soi: '',
          road: '',
          subdistrict: '',
          district: '',
          province: '',
          brand: '',
          officer1: '',
          officer2: '',
          witness1: '',
          witness2: '',
          witness_sender: '',
          book_no: '',
          police_station: '',
          police_station_province_id: '',
          police_station_district_id: '',
          police_station_subdistrict_id: '',
          copy_lp_no: '',
          driver_license_type: '',
          weight_slip_from_company: '',
          process: '',
          consider: '',
          asset_value: '',
          parole_year: '',
          jail_month: '',
          imprison_month: '',
          probation_year: '',
          fine: '',
          sequestrate_list: '',
          case_number: '',
          case_date_time: '',
          driver_province: '',
          driver_district: '',
          driver_subdistrict: '',
          police_station_province: '',
          police_station_district: '',
          police_station_subdistrict: '',
          weight_mobile_dt: '',
          weight_station: {
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
            is_arrested: '',
            vehicle_class: {
              id: '',
              vehicle_class_id: '',
              vehicle_class_id_ref: '',
              vehicle_class_name: '',
              vehicle_class_desc: '',
              legal_weight: '',
              drive_shaft: '',
              drive_shaft_ref: '',
              vehicle_class_desc2: '',
              vehicle_class_desc3: ''
            },
            station: {
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
              department_id: ''
            }
          },
          weight_wim: {
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
            axle14_tire_code: '',
            is_arrested: '',
            vehicle_class: {
              id: '',
              vehicle_class_id: '',
              vehicle_class_id_ref: '',
              vehicle_class_name: '',
              vehicle_class_desc: '',
              legal_weight: '',
              drive_shaft: '',
              drive_shaft_ref: '',
              vehicle_class_desc2: '',
              vehicle_class_desc3: ''
            },
            wim: {
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
              owner: '',
              department_id: ''
            }
          }
        }
      },
    },
    wim: {
      overview: {
        search: {
          plan_year: '',
          start_date: '',
          end_date: '',
          year_type: 'ce_year',
          station_id: '',
          page: 1,
          page_size: 10,
          order: 'ASC',
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
      detail: {
        data: {
          id: '',
          td_id: '',
          station_type: '',
          arrest_date: '',
          driver_name: '',
          address_no: '',
          moo: '',
          soi: '',
          road: '',
          subdistrict: '',
          district: '',
          province: '',
          brand: '',
          officer1: '',
          officer2: '',
          witness1: '',
          witness2: '',
          witness_sender: '',
          book_no: '',
          police_station: '',
          police_station_province_id: '',
          police_station_district_id: '',
          police_station_subdistrict_id: '',
          copy_lp_no: '',
          driver_license_type: '',
          weight_slip_from_company: '',
          process: '',
          consider: '',
          asset_value: '',
          parole_year: '',
          jail_month: '',
          imprison_month: '',
          probation_year: '',
          fine: '',
          sequestrate_list: '',
          case_number: '',
          case_date_time: '',
          driver_province: '',
          driver_district: '',
          driver_subdistrict: '',
          police_station_province: '',
          police_station_district: '',
          police_station_subdistrict: '',
          weight_mobile_dt: '',
          weight_station: '',
          weight_wim: {
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
            axle14_tire_code: '',
            is_arrested: '',
            vehicle_class: {
              id: '',
              vehicle_class_id: '',
              vehicle_class_id_ref: '',
              vehicle_class_name: '',
              vehicle_class_desc: '',
              legal_weight: '',
              drive_shaft: '',
              drive_shaft_ref: '',
              vehicle_class_desc2: '',
              vehicle_class_desc3: ''
            },
            wim: {
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
              owner: '',
              department_id: ''
            }
          }
        }
      }
    },
    mobile: {
      overview: {
        search: {
          plan_year: '',
          start_date: '',
          end_date: '',
          year_type: 'ce_year',
          department_id: '',
          page: 1,
          page_size: 10,
          order: 'ASC',
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
      detail: {
        data: {
          id: '',
          td_id: '',
          station_type: '',
          arrest_date: '',
          driver_name: '',
          address_no: '',
          moo: '',
          soi: '',
          road: '',
          subdistrict: '',
          district: '',
          province: '',
          brand: '',
          officer1: '',
          officer2: '',
          witness1: '',
          witness2: '',
          witness_sender: '',
          book_no: '',
          police_station: '',
          police_station_province_id: '',
          police_station_district_id: '',
          police_station_subdistrict_id: '',
          copy_lp_no: '',
          driver_license_type: '',
          weight_slip_from_company: '',
          process: '',
          consider: '',
          asset_value: '',
          parole_year: '',
          jail_month: '',
          imprison_month: '',
          probation_year: '',
          fine: '',
          sequestrate_list: '',
          case_number: '',
          case_date_time: '',
          driver_province: '',
          driver_district: '',
          driver_subdistrict: '',
          police_station_province: '',
          police_station_district: '',
          police_station_subdistrict: '',
          weight_mobile_dt: {
            td_id: '',
            time_stamp: '',
            vehicle_class_id: '',
            is_over_weight: '',
            t_id: '',
            enfid: '',
            material_name: '',
            lp_head_no: '',
            lp_head_province: '',
            lp_tail_no: '',
            lp_tail_province: '',
            drive_shaft: '',
            ds1: '',
            ds2: '',
            ds3: '',
            ds4: '',
            ds5: '',
            ds6: '',
            ds7: '',
            gross_weight: '',
            gross_weight_over: '',
            legal_weight: '',
            driver_name: '',
            drive_shaft_over: '',
            address_no: '',
            moo: '',
            soi: '',
            road: '',
            subdistrict: '',
            district: '',
            province: '',
            brand: '',
            officer1: '',
            officer2: '',
            witness1: '',
            witness2: '',
            witness_sender: '',
            book_no: '',
            police_station: '',
            copy_lp_no: '',
            driver_license_type: '',
            weight_slip_from_company: '',
            process: '',
            consider: '',
            asset_value: '',
            parole_year: '',
            jail_month: '',
            imprison_month: '',
            probation_Year: '',
            fine: '',
            sequestrate_list: '',
            case_number: '',
            case_date_time: '',
            accept_weight: '',
            accept_weight_By: '',
            edit_weight: '',
            edit_weight_By: '',
            is_arrested: '',
            vehicle_class: {
              id: '',
              vehicle_class_id: '',
              vehicle_class_id_ref: '',
              vehicle_class_name: '',
              vehicle_class_desc: '',
              legal_weight: '',
              drive_shaft: '',
              drive_shaft_ref: '',
              vehicle_class_desc2: '',
              vehicle_class_desc3: ''
            },
            master: {
              t_id: '',
              department_id: '',
              department_group: '',
              department_type: '',
              way_id: '',
              way_code: '',
              way_name: '',
              way_subdistrict: '',
              way_district: '',
              way_province: '',
              city: '',
              province: '',
              km_from: '',
              km_to: '',
              create_date: '',
              time_from: '',
              time_to: '',
              is_open: '',
              latitude: '',
              longitude: '',
              collaboration: '',
              police_station: '',
              operator: '',
              department: {
                id: '',
                name: '',
                type: '',
                group: '',
                province: '',
                group_drr: '',
                station_id: '',
                office_no: '',
                name2: ''
              },
              waynetwork: ''
            }
          },
          weight_station: '',
          weight_wim: ''
        }
      },
      truckdetail: {
        data: {
          td_id: "",
          time_stamp: "",
          vehicle_class_id: null,
          is_over_weight: "",
          t_id: "",
          enfid: null,
          material_name: "",
          lp_head_no: "",
          lp_head_province: "",
          lp_tail_no: null,
          lp_tail_province: null,
          drive_shaft: null,
          ds1: "",
          ds2: "",
          ds3: "",
          ds4: "",
          ds5: "",
          ds6: "",
          ds7: "",
          gross_weight: "",
          gross_weight_over: "",
          legal_weight: "",
          driver_name: null,
          drive_shaft_over: null,
          address_no: null,
          moo: null,
          soi: null,
          road: null,
          subdistrict: null,
          district: null,
          province: null,
          brand: null,
          officer1: null,
          officer2: null,
          witness1: null,
          witness2: null,
          witness_sender: null,
          book_no: null,
          police_station: null,
          copy_lp_no: null,
          driver_license_type: null,
          weight_slip_from_company: null,
          process: null,
          consider: null,
          asset_value: null,
          parole_year: null,
          jail_month: null,
          imprison_month: null,
          probation_Year: null,
          fine: null,
          sequestrate_List: null,
          case_number: null,
          case_date_time: null,
          accept_weight: null,
          accept_weight_By: null,
          edit_weight: null,
          edit_weight_By: null,
          is_arrested: null,
          master: {
            t_id: "",
            department_id: null,
            department_group: null,
            department_type: null,
            way_id: null,
            way_code: "",
            way_name: "",
            way_subdistrict: "",
            way_district: "",
            way_province: "",
            city: null,
            province: null,
            km_from: "",
            km_to: "",
            create_date: "",
            time_from: "",
            time_to: "",
            is_open: 0,
            latitude: null,
            longitude: null,
            collaboration: "",
            police_station: null,
            operator: "",
            department: {
              id: null,
              name: "",
              type: null,
              group: null,
              province: "",
              group_drr: null,
              station_id: null,
              office_no: null,
              name2: ""
            }
          },
          vehicle_class: {
            id: null,
            vehicle_class_id: null,
            vehicle_class_id_ref: null,
            vehicle_class_name: "",
            vehicle_class_desc: "",
            legal_weight: "",
            drive_shaft: "",
            drive_shaft_ref: "",
            vehicle_class_desc2: "",
            vehicle_class_desc3: "",
            vehicle_ds_limit: {
              vehicle_class_id: null,
              dsl1_no: "",
              dsl1_Limit: "",
              dsl2_no: "",
              dsl2_Limit: "",
              dsl3_no: null,
              dsl3_Limit: null
            }
          }
        }
      }
    },
    arres: {
      data: {

      }
    }
  },
  collaboration_and_integration: {
    collaboration: {
      search: {
        date: '',
        department_id: '',
        way_id: '',
        collaboration: '',
        page: 1,
        page_size: 10,
        order: 'ASC'
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
  },
  vehicle_data_on_routes: {
    item_sum: {
      search: {
        page: 1,
        page_size: 20,
        road_codes: []
      },
      data: {
        items: [],
        sum: {
          total_vehicles: 0,
          stationary_vehicles: 0,
          moving_vehicles: 0,
          average_speed_moving_vehicles_km_h: 0
        }
      },
      meta: {
        page: 1,
        page_size: 10,
        total: 0,
        page_count: 0,
        has_previous_page: false,
        has_next_page: false
      }
    },
    top_vehicle: {
      search: {
        limit: 5,
        start_date: '',
        end_date: ''
      },
      data: []
    },
    current_vehicle_status: {
      search: {
        page: 1,
        page_size: 20,
        order: 'DESC',
        road_code: [],
        is_on_assigned_road: false
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
    current_vehicle_status2: {
      search: {
        page: 1,
        page_size: 20,
        order: 'DESC',
        road_code: [],
        is_on_assigned_road: false
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
    current_vehicle_status_summary: {
      overview: {
        search: {
          page: 1,
          page_size: 20,
          order: 'DESC',
          road_codes: []
        },
        data: [],
        meta: {
          page: 1,
          page_size: 20,
          total: {
            total: 0
          },
          page_count: 0,
          has_previous_page: false,
          has_next_page: false
        }
      },
      detail: {
        road_code: '',
        road_name: '',
        total_vehicles: '',
        stationary_vehicles: '',
        moving_vehicles: '',
        average_speed_moving_vehicles_km_h: ''
      }
    }
  },
  report: {},
  gps: {
    overview: {
      search: {},
      data: {
        list: [],
        total: {
          normal: 0,
          stop: 0,
          over_weight: 0,
          unique_vehicles: 0
        }
      }
      // data: {
      //   vehicle_count: {
      //     normal_vehicle_count: 0,
      //     not_moving_count: 0,
      //     over_weight_history: 0
      //   },
      //   car_list: [],
      //   roads: []
      // }
    },
    detail: {
      // search: {
      //   way_name: ''
      // },
      // data: {
      //   vehicle_count: {
      //     normal_vehicle_count: 0,
      //     not_moving_count: 0,
      //     over_weight_history: 0
      //   },
      //   car_list: [],
      //   geom_road: []
      // }
      search: {
        road_id: '',
      },
      vehicle_location: {
        car_list: [],
        vehicle_count: {
          normal_vehicle_count: 0,
          not_moving_count: 0,
          over_weight_history: 0
        }
      },
      geo_road: {
        route_name: '',
        road_code: '',
        length_drr: '',
        province: '',
        position: []
      }
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
    getWorkPlans: (state, action) => {
      state.unit_establishment_plan.workplans.data = action.payload.data.data,
        state.unit_establishment_plan.workplans.meta = action.payload.data.meta,
        state.unit_establishment_plan.workplans.search = action.payload.params
    },
    getCollaboration: (state, action) => {
      state.collaboration_and_integration.collaboration.data = action.payload.data.data,
        state.collaboration_and_integration.collaboration.meta = action.payload.data.meta,
        state.collaboration_and_integration.collaboration.search = action.payload.params
    },
    // GET OVERWEIGHT DATA
    getStationOverview: (state, action) => {
      state.overweight_vehicle.stationary.overview.search = action.payload.params,
        state.overweight_vehicle.stationary.overview.data = action.payload.data.data,
        state.overweight_vehicle.stationary.overview.meta = action.payload.data.meta
    },
    getWIMOverview: (state, action) => {
      state.overweight_vehicle.wim.overview.search = action.payload.params,
        state.overweight_vehicle.wim.overview.data = action.payload.data.data,
        state.overweight_vehicle.wim.overview.meta = action.payload.data.meta
    },
    getMobileOverview: (state, action) => {
      state.overweight_vehicle.mobile.overview.search = action.payload.params,
        state.overweight_vehicle.mobile.overview.data = action.payload.data.data,
        state.overweight_vehicle.mobile.overview.meta = action.payload.data.meta
    },
    getStationDetail: (state, action) => {
      state.overweight_vehicle.stationary.detail.data = action.payload.data.data
    },
    getWIMDetail: (state, action) => {
      state.overweight_vehicle.wim.detail.data = action.payload.data.data
    },
    getMobileDetail: (state, action) => {
      state.overweight_vehicle.mobile.detail.data = action.payload.data.data
    },
    getTruckDetail: (state, action) => {
      state.overweight_vehicle.mobile.truckdetail.data = action.payload
    },
    getArresDetail: (state, action) => {
      state.overweight_vehicle.arres.data = action.payload.data.data
    },
    // CLEAR OVERWEIGHT DATA
    clearStationOverview: (state) => {
      state.overweight_vehicle.stationary.overview.search = initialState.overweight_vehicle.stationary.overview.search
    },
    clearWIMOverview: (state) => {
      state.overweight_vehicle.wim.overview.search = initialState.overweight_vehicle.wim.overview.search
    },
    clearMobileOverview: (state) => {
      state.overweight_vehicle.mobile.overview.search = initialState.overweight_vehicle.mobile.overview.search
    },
    clearCollaboration: (state) => {
      state.collaboration_and_integration.collaboration.search = initialState.collaboration_and_integration.collaboration.search
    },
    clearWorkPlans: (state) => {
      state.unit_establishment_plan.workplans.search = initialState.unit_establishment_plan.workplans.search
    },
    // GET ITEM SUM
    getItemSum: (state, action) => {
      state.vehicle_data_on_routes.item_sum.search = action.payload.params,
        state.vehicle_data_on_routes.item_sum.data = action.payload.data.data,
        state.vehicle_data_on_routes.item_sum.meta = action.payload.data.meta
    },
    getTopVehicle: (state, action) => {
      state.vehicle_data_on_routes.top_vehicle.search = action.payload.params,
        state.vehicle_data_on_routes.top_vehicle.data = action.payload.data.data
    },
    getRoadDetail: (state, action) => {
      state.vehicle_data_on_routes.current_vehicle_status_summary.detail = action.payload.data.data
    },
    // GET VEHICLE STATUS
    getVehicleStatus: (state, action) => {
      state.vehicle_data_on_routes.current_vehicle_status.search = action.payload.params,
        state.vehicle_data_on_routes.current_vehicle_status.data = action.payload.data.data,
        state.vehicle_data_on_routes.current_vehicle_status.meta = action.payload.data.meta
    },
    getVehicleStatus2: (state, action) => {
      state.vehicle_data_on_routes.current_vehicle_status2.search = action.payload.params,
        state.vehicle_data_on_routes.current_vehicle_status2.data = action.payload.data.data,
        state.vehicle_data_on_routes.current_vehicle_status2.meta = action.payload.data.meta
    },
    getGPSOverview: (state, action) => {
      state.gps.overview.search = action.payload.params,
        state.gps.overview.data = action.payload.data.data
    },
    getGPSDetail: (state, action) => {
      state.gps.detail.search = action.payload.params,
        state.gps.detail.data = action.payload.data.data
    },
    getVehicleLocation: (state, action) => {
      state.gps.detail.search = action.payload.params,
        state.gps.detail.vehicle_location = action.payload.data.data
    },
    getGeoRoad: (state, action) => {
      state.gps.detail.search = action.payload.params,
        state.gps.detail.geo_road = action.payload.data.data
    }
  }
})

export const {
  // UNIT ESTABLISHMENT PLAN
  getWorkPlans,
  // COLLABORATION AND INTEGRATION
  getCollaboration,
  // OVERWEIGHT VEHICLE
  getStationOverview,
  getWIMOverview,
  getMobileOverview,
  getStationDetail,
  getWIMDetail,
  getMobileDetail,
  getTruckDetail,
  getArresDetail,
  // CLEAR REDUCER 
  clearStationOverview,
  clearWIMOverview,
  clearMobileOverview,
  clearWorkPlans,
  clearCollaboration,
  // ITEM SUM
  getItemSum,
  getTopVehicle,
  getRoadDetail,
  // VEHICLE STATUS
  getVehicleStatus,
  getVehicleStatus2,
  // GPS
  getGPSOverview,
  getGPSDetail,
  getVehicleLocation,
  getGeoRoad
} = slice.actions

export default slice.reducer
