import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';

const name = "setting"

export const initialState = {
  troll_way: {
    overview: {
      search: {
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
    detail: {}
  },
  car_go: {
    overview: {
      search: {
        page: 1,
        page_size: 10,
        search: ''
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
  way_network: {
    overview: {
      search: {},
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
  load_material: {
    overview: {
      search: {},
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
  role: {
    overview: {
      search: {
        // search: '',
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
  user: {
    overview: {
      search: {
        // search: '',
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
    ldap: {
      search: {
        search: ''
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
  article: {
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
    getTrollWay: (state, action) => {
      state.troll_way.overview.data = action.payload.data.data,
        state.troll_way.overview.meta = action.payload.data.meta,
        state.troll_way.overview.search = action.payload.params
    },
    getCarGo: (state, action) => {
      state.car_go.overview.data = action.payload.data.data,
        state.car_go.overview.meta = action.payload.data.meta,
        state.car_go.overview.search = action.payload.params
    },
    getRole: (state, action) => {
      state.role.overview.data = action.payload.data.data,
        state.role.overview.meta = action.payload.data.meta,
        state.role.overview.search = action.payload.params
    },
    getArticle: (state, action) => {
      state.article.overview.data = action.payload.data.data,
        state.article.overview.meta = action.payload.data.meta,
        state.article.overview.search = action.payload.params
    },
    clearArticle: (state) => {
      state.article.overview.search = initialState.article.overview.search
    },
    // GET USER
    getUser: (state, action) => {
      state.user.overview.data = action.payload.data.data,
        state.user.overview.meta = action.payload.data.meta,
        state.user.overview.search = action.payload.params
    },
    clearUser: (state) => {
      state.user.overview.search = initialState.user.overview.search
    },
    getLDAP: (state, action) => {
      state.user.ldap.data = action.payload.data.data,
        // state.user.ldap.meta = action.payload.data.meta,
        state.user.ldap.search = action.payload.params
    },
    clearLDAP: (state) => {
      state.user.ldap.search = initialState.user.ldap.search,
        state.user.ldap.data = initialState.user.ldap.data,
        state.user.ldap.meta = initialState.user.ldap.meta
    },
  }
})

export const {
  getTrollWay,
  getArticle,
  clearArticle,
  getCarGo,
  getRole,
  getUser,
  getLDAP,
  clearLDAP,
  clearUser
} = slice.actions

export default slice.reducer
