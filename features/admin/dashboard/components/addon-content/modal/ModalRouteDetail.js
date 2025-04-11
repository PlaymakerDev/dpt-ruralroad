import React, { useCallback, useEffect, useMemo } from 'react'
import { Modal, Row, Col, Spin, Button } from 'antd'
import { TableRouteDetail } from '../table'
import { useAppSelector } from '@/store/hooks'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getVehicleStatus, getVehicleStatus2 } from '@/store/features/informationSlice'
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('@/components/map/Map.js'), { ssr: false })

const Content = (props) => {
  const { data, info, loading, onReloadMap, apiGetRoad, table, loadTable, apiGetTable } = props

  const onChangePage = useCallback((page, perPage) => {
    apiGetTable('/api/v1/info/current_vehicle_status', { ...table.search, page: page, page_size: perPage })
  }, [apiGetTable, table])

  const mapGeographicData = useMemo(() => {
    const curr_data = data?.data?.map((item, index) => {
      return {
        has_overweight_history: item.has_overweight_history,
        plate: item.plate,
        type_desc: item.type_desc,
        kind_desc: item.kind_desc,
        wheel_desc: item.wheel_desc,
        distance_from_road: item.distance_from_road,
        wgt: item.wgt,
        wgt_total: item.wgt_total,
        speed: item.speed,
        coordinates: {
          point: {
            latitude: item.geom.coordinates[1],
            longitude: item.geom.coordinates[0]
          }
        }
      }
    })
    return curr_data
  }, [data])

  const renderMap = useMemo(() => {
    if (!loading) {
      return (
        <Map
          center={[13.736717, 100.523186]}
          zoom={13}
          data={mapGeographicData}
          line={info}
          allowPopup
          hasLine
        />
      )
    } else {
      return <Spin spinning={loading} />
    }
  }, [mapGeographicData, info, loading])

  return (
    <main>
      <section className='mb-3'>
        <Button
          type='primary'
          htmlType='button'
          onClick={() => onReloadMap()}
        // loading={loadingRoad}
        >
          อัปเดทข้อมูลสายทาง
        </Button>
      </section>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          {renderMap}
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <TableRouteDetail
            data={table.data}
            loading={loadTable}
            // PAGE
            page={table.search.page}
            perPage={table.search.page_size}
            total={table.meta.total}
            onChange={onChangePage}
          />
        </Col>
      </Row>
    </main>
  )
}

const ModalRouteDetail = (props) => {
  const { open, info, setOpen } = props

  const [apiGetRoad, loadingRoad, road] = useGetAPI('overlay', {
    funcDispatch: getVehicleStatus, reducerName: 'information', reducerKey: 'vehicle_data_on_routes'
  })

  const [apiGetTable, loadingTable, table] = useGetAPI('overlay', {
    funcDispatch: getVehicleStatus2, reducerName: 'information', reducerKey: 'vehicle_data_on_routes'
  })

  useEffect(() => {
    if (open) {
      // LOAD MAP
      apiGetRoad(`/api/v1/info/current_vehicle_status`, {
        ...road.current_vehicle_status.search,
        page: 1,
        page_size: 50000,
        road_codes: [info.road_code],
        is_on_assigned_road: true
      }, false)
      // LOAD TABLE
      apiGetTable(`/api/v1/info/current_vehicle_status`, {
        ...table.current_vehicle_status2.search,
        page: 1,
        page_size: 10,
        road_codes: [info.road_code],
        is_on_assigned_road: true
      }, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onReloadMap = useCallback(() => {
    apiGetRoad(`/api/v1/info/current_vehicle_status`, {
      ...road.current_vehicle_status.search,
      page: 1,
      page_size: 50000,
      road_codes: [info.road_code],
      is_on_assigned_road: true
    }, false)
  }, [apiGetRoad, road.current_vehicle_status.search, info.road_code])

  const renderContent = useMemo(() => {
    return (
      <Content
        // MAP DATA
        data={road.current_vehicle_status}
        info={info}
        loading={loadingRoad}
        onReloadMap={onReloadMap}
        apiGetRoad={apiGetRoad}
        // TABLE DATA
        table={table.current_vehicle_status2}
        loadTable={loadingTable}
        apiGetTable={apiGetTable}
      />
    )
  }, [
    road.current_vehicle_status,
    info,
    loadingRoad,
    onReloadMap,
    apiGetRoad,
    table.current_vehicle_status2,
    loadingTable,
    apiGetTable
  ])

  return (
    <Modal
      title={`ข้อมูลรถบรรทุก สายทาง ${info?.road_code || '-'}`}
      open={open}
      destroyOnClose
      onCancel={() => setOpen({ open: false, info: {} })}
      width={1400}
      footer={false}
    >
      <main className='my-5'>
        {renderContent}
      </main>
    </Modal>
  )
}

export default React.memo(ModalRouteDetail)
