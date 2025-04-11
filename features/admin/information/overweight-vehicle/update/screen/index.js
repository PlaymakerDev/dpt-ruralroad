import React, { useEffect, useMemo } from 'react'
import MainContent from '../components/content/MainContent'
import { Spin, Typography } from 'antd'
import ArresForm from '../components/new/ArresForm'
import { getArresDetail } from '@/store/features/informationSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI'

const UpdateScreen = (props) => {
  const { id, type, is_arrested, query } = props
  console.log('is_arrested', is_arrested)
  console.log('query', query)


  const [apiGetArres, arresLoading, arresData] = useGetAPI('overlay', {
    funcDispatch: getArresDetail, reducerName: 'information', reducerKey: 'overweight_vehicle'
  })

  useEffect(() => {
    if (query?.is_arrested == 1)
      apiGetArres(`/api/v1/arrest_record/${query?.arrest_id}`, {}, false)
  }, [])

  console.log('arres data',query?.is_arrested)


  const renderForm = useMemo(() => {
    if (query?.is_arrested == 1) {
      if (arresLoading) {
        return (
          <ArresForm
            query={query}
            data={arresData?.arres?.data}
          />
        )
      } else {
        return <Spin loading={true} />
      }
    }else{
      return (
        <ArresForm
          query={query}
          data={{}}
        />
      )
    }
  }, [arresData, query])

  return (
    <>
      {/* <section>
        <Typography.Title level={3} className='!m-0 border text-center'>ข้อมูลบันทึกจับกุม</Typography.Title>
      </section> */}
      <section className='mt-5'>
        {renderForm}
      </section>
    </>
  )
}

export default React.memo(UpdateScreen)
