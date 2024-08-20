import React from "react";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TableTrollway = (props) => {
  const { setOpen } = props;

  const data = [
    {
      trollway_code: "ตก.4049",
      trollway_name: "จ.3 ผังเมืองรวมเมืองตาก",
      district: "ป่ามะม่วง",
      sub_district: "เมืองตาก",
      province: "ตาก",
      department: "แขวงทางหลวงชนบทตาก",
      distance: "3.513",
    },
    {
      trollway_code: "ตก.4049",
      trollway_name: "จ.3 ผังเมืองรวมเมืองตาก",
      district: "ป่ามะม่วง",
      sub_district: "เมืองตาก",
      province: "ตาก",
      department: "แขวงทางหลวงชนบทตาก",
      distance: "3.513",
    },
    {
      trollway_code: "ตก.4049",
      trollway_name: "จ.3 ผังเมืองรวมเมืองตาก",
      district: "ป่ามะม่วง",
      sub_district: "เมืองตาก",
      province: "ตาก",
      department: "แขวงทางหลวงชนบทตาก",
      distance: "3.513",
    },
    {
      trollway_code: "ตก.4049",
      trollway_name: "จ.3 ผังเมืองรวมเมืองตาก",
      district: "ป่ามะม่วง",
      sub_district: "เมืองตาก",
      province: "ตาก",
      department: "แขวงทางหลวงชนบทตาก",
      distance: "3.513",
    },
  ];

  const columns = [
    {
      title: "รหัสสายทาง",
      key: "trollway_code",
      dataIndex: "trollway_code",
      width: 100
    },
    {
      title: "ชื่อสายทาง",
      key: "trollway_name",
      dataIndex: "trollway_name",
      width: 300
    },
    {
      title: "ตำบล",
      key: "district",
      dataIndex: "district",
      width: 200
    },
    {
      title: "อำเภอ",
      key: "sub_district",
      dataIndex: "sub_district",
      width: 200
    },
    {
      title: "จังหวัด",
      key: "province",
      dataIndex: "province",
      width: 200
    },
    {
      title: "หน่วยงาน",
      key: "department",
      dataIndex: "department",
      width: 300
    },
    {
      title: "ระยะทาง ",
      key: "distance",
      dataIndex: "distance",
      width: 100
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
              onClick={() => setOpen({ open: true })}
            />
            <DeleteOutlined
              className='!cursor-pointer !text-[#FF4a4a]'
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

export default React.memo(TableTrollway);
