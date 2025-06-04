import { useAppSelector } from '@/store/hooks'
import { Table, Tag, Tooltip } from 'antd'
import React from 'react'
import { useWIMContext } from '../../context'
import { RECENT_WEIGHT_STATUS, VEHICLE_PROPERTIES } from '@/utils/constant'
import Image from 'next/image'

const TableSection = (props) => {
  const { openModalWithData } = props
  const tableData = useAppSelector(state => state.dashboard.recent_weight)
  const { loadingRecentWeight } = useWIMContext()

  const columns = [
    {
      title: 'ทะเบียน',
      key: 'license_plate',
      dataIndex: 'license_plate',
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      },
    },
    {
      title: 'น้ำหนัก',
      key: 'weight',
      dataIndex: 'weight',
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      },
    },
    {
      title: 'ประเภทรถ',
      key: 'VehicleClassID',
      dataIndex: 'VehicleClassID',
      align: 'center',
      render: (item, record) => {
        if (item) {
          const newWidth = VEHICLE_PROPERTIES[item]?.vehicle?.width * 0.5
          const newHeight = VEHICLE_PROPERTIES[item]?.vehicle?.height * 0.2

          return (
            <Tooltip title={record?.VehicleClassDesc}>
              <Image
                src={VEHICLE_PROPERTIES[item]?.vehicle?.image}
                alt='vehicle-appearance'
                width={newWidth}
                height={newHeight}
                className='mx-auto'
              />
            </Tooltip>
          )
        }
        return '-'
      }
    },
    {
      title: 'สถานะ',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      render: (item) => {
        return <Tag color={RECENT_WEIGHT_STATUS[item]?.color}>{RECENT_WEIGHT_STATUS[item]?.description}</Tag>
      },
    },
  ]

  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableData.data || []}
        loading={loadingRecentWeight}
        pagination={false}
        onRow={(record) => ({
          onClick: () => {
            openModalWithData(record)
          },
        })}
        rowClassName='!cursor-pointer'
      // pagination={{
      //   defaultCurrent: 1,
      //   defaultPageSize: 5,
      //   current: 1,
      //   pageSize: 5,
      //   total: Number(total) || 0,
      //   onChange: onChange,
      //   showSizeChanger: false,
      //   position: ['bottomCenter']
      // }}
      // scroll={{ x: 1600 }}
      />
    </div>
  )
}

export default React.memo(TableSection)
