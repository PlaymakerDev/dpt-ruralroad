import React, { useContext } from 'react'
import { Card, Table, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router';
import stf from '@/utils/stringformat'
import { calculate_index } from "@/utils/calculator";
import { CctvID } from '@/pages/_app';

const CCTVTable = (props) => {
  const { data, loading, page, perPage, total, onChange } = props
  const { cctvID, setCctvID, cctvPage, setCctvPage } = useContext(CctvID);
  const router = useRouter()

  // const data = [
  //   {
  //     no: "1",
  //     installation_point: "บทช.กัลปพฤกษ์",
  //     amount: "5 กล้อง",
  //     active: "4 กล้อง",
  //     inactive: "1 กล้อง ",
  //   },
  //   {
  //     no: "2",
  //     installation_point: "บทช.นครอินทร์",
  //     amount: "2 กล้อง",
  //     active: "1 กล้อง",
  //     inactive: "-",
  //   },
  // ]

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
        if (item) {
          return <Typography.Text>{Number(item || 0)} กล้อง</Typography.Text>
        }
        return '-'
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
          return <Typography.Text>{Number(item || 0)} กล้อง</Typography.Text>
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
          return <Typography.Text>{Number(item || 0)} กล้อง</Typography.Text>
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
          <RightOutlined className='!cursor-pointer' />
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
          onRow={(record) => ({
            onClick: () => {
              setCctvID(record.department_id)
              router.push({
                pathname: `/admin/cctv/view/${record.department_id}`,
                query: {
                  department_id: record.department_id,
                  station_id: record.station_id,
                  original_station_type: record?.original_station_type
                }
              })
            }
          })}
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
