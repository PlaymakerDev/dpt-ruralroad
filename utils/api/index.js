/* eslint-disable no-throw-literal */
import Axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios'
import config from '@/config'

Axios.defaults.timeout = (1000 * 60) * 3
Axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'

export const axios = Axios.create({
  baseURL: config.hostBackend
})

class ApiClient {
  token
  locale
  onExpire
  axios
  cancelTokenSource
  option
  begin
  end
  constructor(
    apiEndpoint,
    userAuth,
    locale,
    callBegin,
    callEnd,
    onExpire,
    option,
  ) {
    this.token = userAuth?.token
    this.cancelTokenSource = Axios.CancelToken.source()
    this.axios = Axios.create({
      baseURL: apiEndpoint
    })
    this.locale = locale || 'th'
    this.option = option
    this.begin = (name) => callBegin?.(name, this.cancelTokenSource)
    this.end = callEnd
    this.onExpire = onExpire
  }

  _setOption(access, options = {}) {
    return {
      ...options,
      headers: {
        ...access,
        ...options?.headers,
        // lang: this.locale
      },
      cancelToken: this.cancelTokenSource.token
    }
  }

  _checkAuth() {
    return { Authorization: "Bearer " + this.token }
  }

  get(url, options = {}) {
    const access = this._checkAuth()
    return this.axios.get(url, { ...this._setOption(access, options) })
      .catch((reason) => {
        if (reason?.response?.status === 401) {
          this.onExpire()
        }

        throw reason
      })
  }

  post(url, body, options = {}) {
    const access = this._checkAuth()
    return this.axios.post(url, body, { ...this._setOption(access, options) })
      .catch((reason) => {
        if (reason?.response?.status === 401) {
          this.onExpire()
        }

        throw reason
      })
  }

  put(url, body, options = {}) {
    const access = this._checkAuth()
    return this.axios.put(url, body, { ...this._setOption(access, options) })
      .catch((reason) => {
        if (reason?.response?.status === 401) {
          this.onExpire()
        }

        throw reason
      })
  }

  delete(url, options = {}) {
    const access = this._checkAuth()
    return this.axios.delete(url, { ...this._setOption(access, options) })
      .catch((reason) => {
        if (reason?.response?.status === 401) {
          this.onExpire()
        }

        throw reason
      })
  }

  patch(url, body, options = {}) {
    const access = this._checkAuth()
    return this.axios.patch(url, body, { ...this._setOption(access, options) })
      .catch((reason) => {
        if (reason?.response?.status === 401) {
          this.onExpire()
        }

        throw reason
      })
  }
}

const useApiClient = (
  userAuth,
  locale,
  start,
  end,
  onExpire,
) => (
  new ApiClient(config.hostBackend, userAuth, locale, start, end, onExpire)
)

export const useApiService = (
  userAuth,
  locale,
  start,
  end,
  onExpire,
) => (
  new ApiClient(config.host, userAuth, locale, start, end, onExpire)
)

export const ApiServiceArticle = (
  userAuth,
  locale,
  start,
  end,
  onExpire,
) => (
  new ApiClient(config.hostBackendArticle, userAuth, locale, start, end, onExpire)
)

export default useApiClient
