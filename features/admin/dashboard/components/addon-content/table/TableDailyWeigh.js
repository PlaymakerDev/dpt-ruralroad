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
      align: 'center'
    },
    {
      title: 'จำนวนรถน้ำหนักเกิน',
      key: 'over',
      dataIndex: 'over',
      align: 'center'
    }
  ];

  return (
    <Table
      dataSource={data || []}
      columns={columns}
      scroll={{ x: 400, y: 500 }}
      loading={loading}
      pagination={false}
      className="daily-weigh-table"
      onRow={(record) => {
        if (type === 'sum_wim' && !accessType) {
          return {
            onClick: () => router.push({
              pathname: `/admin/project-info/wim-dashboard/${record.station_id}`,
              query: {
                total: record.total,
                over: record.over,
                name: record.name,
                type: '3'
              }
            })
          }
        }
      }}
    />
  );
};

export default React.memo(TableDailyWeigh);
