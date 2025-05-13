import React, { useContext } from 'react'
import { Card, Table, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router';
import stf from '@/utils/stringformat'
import { calculate_index } from "@/utils/calculator";
import { CctvID } from '@/pages/_app';

const CCTVTable = (props) => {
  const { data, loading, page, perPage, total, onChange, getCCTV } = props

  const columns = [
    {
      title: "ลำดับ",
      key: "no",
      dataIndex: "no",
      align: 'center',
      width: 30,
      render: (item, record, index) => {
        return stf(calculate_index(index, page, perPage, total)).normal()
      }
    },
    {
      title: "จุดติดตั้ง",
      key: "station_description",
      dataIndex: "station_description",
      width: 10,
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: "จำนวนกล้อง",
      key: "total_cameras",
      dataIndex: "total_cameras",
      width: 20,
      render: (item) => {
        if (Number(item)) {
          return <Typography.Text>{Number(item || 0)} กล้อง</Typography.Text>
        }
        return 'ว่างเปล่า'
      }
    },
    {
      title: "ใช้งานได้",
      key: "online_cameras",
      dataIndex: "online_cameras",
      align: 'center',
      width: 30,
      render: (item) => {
        if (item) {
          return <Typography.Text className='!text-green-500'>{Number(item || 0)} กล้อง</Typography.Text>
        }
        return '-'
      }
    },
    {
      title: "ใช้งานไม่ได้",
      key: "offline_cameras",
      dataIndex: "offline_cameras",
      align: 'center',
      width: 30,
      render: (item) => {
        if (item) {
          return <Typography.Text className='!text-red-500'>{Number(item || 0)} กล้อง</Typography.Text>
        }
        return '-'
      }
    },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      width: 50,
      render: (value, record) => {
        return (
          <RightOutlined
            className='!cursor-pointer'
            onClick={() => getCCTV(record)}
          />
        )
      }
    },
  ]

  return (
    <>
      <Card
        className='!h-full !p-0'
        classNames={{
          body: '!p-0'
        }}
      >
        <Table
          columns={columns}
          dataSource={data || []}
          loading={loading}
          onRow={(record) => {
            return {
              onClick: () => getCCTV(record)
            }
          }}
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
          scroll={{ x: 800 }}
        />
      </Card>
    </>
  )
}

export default React.memo(CCTVTable)
