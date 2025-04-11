import React, { useContext, useEffect, useMemo } from 'react'
import { FormContent } from '../content'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import {
  getStationDetail as station,
  getWIMDetail as wim,
  getMobileDetail as spot
} from '@/store/features/informationSlice'
import { Spin } from 'antd'
import { TruckDetail } from '@/pages/_app'


const GET_TYPE = {
  'stationary': station,
  'wim': wim,
  'mobile': spot
}

const EXTRA_DATA = {
  '1': 'weight_station',
  '2': 'weight_mobile_dt',
  '3': 'weight_wim',
}

const MainContent = (props) => {
  const { id, type, query } = props

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: GET_TYPE[type], reducerName: 'information', reducerKey: 'overweight_vehicle'
  })

  useEffect(() => {
    if (id && query.is_arrested != '') {
      apiGetData(`/api/v1/info/arrest_logs/by_transaction_with_relation/${id}`, {}, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id,query.is_arrested])

  const renderContent = useMemo(() => {
    if (!loading) {
      return (
        <FormContent
          id={id}
          data={data[type]?.detail.data}
          extra={data[type]?.detail.data[EXTRA_DATA[data[type]?.detail.data?.station_type]]}
          // is_arrested={is_arrested}
          query={query}
        />
      )
    } else {
      return <Spin loading={loading} />
    }
  }, [data, type, loading, id/*, is_arrested*/, query])

  return (
    <div>
      {renderContent}
    </div>
  )
}

export default React.memo(MainContent)
