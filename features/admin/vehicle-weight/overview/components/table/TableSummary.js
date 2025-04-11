import React from 'react'
import { Table } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const TableSummary = (props) => {
  const { data, loading, page, perPage, total, onChange, formSearch } = props
  const router = useRouter()

  const mock_data = [
    {
      date: "01 พฤษภาคม 2567",
      mobile: "432",
      weight: "432",
      wim: "432",
      highway_region: "0",
      total: "1,296",
    },
    {
      date: "01 พฤษภาคม 2567",
      mobile: "432",
      weight: "432",
      wim: "432",
      highway_region: "0",
      total: "1,296",
    },
  ]

  const columns = [
    {
      title: "วันที่",
      key: "date",
      dataIndex: "date",
      width: 200,
      // sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (item) => {
        if (item) {
          return dayjs(item).locale('th').format('DD MMMM BBBB')
        }
        return '-'
      }
    },
    {
      title: "ด่านชั่งเคลื่อนที่",
      key: "mobile",
      dataIndex: "mobile",
      align: 'center',
      width: 150,
      render: (item) => {
        if (typeof item === 'undefined') {
          return
        }
        return Number(item)
      }
    },
    {
      title: "สถานีชั่งน้ำหนัก",
      key: "station",
      dataIndex: "station",
      align: 'center',
      width: 150,
      render: (item) => {
        if (typeof item === 'undefined') {
          return
        }
        return Number(item)
      }
    },
    {
      title: "Weight in Motion",
      key: "wim",
      dataIndex: "wim",
      align: 'center',
      width: 150,
      render: (item) => {
        if (typeof item === 'undefined') {
          return
        }
        return Number(item)
      }
    },
    {
      title: "สบร.",
      key: "sbr",
      dataIndex: "sbr",
      align: 'center',
      width: 100,
      render: (item) => {
        if (typeof item === 'undefined') {
          return
        }
        return Number(item)
      }
    },
    {
      title: "รวมทั้งหมด",
      key: "total",
      dataIndex: "total",
      align: 'center',
      width: 100,
      render: (item) => {
        if (typeof item === 'undefined') {
          return
        }
        return Number(item)
      }
    },
    {
      title: "",
      key: 'action',
      dataIndex: "action",
      align: 'center',
      width: 50,
      render: (item, record) => {
        return (
          <FileTextOutlined
            className='!cursor-pointer'
            onClick={() => router.push({
              pathname: `/admin/vehicle-weight/preview/1`,
              query: {
                ...formSearch,
                date: record?.date
              }
            })}
          />
        )
      }
    }
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
      onRow={(record) => ({
        onClick: () => {
          router.push({
            pathname: `/admin/vehicle-weight/preview/1`,
            query: {
              ...formSearch, // Passes current search parameters
              date: record?.date, // Includes the date of the clicked row
            },
          });
        },
      })}
      scroll={{ x: 1600 }}
    />
  )
}

export default React.memo(TableSummary)
