import React, { useMemo, useCallback } from "react";
import {
  Spin,
  Row,
  Col,
  Empty,
  Card,
  Typography,
  Flex,
  Space,
  Pagination,
  Modal,
} from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TableRole = (props) => {
  const { setOpen } = props;

  const showModal = useCallback(() => {
    Modal.confirm({
      title: "ยืนยันการลบข้อมูล",
      content: "ท่านต้องการยกเลิกการส่งข้อความใช่หรือไม่",
    });
  }, []);

  let page = 1;
  let pageSize = 10;

  const startIndex = useMemo(() => {
    return (page - 1) * pageSize;
  }, [page, pageSize]);

  const endIndex = useMemo(() => {
    return startIndex + pageSize;
  }, [startIndex, pageSize]);

  const data = [
    { id: "ช่างเทคนิค" },
    { id: "วิศวกรเชี่ยวชาญ" },
    { id: "วิศวกรโยธาเชี่ยวชาญ" },
    { id: "ช่างสำรวจ" },
    { id: "เจ้าหน้าที่ธุรการ" },
    { id: "เจ้าหน้าที่สารสนเทศ" },
  ];

  return (
    <Spin spinning={false}>
      <section>
        {data?.length !== 0 ? (
          <Row gutter={[30, 30]}>
            {data?.slice(startIndex, endIndex).map((item, index) => {
              return (
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={12}
                  xxl={12}
                  key={index}
                >
                  <Card>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-8 items-center">
                        <UserOutlined className="!text-4xl " />
                        <Typography.Text>{item.id}</Typography.Text>
                      </div>
                      <div>
                        <Space
                          align="center"
                          direction="horizontal"
                          size={"large"}
                        >
                          <EditOutlined onClick={() => setOpen(true)} />
                          <DeleteOutlined
                            onClick={() => showModal()}
                            className="red-icon"
                            style={{ color: "#FF4a4a" }}
                          />
                        </Space>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Row gutter={[30, 30]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <div className="p-12">
                <Empty description="No Data" />
              </div>
            </Col>
          </Row>
        )}
      </section>
      <Pagination
        align="center"
        style={{ margin: 20 }}
        defaultCurrent={1}
        total={50}
      />
    </Spin>
  );
};

export default React.memo(TableRole);
