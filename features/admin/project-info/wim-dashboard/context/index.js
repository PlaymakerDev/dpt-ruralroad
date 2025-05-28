import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getLastSevenDays, getRecentWeight, getVehicleClass } from '@/store/features/dashboardSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI'

export const PageContext = createContext(null)

export const WIMProvider = (props) => {
  const { children } = props
  const [stationId, setStationId] = useState('')

  const [apiGetRecentWeight, loadingRecentWeight, recentWeight] = useGetAPI('overlay', {
    funcDispatch: getRecentWeight, reducerName: 'dashboard', reducerKey: 'recent_weight'
  })

  const [apiGetLastSevenDays, loadingLastSevenDays, lastSevenDays] = useGetAPI('overlay', {
    funcDispatch: getLastSevenDays, reducerName: 'dashboard', reducerKey: 'last_seven_days'
  })

  const [apiGetVehicleClass, loadingVehicleClass, vehicleClass] = useGetAPI('overlay', {
    funcDispatch: getVehicleClass, reducerName: 'dashboard', reducerKey: 'vehicle_class'
  })

  useEffect(() => {
    if (stationId) {
      // RECENT WEIGHT
      apiGetRecentWeight('/api/v1/dashboards/recently_weight', {
        station_id: stationId,
        limit: 5
      }, false)
      // LAST 7 DAYS
      apiGetLastSevenDays(`/api/v1/dashboards/last_7_days`, {
        station_id: stationId,
        date_type: 'day'
      }, false, {})
      apiGetVehicleClass(`/api/v1/dashboards/vehicle_class`, {
        station_id: stationId,
        date_type: 'day'
      }, false, {})
    }
  }, [stationId])

  const onSubmit = useCallback((values, station_id) => {
    apiGetLastSevenDays(`/api/v1/dashboards/last_7_days`, {
      station_id: station_id,
      date_type: values.year_budget
    }, false, {})
    apiGetVehicleClass(`/api/v1/dashboards/vehicle_class`, {
      station_id: station_id,
      date_type: values.year_budget
    }, false, {})
  }, [])

  return (
    <PageContext.Provider
      value={{
        setStationId,
        loadingRecentWeight,
        loadingLastSevenDays,
        loadingVehicleClass,
        onSubmit
      }}
    >
      {children}
    </PageContext.Provider>
  )
}

export const useWIMContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useWIMContext must be used within an WIMProvider");
  }
  return context;
};
