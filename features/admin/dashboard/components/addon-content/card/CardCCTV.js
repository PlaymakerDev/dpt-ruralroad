import React, { useEffect, useMemo } from 'react'
import { ContentCCTV } from './content'
// REDUX-STATE
// import { useAppSelector } from '@/store/hooks'
import { getCCTV } from '@/store/features/dashboardSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { Spin } from 'antd'

const CardCCTV = (props) => {
  const { } = props
  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getCCTV, reducerName: 'dashboard', reducerKey: 'cctv'
  })

  useEffect(() => {
    apiGetData(`/api/v1/dashboards/cctv`, {}, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderContent = useMemo(() => {
    if (!loading) {
      return (
        <ContentCCTV
          data={data.data}
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
    <div>
      {renderContent}
    </div>
    // <section className='!h-full !w-full flex items-end'>
    //   <div className='!w-full !h-full '>
    //     {renderContent}
    //   </div>
    // </section>
  )
}

export default React.memo(CardCCTV)
