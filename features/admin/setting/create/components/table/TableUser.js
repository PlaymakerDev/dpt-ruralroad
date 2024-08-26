import React, { useState } from "react";
import { Table, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const TableUser = (props) => {
  const { } = props;
  const [selectedRowKey, setSelectedRowKey] = useState(null);

  const handleRadioChange = (e, record) => {
    setSelectedRowKey(record.key);
  };

  const data = [
    {
      key: "1",
      username: "adisai_t",
      name: "นายอดิศัย ทองไทย",
      department: "แขวงทางหลวงชนบทพังงา",
      position: "นายช่างโยธาอาวุโส",
      role: "หัวหน้าหน่วยชั่งน้ำหนัก",
      group: "ผู้ใช้งาน",
    },
    {
      key: "2",
      username: "adisai_t",
      name: "นายอดิศัย ทองไทย",
      department: "แขวงทางหลวงชนบทพังงา",
      position: "นายช่างโยธาอาวุโส",
      role: "หัวหน้าหน่วยชั่งน้ำหนัก",
      group: "ผู้ใช้งาน",
    },
    {
      key: "3",
      username: "adisai_t",
      name: "นายอดิศัย ทองไทย",
      department: "แขวงทางหลวงชนบทพังงา",
      position: "นายช่างโยธาอาวุโส",
      role: "หัวหน้าหน่วยชั่งน้ำหนัก",
      group: "ผู้ใช้งาน",
    },
    {
      key: "4",
      username: "adisai_t",
      name: "นายอดิศัย ทองไทย",
      department: "แขวงทางหลวงชนบทพังงา",
      position: "นายช่างโยธาอาวุโส",
      role: "หัวหน้าหน่วยชั่งน้ำหนัก",
      group: "ผู้ใช้งาน",
    },
  ];

  const columns = [
    {
      title: "",
      key: "radio",
      dataIndex: "radio",
      width: 50,
      render: (_, record) => (
        <Radio
          checked={record.key === selectedRowKey}
          onChange={(e) => handleRadioChange(e, record)}
        />
      ),
    },
    
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
      width: 100,
    },
    {
      title: "ชื่อ-นามสกุล",
      key: "name",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "หน่วยงาน",
      key: "department",
      dataIndex: "department",
      width: 200,
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