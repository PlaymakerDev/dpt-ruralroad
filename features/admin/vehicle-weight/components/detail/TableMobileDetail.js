import React, { useState } from 'react'
import { Button, Space, Table, Typography, Image } from 'antd'
import { PictureOutlined, TruckFilled, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'

const TableMobileDetail = (props) => {
  const { setOpenPreview, setOpenVehicle } = props

  const data = [
    {
      no: "1",
      date: "09 สิงหาคม 2567",
      time: '20:54:23',
      vehicle_license_plate: "83-2835",
      province: 'ราชบุรี',
      vehicle_type: "ประเภท 2",
      vehicle_type_detail: '3 เพลา 6 เส้น',
      total_weight: "12.000",
      legal_weight: "15.000",
      weighing_status: "น้ำหนักปกติ",
      vehicle_weighing_image: 'https://i.scdn.co/image/ab67616d0000b273cc68eea0db7110e3b8cca14e',
      is_accept_aggrement: false,
    },
    {
      no: "2",
      date: "09 สิงหาคม 2567",
      time: '20:54:23',
      vehicle_license_plate: "83-2835",
      province: 'ราชบุรี',
      vehicle_type: "ประเภท 2",
      vehicle_type_detail: '3 เพลา 6 เส้น',
      total_weight: "53.500",
      legal_weight: "55.00",
      weighing_status: "น้ำหนักปกติ",
      vehicle_weighing_image: 'https://i.scdn.co/image/ab67616d0000b273cc68eea0db7110e3b8cca14e',
      is_accept_aggrement: false,
    },
    {
      no: "3",
      date: "09 สิงหาคม 2567",
      time: '20:54:23',
      vehicle_license_plate: "83-2835",
      province: 'ราชบุรี',
      vehicle_type: "ประเภท 2",
      vehicle_type_detail: '3 เพลา 6 เส้น',
      total_weight: "17.000",
      legal_weight: "15.000",
      weighing_status: "น้ำหนักเกิน",
      vehicle_weighing_image: 'https://i.scdn.co/image/ab67616d0000b273cc68eea0db7110e3b8cca14e',
      is_accept_aggrement: false,
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
      title: "ทะเบียนหัวลาก",
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
      title: "น้ำหนักรวม (ตัน)",
      key: "total_weight",
      dataIndex: "total_weight",
      align: 'center',
      width: 100,
      render: (item, record) => {
        if (Number(item) < record.legal_weight) {
          return (
            <Typography.Text className='!text-[#56E4EE]'>{item} ตัน</Typography.Text>
          )
        } else {
          return (
            <Typography.Text className='!text-[#FF4A4A]'>{item} ตัน</Typography.Text>
          )
        }
      }
    },
    {
      title: "น้าหนักกฎหมาย(ตัน)",
      key: "legal_weight",
      dataIndex: "legal_weight",
      align: 'center',
      width: 100,
      render: (item) => {
        return (
          <Typography.Text>{item} ตัน</Typography.Text>
        )
      }

    },
    {
      title: "สถานะ",
      key: 'weighing_status',
      dataIndex: "weighing_status",
      align: 'center',
      width: 100,
      render: (item, record) => {
        if (Number(record.total_weight) < Number(record.legal_weight)) {
          return <Typography.Text className='!text-[#56E4EE]'>{item}</Typography.Text>
        } else {
          return <Typography.Text className='!text-[#FF4A4A]'>{item}</Typography.Text>
        }
      }
    },
    {
      title: "รูปรถเข้าชั่ง",
      key: 'vehicle_weighing_image',
      dataIndex: "vehicle_weighing_image",
      align: 'center',
      width: 100,
      render: () => {
        return (
          <Button
            type='primary'
            size='large'
            icon={<PictureOutlined />}
            onClick={() => setOpenPreview({ open: true })}
          />
        )
      }
    },
    {
      title: "ยอมรับ",
      key: 'is_accept_agreement',
      dataIndex: "is_accept_agreement",
      align: 'center',
      width: 100,
      render: (item, record) => {
        if (Number(record.total_weight) > Number(record.legal_weight)) {
          return (
            <CheckCircleOutlined className='!text-xl !cursor-pointer' />
          )
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
          <div className='inline-flex flex-wrap items-center gap-5'>
            <DeleteOutlined
              className='!cursor-pointer !text-[#FF4A4A]'
            />
            <Button
              type='primary'
              icon={<TruckFilled />}
              onClick={() => setOpenVehicle({ open: true })}
            />
          </div>
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

export default React.memo(TableMobileDetail)
