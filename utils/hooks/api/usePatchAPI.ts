import React, { useCallback, useEffect, useRef } from 'react'
import useAPI from './useAPI'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { AppState } from '@/store'
import { AxiosError } from 'axios'
import { message } from 'antd'
import { API_PATCH_DATA_SUCCESS, ERROR_MESSAGE_INTERNAL_SERVER_ERROR } from '@/utils/constant'

type ApiResponse<Data> = {
  success: boolean
  response: {
    data: Data,
    message?: string
  }
}

type ApiReducerOpt = {
  funcDispatch: Function
  reducerName: keyof AppState
  reducerKey?: string
}

const usePatchAPI = <Data>(loadType: 'overlay' | 'none' = 'overlay', reducer?: ApiReducerOpt) => {
  const API = useAPI(loadType)
  const dispatch = useAppDispatch()
  const tasksRunning = useAppSelector((state) => state.tasksRunning)
  const data = useAppSelector((state: any) => reducer?.reducerKey ? state[reducer?.reducerName || '']?.[reducer?.reducerKey] : state[reducer?.reducerName || ''])
  const refPath = useRef<string>('')

  const func = useCallback(async (path: string, body: any, params: Record<string, any>, showDefaultMessage: boolean = true) => {
    const name = 'PATCH:' + path
    try {
      API.begin(name)
      refPath.current = name
      const { data } = await API.patch<ApiResponse<Data>>(path, body, { params })

      if (typeof reducer?.funcDispatch === 'function') {
        dispatch(reducer?.funcDispatch(data))
      }

      if (showDefaultMessage) {
        if (data?.response?.message) {
          message.success(data?.response.message)
        } else {
          message.success(API_PATCH_DATA_SUCCESS)
        }
      }

      return data
    } catch (error) {
      if (showDefaultMessage) {
        if (error instanceof AxiosError) {
          if (typeof reducer?.funcDispatch === 'function') {
            dispatch(reducer?.funcDispatch(error.response?.data))
          }
          message.error(error.response?.data?.message, 6)
        } else {
          message.error(ERROR_MESSAGE_INTERNAL_SERVER_ERROR, 6)
        }
      }
      console.log(error);
    } finally {
      API.end(name)
    }

    return { success: false, response: { data: null } } as ApiResponse<Data>
  }, [API, dispatch, reducer])

  const loading = refPath ? tasksRunning[refPath.current]?.loading || false : false

  return [func, loading, data]
}

export default usePatchAPI