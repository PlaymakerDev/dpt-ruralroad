import React from 'react'
import { Table, Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { EditOutlined, FileTextOutlined } from '@ant-design/icons';

const TableWeigh = (props) => {
  const { setStep } = props

  const data = [
    {
      key: "1",
      date: "15 สิงหาคม 2567",
      sation: "ปักกิ่ง",
      weighcar: "156",
      weighover: "666",
    },
    {
      key: "2",
      date: "17 สิงหาคม 2567",
      sation: "เกาหลีเหนือ",
      weighcar: "189",
      weighover: "72",
    },
  ]

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "key",
      align: 'center',
    },
    {
      title: "วัน/เวลา",
      dataIndex: "date",
      align: 'center',
    },
    {
      title: "หน่วยงาน",
      dataIndex: "sation",
      align: 'center',
    },
    {
      title: "สายทาง",
      dataIndex: "weighcar",
      align: 'center',
    },
    {
      title: "ทะเบียน",
      dataIndex: "weighover",
      align: 'center',
    },
    // {
    //   title: '',
    //   key: 'operation',
    //   align: 'center',
    //   render: () =>
    //     <Button
    //       icon={<RightOutlined />}
    //       size='small'
    //       htmlType='submit'
    //       type='text'
    //       onClick={() => setStep(2)}
    //     />
    // },
    {
      title: "ประเภทรถ",
      dataIndex: "weighover",
      align: 'center',
    }, {
      title: "น้ำหนักตาม กฎหมาย",
      dataIndex: "weighover",
      align: 'center',
    }, {
      title: "น้ำหนักตามที่ชั่ง",
      dataIndex: "weighover",
      align: 'center',
    }, {
      title: "น้ำหนักที่เกิน",
      dataIndex: "weighover",
      align: 'center',
    }, {
      title: "เพลาที่เกิน",
      dataIndex: "weighover",
      align: 'center',
    },{
      title: '',
      key: 'actions',
      render: (_, record) => (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            // onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            type="text"
            icon={<FileTextOutlined />}
            // onClick={() => handleDelete(record)}
          />
        </span>
      ),
    },
  ]

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{
        // total: 10,
        position: ['bottomCenter']
      }}
    scroll={{ x: 1600 }}
    />
  )
}

export default React.memo(TableWeigh)
