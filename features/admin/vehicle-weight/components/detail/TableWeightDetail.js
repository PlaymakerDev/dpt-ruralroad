import React from 'react'
import { Button, Table, Typography } from 'antd'
import { TruckFilled } from '@ant-design/icons'

const TableWeightDetail = (props) => {
  const { setOpen } = props

  const data = [
    {
      no: "1",
      date: "15 สิงหาคม 2567",
      station: "ปักกิ่ง",
      type: "16",
      load_cargo: "ยาดอง",
      tractor_unit_license_plate: "55-555",
      weight: "14.6",
      excess_weight: "00.00",
      legal_weight: "25.00",
      weighing_status: "ไม่เกินพิกัด",
    },
    {
      no: "2",
      date: "05 สิงหาคม 2567",
      station: "ห้องขัง",
      type: "10",
      load_cargo: "ม้า",
      tractor_unit_license_plate: "23-334",
      weight: "30.00",
      excess_weight: "5.00",
      legal_weight: "25.00",
      weighing_status: "เกินพิกัด",
    },
    {
      no: "3",
      date: "20 สิงหาคม 2567",
      station: "ปักกิ่ง",
      type: "6",
      load_cargo: "เป็ด",
      tractor_unit_license_plate: "09-583",
      weight: "24.00",
      excess_weight: "00.00",
      legal_weight: "25.00",
      weighing_status: "ไม่เกินพิกัด",
    },

  ]

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "no",
      align: 'center',
      width: 100
    },
    {
      title: "วันที่",
      key: 'date',
      dataIndex: "date",
      width: 200
    },
    {
      title: "สถานี",
      key: 'station',
      dataIndex: "station",
      align: 'center',
      width: 150
    },
    {
      title: "ประเภท",
      key: 'type',
      dataIndex: "type",
      align: 'center',
      width: 100
    },
    {
      title: "สิ่งของที่บรรทุก",
      key: 'load_cargo',
      dataIndex: "load_cargo",
      align: 'center',
      width: 200
    },
    {
      title: "ทะเบียนหัวลาก",
      key: 'tractor_unit_license_plate',
      dataIndex: "tractor_unit_license_plate",
      align: 'center',
      width: 150
    },
    {
      title: "น้ำหนักที่ชั่ง (ตัน)",
      key: "weight",
      dataIndex: "weight",
      align: 'center',
      width: 100
    },
    {
      title: "น้ำหนักที่เกิน (ตัน)",
      key: "excess_weight",
      dataIndex: "excess_weight",
      align: 'center',
      width: 100,
      render: (item) => {
        if (Number(item) === 0) {
          return <Typography.Text className='!text-[#56E4EE]'>{item}</Typography.Text>
        } else {
          return <Typography.Text className='!text-[#FF4A4A]'>{item}</Typography.Text>
        }
      }
    },
    {
      title: "น้ำหนักตามกฏหมาย (ตัน)",
      key: "legal_weight",
      dataIndex: "legal_weight",
      align: 'center',
      width: 150
    },
    {
      title: "สถานะเข้าชั่ง",
      key: 'weighing_status',
      dataIndex: "weighing_status",
      align: 'center',
      width: 150,
      render: (item, record) => {
        if (Number(record.excess_weight) === 0) {
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

export default React.memo(TableWeightDetail)
