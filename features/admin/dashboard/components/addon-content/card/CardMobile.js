import React, { useEffect, useMemo } from 'react'
import { Card, Spin } from 'antd'
import { ChartMobile } from '../chart'
// import { useAppSelector } from '@/store/hooks'
import { getViewSumPlanChart, } from '@/store/features/dashboardSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI'

const CardMobile = (props) => {
  const { } = props
  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getViewSumPlanChart, reducerName: 'dashboard', reducerKey: 'view_sum_plan_chart'
  })

  useEffect(() => {
    apiGetData(`/api/v1/dashboards/view_sum_plan_chart`, {}, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderContent = useMemo(() => {
    if (!loading) {
      return (
        <ChartMobile
          data={data.data}
          // loading={loading?.loading}
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
    <Card className='!w-full !h-full '>
      {renderContent}
    </Card>
  )
}

export default React.memo(CardMobile)
