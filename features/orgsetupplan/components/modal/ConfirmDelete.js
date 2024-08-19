import React from 'react'
import { Row, Typography } from 'antd'
import ErrorIco from '@/public/ErrorIco'

const ConfirmDelete = () => {
  return (
    <div>
      <Row gutter={[0, 0]} align={'middle'} justify="center">
        <ErrorIco />
      </Row>
      <Row gutter={[0, 0]} align={'middle'} justify="center">
        <Typography.Title level={5}>
          ยืนยันการลบข้อมูล
        </Typography.Title>
      </Row>
      <Row gutter={[0, 0]} align={'middle'} justify="center">
        <Typography.Text>ท่านต้องการยกเลิกการส่งข้อความใช่หรือไม่</Typography.Text>
      </Row>
    </div>

  )
}

export default ConfirmDelete