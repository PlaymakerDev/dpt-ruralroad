import React from "react";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const TableUser = (props) => {
  const { } = props;

  const data = [
    {
      username: "adisai_t",
      name: "นายอดิศัย ทองไทย",
      department: "แขวงทางหลวงชนบทพังงา",
      position: "นายช่างโยธาอาวุโส",
      role: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
      group: "ผู้ใช้งาน",
    },
    {
      username: "adisai_t",
      name: "นายอดิศัย ทองไทย",
      department: "แขวงทางหลวงชนบทพังงา",
      position: "นายช่างโยธาอาวุโส",
      role: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
      group: "ผู้ใช้งาน",

    },
    {
      username: "adisai_t",
      name: "นายอดิศัย ทองไทย",
      department: "แขวงทางหลวงชนบทพังงา",
      position: "นายช่างโยธาอาวุโส",
      role: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
      group: "ผู้ใช้งาน",

    },
    {
      username: "adisai_t",
      name: "นายอดิศัย ทองไทย",
      department: "แขวงทางหลวงชนบทพังงา",
      position: "นายช่างโยธาอาวุโส",
      role: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
      group: "ผู้ใช้งาน",

    },
  ];

  const columns = [
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
      width: 200
    },
    {
      title: "ชื่อ-นามสกุล",
      key: "name",
      dataIndex: "name",
      width: 300
    },
    {
      title: "หน่วย",
      key: "department",
      dataIndex: "department",
      width: 200
    },
    {
      title: "ตำแหน่ง",
      key: "position",
      dataIndex: "position",
      width: 200
    },
    {
      title: "หน้าที่",
      key: "role",
      dataIndex: "role",
      width: 200
    },
    {
      title: "กลุ่ม",
      key: "group",
      dataIndex: "group",
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
          <DeleteOutlined className='!cursor-pointer !text-[#FF4a4a]' />
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

export default React.memo(TableUser);
