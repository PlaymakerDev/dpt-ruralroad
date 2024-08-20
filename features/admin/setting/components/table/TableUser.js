import React, { useCallback } from "react";
import { Table, ConfigProvider, Pagination, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Color } from "antd/es/color-picker";

const TableUser = (props) => {
  const { setOpen } = props;

  const showModal = useCallback(() => {
    Modal.confirm({
      title: "ยืนยันการลบข้อมูล",
      content: "ท่านต้องการยกเลิกการส่งข้อความใช่หรือไม่",
    });
  }, []);

  const data = [
    {
      column_1: "adisai_t",
      column_2: "นายอดิศัย ทองไทย",
      column_3: "แขวงทางหลวงชนบทพังงา",
      column_4: "นายช่างโยธาอาวุโส",
      column_5: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
      column_6: "ผู้ใช้งาน",
    },
    {
      column_1: "adisai_t",
      column_2: "นายอดิศัย ทองไทย",
      column_3: "แขวงทางหลวงชนบทพังงา",
      column_4: "นายช่างโยธาอาวุโส",
      column_5: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
      column_6: "ผู้ใช้งาน",
      
    },
    {
      column_1: "adisai_t",
      column_2: "นายอดิศัย ทองไทย",
      column_3: "แขวงทางหลวงชนบทพังงา",
      column_4: "นายช่างโยธาอาวุโส",
      column_5: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
      column_6: "ผู้ใช้งาน",
      
    },
    {
      column_1: "adisai_t",
      column_2: "นายอดิศัย ทองไทย",
      column_3: "แขวงทางหลวงชนบทพังงา",
      column_4: "นายช่างโยธาอาวุโส",
      column_5: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
      column_6: "ผู้ใช้งาน",
      
    },
  ];

  const columns = [
    {
      title: "Username",
      key: "column_1",
      dataIndex: "column_1",
    },
    {
      title: "ชื่อ-นามสกุล",
      key: "column_2",
      dataIndex: "column_2",
    },
    {
      title: "หน่วย",
      key: "column_3",
      dataIndex: "column_3",
    },
    {
      title: "ตำแหน่ง",
      key: "column_4",
      dataIndex: "column_4",
    },
    {
      title: "หน้าที่",
      key: "column_5",
      dataIndex: "column_5",
    },
    {
      title: "กลุ่ม",
      key: "column_6",
      dataIndex: "column_6",
    },

    {
      title: "",
      key: "actions",
      render: () => (
        <span style={{ display: "flex", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center" }}>
            
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

export default React.memo(TableUser);
