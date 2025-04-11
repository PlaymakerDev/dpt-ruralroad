import React from 'react'
import { Table } from 'antd'

const TableRouteDetail = (props) => {
  const { data, loading, page, perPage, total, onChange } = props

  // const mock_data = [
  //   {
  //     car_license: '80-6822',
  //     province: 'กรุงเทพมหานคร',
  //     km: 4,
  //     type: 'รถพ่วง (ยาง 8 ล้อ)',
  //     overweight_record: 'มีประวัติน้ำหนักเกิน'
  //   },
  //   {
  //     car_license: '80-6822',
  //     province: 'กรุงเทพมหานคร',
  //     km: 4,
  //     type: 'รถพ่วง (ยาง 8 ล้อ)',
  //     overweight_record: 'ขาเบียด'
  //   },
  // ]

  const columns = [
    {
      title: 'ทะเบียนรถ',
      key: 'plate_no',
      dataIndex: 'plate_no',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: 'จังหวัด',
      key: 'plate_province',
      dataIndex: 'plate_province',
      render: (item) => {
        if (item.province_name) {
          return item.province_name
        }
        return '-'
      }
    },
    // {
    //   title: 'จังหวัด',
    //   key: 'province_id',
    //   dataIndex: 'province_id',
    //   render: (item) => {
    //     if (item) {
    //       return item
    //     }
    //     return '-'
    //   }
    // },
    {
      title: 'ระยะทาง',
      key: 'distance_from_road',
      dataIndex: 'distance_from_road',
      render: (item) => {
        if (item) {
          return Math.floor(item)
        }
        return '-'
      }
    },
    {
      title: 'ประเภท',
      key: 'wheel_desc',
      dataIndex: 'wheel_desc',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: 'ประวัติน้ำหนักเกิน',
      key: 'has_overweight_history',
      dataIndex: 'has_overweight_history',
      render: (item) => {
        if (item) {
          return 'มีประวัติ'
        }
        return '-'
      }
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      loading={loading}
      pagination={{
        defaultCurrent: 1,
        defaultPageSize: 100,
        current: page,
        pageSize: perPage,
        total: Number(total) || 0,
        onChange: onChange,
        showSizeChanger: false,
        position: ['bottomCenter']
      }}
      scroll={{ x: 600 }}
    />
  )
}

export default React.memo(TableRouteDetail)
