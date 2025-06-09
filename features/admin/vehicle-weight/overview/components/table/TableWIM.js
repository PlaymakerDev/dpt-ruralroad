import React from 'react'
import { Table } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { calculate_index } from '@/utils/calculator'
import stf from '@/utils/stringformat'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { REMARK } from '@/utils/constant'

dayjs.extend(customParseFormat);

const TableWIM = (props) => {
  const { data, loading, page, perPage, total, onChange, step, setStep, setCurrentStep, setDetailProps } = props

  // const mock_data = [
  //   {
  //     no: "1",
  //     date: "13 สิงหาคม 2567",
  //     station: "ราชบุรี",
  //     amount: "129",
  //     overweight_vehicle: "88",
  //   },
  //   {
  //     no: "2",
  //     date: "14 สิงหาคม 2567",
  //     station: "ขอนแก่น",
  //     amount: "500",
  //     overweight_vehicle: "198",
  //   },
  // ]

  const columns = [
    {
      title: "ลำดับ",
      key: "no",
      dataIndex: "no",
      align: 'center',
      width: 100,
      render: (item, record, index) => {
        return stf(calculate_index(index, page, perPage, total)).normal()
      }
    },
    {
      title: "วันที่",
      key: "date_time_ct",
      dataIndex: "date_time_ct",
      width: 200,
      render: (item, record) => {
        if (item) {
          return dayjs(item).locale('th').format('DD MMMM BBBB')
        }
        return '-'
      },
      sorter: (a, b) => dayjs(a.date_time_ct).unix() - dayjs(b.date_time_ct).unix()
    },
    {
      title: "สถานี",
      key: "station_name",
      dataIndex: "station_name",
      width: 200,
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: "จำนวนรถเข้าชั่ง",
      key: "total",
      dataIndex: "total",
      align: 'center',
      width: 200,
      render: (item) => {
        if (typeof item === 'undefined') {
          return
        }
        return Number(item)
      },
      sorter: (a, b) => Number(a.total) - Number(b.total)
    },
    {
      title: "รถบรรทุกน้ำหนักเกิน",
      key: "total_over",
      dataIndex: "total_over",
      align: 'center',
      width: 200,
      render: (item) => {
        if (typeof item === 'undefined') {
          return
        }
        return Number(item)
      }
    },
    {
      title: "หมายเหตุ",
      key: "remark",
      dataIndex: "remark",
      align: 'center',
      width: 200,
      render: (item) => {
        if (item) {
          // return REMARK[item]
          return item
        }
        return '-'
      }
    },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      width: 100,
      render: (item, record) => {
        return (
          <RightOutlined
            className='!cursor-pointer'
            onClick={() => {
              setDetailProps({
                start_date: record.date_time_ct,
                end_date: record.date_time_ct,
                station_id: record.station_id
              })
              setStep(step + 1);
              setCurrentStep((prev) => ({
                ...prev,
                in_detail: true
              }))
            }}
          />
        )
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
      rowClassName='!cursor-pointer'
      onRow={(record) => ({
        onClick: () => {
          setDetailProps({
            start_date: record.date_time_ct,
            end_date: record.date_time_ct,
            station_id: record.station_id
          })
          setStep(step + 1);
          setCurrentStep((prev) => ({
            ...prev,
            in_detail: true
          }))
        },
      })}
      scroll={{ x: 1600 }}
    />
  )
}

export default React.memo(TableWIM)
