import useGetAPI from '@/utils/hooks/api/useGetAPI'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import {
  getVehicleWeightInspectionForStation as getStation,
  getVehicleWeightInspectionForWIM as getWIM,
  getVehicleWeightInspectionForMobile as getMobile
} from '@/store/features/dashboardSlice'
import dayjs from 'dayjs'

export const PageContext = createContext(null)

export const DashboardProvider = (props) => {
  const { children } = props
  const [apiGetStation, loadingStation, station] = useGetAPI('overlay', {
    funcDispatch: getStation, reducerName: 'dashboard', reducerKey: 'vehicle_weight_inspection'
  })

  const [apiGetWIM, loadingWIM, wim] = useGetAPI('overlay', {
    funcDispatch: getWIM, reducerName: 'dashboard', reducerKey: 'vehicle_weight_inspection'
  })

  const [apiGetMobile, loadingMobile, mobile] = useGetAPI('overlay', {
    funcDispatch: getMobile, reducerName: 'dashboard', reducerKey: 'vehicle_weight_inspection'
  })

  useEffect(() => {
    apiGetStation(`/api/v1/dashboards/vehicle_weight_inspection`, { ...station.station.search, date: dayjs().format('YYYY-MM-DD'), number_day: 6, station_type_id: 1 }, false, {})
    apiGetWIM(`/api/v1/dashboards/vehicle_weight_inspection`, { ...wim.wim.search, date: dayjs().format('YYYY-MM-DD'), number_day: 6, station_type_id: 3 }, false, {})
    apiGetMobile(`/api/v1/dashboards/vehicle_weight_inspection`, { ...mobile.mobile.search, date: dayjs().format('YYYY-MM-DD'), number_day: 6, station_type_id: 2 }, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = useCallback((values) => {
    apiGetStation(`/api/v1/dashboards/vehicle_weight_inspection`, {
      ...station.station.search,
      date: dayjs(values.date).format('YYYY-MM-DD'),
      number_day: 6,
      station_type_id: 1
    }, false, {})
    apiGetWIM(`/api/v1/dashboards/vehicle_weight_inspection`, {
      ...wim.wim.search,
      date: dayjs(values.date).format('YYYY-MM-DD'),
      number_day: 6, station_type_id: 3
    }, false, {})
    apiGetMobile(`/api/v1/dashboards/vehicle_weight_inspection`, {
      ...mobile.mobile.search,
      date: dayjs(values.date).format('YYYY-MM-DD'),
      number_day: 6,
      station_type_id: 2
    }, false, {})
  }, [])

  return (
    <PageContext.Provider
      value={{
        loadingStation,
        loadingWIM,
        loadingMobile,
        onSubmit
      }}
    >
      {children}
    </PageContext.Provider>
  )
}

export const useDashboardContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within an DashboardProvider");
  }
  return context;
};
