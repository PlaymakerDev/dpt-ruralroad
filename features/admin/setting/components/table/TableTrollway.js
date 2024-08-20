import React, { useCallback } from "react";
import { Table, ConfigProvider, Pagination, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Color } from "antd/es/color-picker";

const TableTrollway = (props) => {
  const { setOpen } = props;

  const showModal = useCallback(() => {
    Modal.confirm({
      title: "ยืนยันการลบข้อมูล",
      content: "ท่านต้องการยกเลิกการส่งข้อความใช่หรือไม่",
    });
  }, []);

  const data = [
    {
      column_1: "ตก.4049",
      column_2: "จ.3 ผังเมืองรวมเมืองตาก",
      column_3: "ป่ามะม่วง",
      column_4: "เมืองตาก",
      column_5: "ตาก",
      column_6: "แขวงทางหลวงชนบทตาก",
      column_7: "3.513",
    },
    {
      column_1: "ตก.4049",
      column_2: "จ.3 ผังเมืองรวมเมืองตาก",
      column_3: "ป่ามะม่วง",
      column_4: "เมืองตาก",
      column_5: "ตาก",
      column_6: "แขวงทางหลวงชนบทตาก",
      column_7: "3.513",
    },
    {
      column_1: "ตก.4049",
      column_2: "จ.3 ผังเมืองรวมเมืองตาก",
      column_3: "ป่ามะม่วง",
      column_4: "เมืองตาก",
      column_5: "ตาก",
      column_6: "แขวงทางหลวงชนบทตาก",
      column_7: "3.513",
    },
    {
      column_1: "ตก.4049",
      column_2: "จ.3 ผังเมืองรวมเมืองตาก",
      column_3: "ป่ามะม่วง",
      column_4: "เมืองตาก",
      column_5: "ตาก",
      column_6: "แขวงทางหลวงชนบทตาก",
      column_7: "3.513",
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
      title: "",
      key: "actions",
      render: () => (
        <span style={{ display: "flex", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => setOpen(true)}
              style={{ marginRight: 8 }}
            />
            <Button
              type="text"
              icon={
                <DeleteOutlined
                  className="red-icon"
                  style={{ color: "#FF4a4a" }}
                />
              }
              onClick={() => showModal()}
            />
          </span>
        </span>
      ),
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
          colorText: "white",
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
