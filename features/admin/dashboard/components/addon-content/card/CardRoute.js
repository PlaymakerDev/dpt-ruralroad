import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Card, Empty, message, Spin, Typography } from 'antd'
import { ModalRouteDetail } from '../modal'
import { ContentRoute } from './content'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getRoadDetailByRoadCode } from '@/store/features/masterSlice'
import { getItemSum } from '@/store/features/informationSlice'
import EmptyIcon from '@/public/images/Empty.svg'
import { div } from '@/utils/calculate'

const INIT_MODAL = { open: false, info: {} }

const CardRoute = (props) => {
  const { } = props
  const [open, setOpen] = useState(INIT_MODAL)
  const [apiGetItemSum, loadItemSum, itemSum] = useGetAPI('overlay', {
    funcDispatch: getItemSum, reducerName: 'information', reducerKey: 'vehicle_data_on_routes'
  })

  const [apiGetRoad, loadGetRoad, roadDetail] = useGetAPI('overlay', {
    funcDispatch: getRoadDetailByRoadCode, reducerName: 'master', reducerKey: 'roads'
  })

  useEffect(() => {
    apiGetItemSum('/api/v1/info/current_vehicle_status/itemsSum', { ...itemSum.item_sum.search, page: 1, page_size: 5 }, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const openModal = useCallback(async (data) => {
    const response = await apiGetRoad(`/api/v1/masters/roads/road_code/${data?.road_code}`, {}, false)
    if (response?.success) {
      setOpen({
        open: true,
        info: response?.data
      })
    } else {
      message.error('Something went wrong')
    }
  }, [apiGetRoad])

  const renderContent = useMemo(() => {
    if (!itemSum?.item_sum?.data?.items?.length) {
      // if (true) {
      return (
        <section className='my-2.5'>
          <Empty
            description={<Typography.Text className='!text-white'>ไม่มีข้อมูลรถในสายทาง</Typography.Text>}
            image={
              <img
                src={`/images/Empty.svg`}
                alt="Empty Icon"
                className="mx-auto w-24 h-24" // จัดกึ่งกลางและกำหนดขนาด
              />
            }
          />
        </section>
      )
    }
    if (!loadItemSum) {
      return (
        <ContentRoute
          data={itemSum?.item_sum?.data?.items}
          openModal={openModal}
        // setOpen={setOpen}
        />
      )
    }
  }, [loadItemSum, itemSum?.item_sum?.data?.items, openModal])

  return (
    <section className='!h-full '>

      <Card className="!h-full !w-full">
        <Typography.Title level={5} style={{ fontSize: 'clamp(1px, 4vw, 15px)' }}>
          5 อันดับสายทางที่มีปริมาณรถบรรทุกมากที่สุด จากข้อมูล GPS ของกรมขนส่งทางบก
        </Typography.Title>
        {loadItemSum ? (
          <div className='!h-24 !w-full flex justify-center items-center'>
            <Spin spinning={loadItemSum} />
          </div>
        ) : renderContent}
      </Card>
      <ModalRouteDetail
        open={open?.open}
        info={open?.info}
        setOpen={setOpen}
      />

    </section>

  )
}

export default React.memo(CardRoute)
