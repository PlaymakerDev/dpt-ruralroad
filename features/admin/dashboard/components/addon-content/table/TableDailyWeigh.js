import React, { useCallback } from "react";
import { Table, Modal, Typography, Button, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import Bin from "@/components/icon/Bin";
import Edit from "@/components/icon/Edit";
import { calculate_index } from '@/utils/calculator'
import stf from '@/utils/stringformat'
import useDeleteAPI from "@/utils/hooks/api/useDeleteAPI";
import { useSelector } from 'react-redux'
import dayjs from 'dayjs';
import 'dayjs/locale/th'
import { useRouter } from "next/router";

const TableDailyWeigh = (props) => {
  const { data, loading, page, perPage, total, onChange, type, accessType } = props
  console.log("key", type)
  const router = useRouter()

  console.log("[===", data)

  const columns = [
    {
      title: '',
      key: 'name',
      dataIndex: 'name',
      // render: (item, record, index) => {
      //   return stf(calculate_index(index, page, perPage, total)).normal()
      // }
    },
    {
      title: 'จำนวนรถเข้าชั่ง',
      key: 'total',
      dataIndex: 'total',
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }

        return '-'
      }
    },
    {
      title: 'จำนวนรถน้ำหนักเกิน',
      key: 'over',
      dataIndex: 'over',
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }

        return '-'
      }
    },
    {
      title: 'จำนวนรถน้ำหนักเกิน 10%',
      key: 'over_10percent',
      dataIndex: 'over_10percent',
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }

        return '-'
      }
    },
  ];

  return (
    <Table
      dataSource={data || []}
      columns={columns}
      scroll={{ x: 400, y: 500 }}
      loading={loading}
      pagination={false}
      className="daily-weigh-table"
      rowClassName='!cursor-pointer'
      onRow={(record) => {
        if (type === 'sum_wim' && !accessType) {
          return {
            onClick: () => router.push({
              pathname: `/admin/project-info/wim-dashboard/${record.station_id}`,
              query: {
                total: record.total,
                over: record.over,
                over_10percent: record.over_10percent,
                name: record.name,
                type: '3',
                department_id: record.department_id
              }
            })
          }
        } else if (type === 'sum_station' && !accessType) {
          return {
            onClick: () => router.push({
              pathname: `/admin/project-info/station-detail/${record.station_id}`,
              query: {
                prev_name: record.name
                // total: record.total,
                // over: record.over,
                // over_10percent: record.over_10percent,
                // name: record.name,
                // type: '1',
                // department_id: record.department_id
              }
            })
          }
        } else if (type === 'sum_spot' && !accessType) {
          return {
            onClick: () => router.push({
              pathname: `/admin/project-info/mobile-detail/${record.department_id}`,
              query: {
                prev_name: record.name
                // total: record.total,
                // over: record.over,
                // over_10percent: record.over_10percent,
                // name: record.name,
                // type: '2',
                // department_id: record.department_id
              }
            })
          }
        }
      }}
    />
  );
};

export default React.memo(TableDailyWeigh);
