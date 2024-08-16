import React, { useMemo } from 'react'
import { Spin, Row, Col, Empty, Card, Typography, Flex, Space } from 'antd'
import { CodeSandboxOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

const TableCargo = (props) => {
  const { } = props

  let page = 1
  let pageSize = 10

  const startIndex = useMemo(() => {
    return (page - 1) * pageSize;
  }, [page, pageSize]);

  const endIndex = useMemo(() => {
    return startIndex + pageSize;
  }, [startIndex, pageSize]);

  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ]

  return (
    <Spin spinning={false}>
      <section>
        {data?.length !== 0 ?
          <Row gutter={[30, 30]}>
            {data?.slice(startIndex, endIndex).map((item, index) => {
              return (
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={index}>
                  <Card>
                    <CodeSandboxOutlined />
                    <Typography.Text>ไม้ยางพารา</Typography.Text>
                    <Space align='center' direction='horizontal'>
                      <EditOutlined />
                      <DeleteOutlined />
                    </Space>

                  </Card>
                </Col>
              )
            })}
          </Row>
          :
          <Row gutter={[30, 30]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <div className='p-12'>
                <Empty
                  description='No Data'
                />
              </div>
            </Col>
          </Row>
        }
      </section>
    </Spin>
  )
}

export default React.memo(TableCargo)
