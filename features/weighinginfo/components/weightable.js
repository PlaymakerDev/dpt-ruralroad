import React from "react";
import { Table, Pagination } from "antd";
import Fieldtable from "./fieldtable";

const columns = [
  {
    title: "ลำดับ",
    dataIndex: "key",
  },
  {
    title: "วันที่",
    dataIndex: "date",
  },
  {
    title: "สถานี",
    dataIndex: "sation",
  },
  {
    title: "จำนวนรถเข้าชั่ง",
    dataIndex: "weighcar",
  },
  {
    title: "รถบรรทุกน้ำหนักเกิน",
    dataIndex: "weighover",
  },
];
const data = [
  {
    key: "1",
    date: "15 สิงหาคม 2567",
    sation: "ปักกิ่ง",
    weighcar: "156",
    weighover: "666",
  },
  {
    key: "2",
    date: "17 สิงหาคม 2567",
    sation: "เกาหลีเหนือ",
    weighcar: "189",
    weighover: "72",
  },
];

const Weightable = () => {
  return (
    <div>
      <Fieldtable />
        <Table columns={columns} dataSource={data} pagination={false} />
        <Pagination align="center" style={{ margin: 20 }} defaultCurrent={1} total={50} />
    </div>
  );
};

export default Weightable;
