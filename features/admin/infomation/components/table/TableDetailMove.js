import React from 'react'
import { Table, Button, Typography } from 'antd'
import { DeleteOutlined , TruckOutlined , CheckCircleOutlined , FileImageOutlined , PlusOutlined} from '@ant-design/icons'

const TableDetailMove = (props) => {
  const { setOpen , setOpenPic } = props

  const data = [
    {
      key: "1",
      date: "15 สิงหาคม 2567",
      time: "32:42:32",
      li: "ทะเบียน : 55-555",
      province: "จังหวัด : ราชบุรี",
      typecar: "ประเภท 2",
      pow: "6 เพลา 22 เส้น",
      weight: "12,000 ตัน" ,
      weiover: "15,000 ตัน",
      staus: "น้ำหนักปกติ"
    },
  ]

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "key",
      align: 'center',
    },
    {
      title: "วันที่ / เวลา",
      dataIndex: "date",
      align: 'center',
      render: (text, record) => (
        <div>
          {record.date}<br />
          {record.time}
        </div>
      ),
    },
    {
      title: "ทะเบียน",
      dataIndex: "li",
      align: 'center',
      render: (text, record) => (
        <div>
          {record.li}<br />
          {record.province}
        </div>
      )
    },
    {
      title: "ประเภทรถ",
      dataIndex: "typecar",
      align: 'center',
      render: (text, record) => (
        <div>
          {record.typecar}<br />
          {record.pow}
        </div>
      )
    },
    {
      title: "น้ำหนักรวม(ตัน)",
      dataIndex: "weight",
      align: 'center',
    },
    {
      title: "น้ำหนักกฏหมาย(ตัน)",
      dataIndex: "weiover",
      align: 'center',
    },
    {
      title: "สถานะ",
      dataIndex: "staus",
      align: 'center',
    },
    {
      title: 'รูปรถเข้าชั่ง',
      key: 'operation',
      align: 'center',
      render: () =>
        <Button
          icon={<FileImageOutlined />}
          size='small'
          htmlType='submit'
          type='text'
          onClick={() => setOpenPic(true)}
        />
    },
    {
      title: 'ยอมรับ',
      key: 'operation',
      align: 'center',
      render: () =>
        <Button
          icon={<CheckCircleOutlined />}
          size='small'
          htmlType='submit'
          type='text'
        />
    },
    {
      title: '',
      key: 'operation',
      align: 'center',
      render: () =>
        <span>
        <Button
          type="text"
          icon={<DeleteOutlined className="red-icon" style={{ color: '#FF4A4A' }} />}
         />
        <Button
          icon={<TruckOutlined />}
          size='small'
          htmlType='submit'
          type='text'
          onClick={() => setOpen(true)}
        />
        </span>
    }
  ]

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <Typography.Text className='!text-lg font-bold'>
          ข้อมูลรถเข้าชั่ง
        </Typography.Text>
        <Button
            icon={<PlusOutlined />}
            size='large'
            type='primary'
          >
            เพิ่มข้อมูล
        </Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          total:10,
          position: ['bottomCenter']}}
        scroll={{ x: 1600 }}
      />
    </>
  )
}

export default React.memo(TableDetailMove)
