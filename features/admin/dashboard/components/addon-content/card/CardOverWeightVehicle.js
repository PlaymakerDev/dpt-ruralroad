import React, { useCallback, useMemo, useEffect } from 'react'
import { Card, Spin } from 'antd'
import { ContentOverWeightVehicle } from './content'
// import { useAppSelector } from '@/store/hooks'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
// import { getWayDisplay } from '@/store/features/dashboardSlice'
import { getAllWeightOver } from '@/store/features/dashboardSlice'

const CardOverWeightVehicle = (props) => {
  const { } = props
  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getAllWeightOver, reducerName: 'dashboard', reducerKey: 'all_weight_over'
  })

  useEffect(() => {
    apiGetData(`/api/v1/dashboards/all_weight_over`, {  }, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const renderContent = useMemo(() => {
    if (!loading) {
      return (
        <ContentOverWeightVehicle
          data={{
            data: data,
          }}
        />
      )
    } else {
      return (
        <div className='text-center'>
          <Spin spinning={loading} />
        </div>
      )
    }
  }, [loading, data])

  return (
    <Card className='!w-full !h-full' body={{ padding: '1rem', margin: 0 }}>
      {renderContent}
    </Card>
  )
}

export default React.memo(CardOverWeightVehicle)
