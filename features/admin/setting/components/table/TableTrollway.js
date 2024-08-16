import React from "react";
import { Table, ConfigProvider, Pagination } from "antd";

const TableTrollway = (props) => {
  const {} = props;

  const data = [
    {
      column_1: "ตก.4049",
      column_2: "จ.3 ผังเมืองรวมเมืองตาก",
      column_3: "ป่ามะม่วง",
      column_4: "เมืองตาก",
      column_5: "ตาก",
      column_6: "แขวงทางหลวงชนบทตาก",
      column_7: "3.513",
      column_8: "",
    },
  ];

  const columns = [
    {
      title: "รหัสสายทาง",
      key: "column_1",
      dataIndex: "column_1",
    },
    {
      title: "ชื่อสายทาง",
      key: "column_2",
      dataIndex: "column_2",
    },
    {
      title: "ตำบล",
      key: "column_3",
      dataIndex: "column_3",
    },
    {
      title: "อำเภอ",
      key: "column_4",
      dataIndex: "column_4",
    },
    {
      title: "จังหวัด",
      key: "column_5",
      dataIndex: "column_5",
    },
    {
      title: "หน่วยงาน",
      key: "column_6",
      dataIndex: "column_6",
    },
    {
      title: "ระยะทาง ",
      key: "column_7",
      dataIndex: "column_7",
    },
    {
      key: "column_8",
      dataIndex: "column_8",
      render: "",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#194250",
          },
        },
        token: {
          colorText: "black",
        },
      }}
    >
      <Table dataSource={data} columns={columns} pagination={false} />
      <Pagination
        align="center"
        style={{ margin: 20 }}
        defaultCurrent={1}
        total={50}
      />
    </ConfigProvider>
  );
};

export default React.memo(TableTrollway);
