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
      width: 100
    },
    {
      title: "ชื่อ-นามสกุล",
      key: "name",
      dataIndex: "name",
      width: 200
    },
    {
      title: "หน่วยงาน",
      key: "department",
      dataIndex: "department",
      width: 200
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      scroll={{ x: 500 }}
      pagination={{
        position: ['bottomCenter']
      }}
    />
  );
};

export default React.memo(TableUser);
