import React from 'react'
import { Button, Space, Table, Typography } from 'antd'
import { TruckFilled } from '@ant-design/icons'
import Image from 'next/image'
import BigTruck from '@/public/images/big-truck.svg'
import SmallTruck from '@/public/images/small-truck.svg'

const TableWIMDetail = (props) => {
  const { setOpen } = props

  const data = [
    {
      no: "1",
      date: "09 สิงหาคม 2567",
      time: '20:54:23',
      vehicle_license_plate: "83-2835",
      province: 'ราชบุรี',
      vehicle_type: "ประเภท 2",
      vehicle_type_detail: '3 เพลา 6 เส้น',
      vehicle_appearance: "big",
      weight: "12.000 ตัน",
      excess_weight_unit: "0.000",
      excess_weight_percentage: "0.0",
      weighing_status: "ปกติ",
    },
    {
      no: "1",
      date: "09 สิงหาคม 2567",
      time: '19:54:23',
      vehicle_license_plate: "70-2245",
      province: 'กรุงเทพฯ',
      vehicle_type: "ประเภท 2",
      vehicle_type_detail: '3 เพลา 6 เส้น',
      vehicle_appearance: "small",
      weight: "53.500 ตัน",
      excess_weight_unit: "0.000",
      excess_weight_percentage: "0.0",
      weighing_status: "ปกติ",
    },
    {
      no: "1",
      date: "09 สิงหาคม 2567",
      time: '18:54:23',
      vehicle_license_plate: "71-7937",
      province: 'ราชบุรี',
      vehicle_type: "ประเภท 2",
      vehicle_type_detail: '3 เพลา 6 เส้น',
      vehicle_appearance: "big",
      weight: "17.000 ตัน",
      excess_weight_unit: "2.000",
      excess_weight_percentage: "12.0",
      weighing_status: "น้ำหนักเกิน",
    },

  ]

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "no",
      align: 'center',
      width: 100,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "วันที่ / เวลา",
      key: 'date',
      dataIndex: "date",
      width: 200,
      render: (item, record) => {
        return (
          <Space direction='vertical'>
            <Typography.Text>{item}</Typography.Text>
            <Typography.Text>{record.time}</Typography.Text>
          </Space>
        )
      }
    },
    {
      title: "ทะเบียน",
      key: 'vehicle_license_plate',
      dataIndex: "vehicle_license_plate",
      width: 200,
      render: (item, record) => {
        return (
          <Space direction='vertical'>
            <Typography.Text>ทะเบียน: {item}</Typography.Text>
            <Typography.Text>จังหวัด: {record.province}</Typography.Text>
          </Space>
        )
      }
    },
    {
      title: "ประเภทรถ",
      key: 'vehicle_type',
      dataIndex: "vehicle_type",
      width: 150,
      render: (item, record) => {
        return (
          <Space direction='vertical'>
            <Typography.Text>{item}</Typography.Text>
            <Typography.Text>{record.vehicle_type_detail}</Typography.Text>
          </Space>
        )
      }
    },
    {
      title: "ลักษณะรถ",
      key: 'vehicle_appearance',
      dataIndex: "vehicle_appearance",
      align: 'center',
      width: 300,
      render: (item) => {
        if (item === 'big') {
          return (
            <Image
              src={BigTruck}
              alt='big-truck'
              className='!block !m-auto'
            />
          )
        } else if (item === 'small') {
          return (
            <Image
              src={SmallTruck}
              alt='small-truck'
              className='!block !m-auto'
            />
          )
        } else {
          return '-'
        }
      }
    },
    {
      title: "น้ำหนักที่ชั่ง",
      key: "weight",
      dataIndex: "weight",
      align: 'center',
      width: 100
    },
    {
      title: "น้ำหนักที่เกิน + %",
      key: "excess_weight_unit",
      dataIndex: "excess_weight_unit",
      align: 'center',
      width: 100,
      render: (item, record) => {
        console.log(item)
        if (Number(item) === 0) {
          return (
            <Space direction='vertical'>
              <Typography.Text className='!text-[#56E4EE]'>{item} ตัน</Typography.Text>
              <Typography.Text className='!text-[#56E4EE]'>{record.excess_weight_percentage}%</Typography.Text>
            </Space>
          )
        } else {
          return (
            <Space direction='vertical'>
              <Typography.Text className='!text-[#FF4A4A]'>{item} ตัน</Typography.Text>
              <Typography.Text className='!text-[#FF4A4A]'>{record.excess_weight_percentage}%</Typography.Text>
            </Space>
          )
        }
      }
    },
    {
      title: "สถานะ",
      key: 'weighing_status',
      dataIndex: "weighing_status",
      align: 'center',
      width: 100,
      render: (item, record) => {
        if (Number(record.excess_weight_unit) === 0) {
          return <Typography.Text className='!text-[#56E4EE]'>{item}</Typography.Text>
        } else {
          return <Typography.Text className='!text-[#FF4A4A]'>{item}</Typography.Text>
        }
      }
    },
    {
      title: '',
      key: 'action',
      dataIndex: "action",
      align: 'center',
      width: 100,
      render: () => {
        return (
          <Button
            type='primary'
            icon={<TruckFilled />}
            onClick={() => setOpen({ open: true })}
          />
        )
      }
    },
  ]

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{
        position: ['bottomCenter']
      }}
      scroll={{ x: 1600 }}
    />
  )
}

export default React.memo(TableWIMDetail)
