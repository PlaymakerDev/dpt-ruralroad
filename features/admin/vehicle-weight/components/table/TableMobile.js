import React from "react";
import { Table, Typography } from "antd";
import { DeleteOutlined, RightOutlined } from "@ant-design/icons";

const TableMobile = (props) => {
  const { } = props;

  const data = [
    {
      no: '1',
      date: '01 พฤษภาคม 2567',
      start_time: '10:48',
      end_time: '10:48',
      department: 'เพชรบุรี',
      route_code: 'พบ.4019',
      province: 'พระนครศรีอยุธยา',
      collaboration: '-',
      amount: '0',
      excess_weight: '0'
    },
  ];

  const columns = [
    {
      title: "ลำดับ",
      key: "no",
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
      title: "วันที่",
      key: "date",
      dataIndex: "date",
      align: 'center',
      width: 200,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "เวลาจัดตั้ง",
      key: "start_time",
      dataIndex: "start_time",
      align: 'center',
      width: 100,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "เวลาสิ้นสุด",
      key: "end_time",
      dataIndex: "end_time",
      align: 'center',
      width: 100,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "หน่วยที่จัดตั้ง",
      key: "department",
      dataIndex: "department",
      width: 100,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "รหัสสายทาง",
      key: "route_code",
      dataIndex: "route_code",
      width: 150,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "จังหวัด",
      key: "province",
      dataIndex: "province",
      width: 200,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "บูรณาการ",
      key: "collaboration",
      dataIndex: "collaboration",
      align: 'center',
      width: 150,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "จำนวนรถเข้าชั่ง ",
      key: "amount",
      dataIndex: "amount",
      align: 'center',
      width: 150,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "น้ำหนักที่เกิน",
      key: "excess_weight",
      dataIndex: "excess_weight",
      align: 'center',
      width: 150,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      width: 100,
      render: () => {
        return (
          <div className='inline-flex flex-wrap items-center gap-5'>
            <DeleteOutlined
              className='!cursor-pointer !text-[#FF4A4A]'
            />
            <RightOutlined
              className='!cursor-pointer'
            />
          </div>
        )
      }
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      scroll={{ x: 1600 }}
      pagination={{
        position: ['bottomCenter']
      }}
    />
  );
};

export default React.memo(TableMobile);
