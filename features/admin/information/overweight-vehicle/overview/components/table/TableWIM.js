import React from "react";
import { Table, Typography } from "antd";
import { EditOutlined, FileTextOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const TableMobile = (props) => {
  const { } = props;
  const router = useRouter()

  const data = [
    {
      no: "1",
      date: "09 สิงหาคม 2567 20:54:23",
      department: "ระยอง",
      route: "รย.5002",
      car_license: "99-1678 กรุงเทพฯ",
      vehicle_type: "ประเภท 5 3 เพลา 10 เส้น",
      legal_weight: "25.0",
      measured_weight: "31.109",
      excess_weight: "6.608",
      excess_axie: "-",
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
      title: "วัน / เวลา",
      key: "date",
      dataIndex: "date",
      width: 200,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "หน่วยงาน",
      key: "department",
      dataIndex: "department",
      width: 200,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "สายทาง",
      key: "route",
      dataIndex: "route",
      width: 150,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "ทะเบียน",
      key: "car_license",
      dataIndex: "car_license",
      width: 200,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "ประเภทรถ",
      key: "vehicle_type",
      dataIndex: "vehicle_type",
      width: 300,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "น้ำหนักตามกฎหมาย ",
      key: "legal_weight",
      dataIndex: "legal_weight",
      align: 'center',
      width: 150,
      render: (item) => {
        return (
          <Typography.Text>{item}</Typography.Text>
        )
      }
    },
    {
      title: "น้ำหนักตามที่ชั่ง ",
      key: "measured_weight",
      dataIndex: "measured_weight",
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
          <Typography.Text className="!text-[#FF4A4A]">{item}</Typography.Text>
        )
      }
    },
    {
      title: "เพลาที่เกิน",
      key: "excess_axie",
      dataIndex: "excess_axie",
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
            <EditOutlined
              className='!cursor-pointer'
              onClick={() => router.push('/admin/information/overweight-vehicle/update/1')}
            />
            <FileTextOutlined
              className='!cursor-pointer'
              onClick={() => router.push('/admin/information/overweight-vehicle/preview/1')}
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
