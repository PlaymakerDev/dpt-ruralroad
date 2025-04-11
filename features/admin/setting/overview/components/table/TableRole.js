import React, { useCallback, useMemo } from 'react'
import { Col, Empty, message, Modal, Row, Spin, Typography } from 'antd'
import { RoleDetailCard } from './detail-card'
import useDeleteAPI from '@/utils/hooks/api/useDeleteAPI'

const TableRole = (props) => {
  const { setOpen, dataList, loading, funcGet } = props
  const [apiDelete, loadingDelete] = useDeleteAPI('overlay')

  let page = 1
  let pageSize = 10

  const startIndex = useMemo(() => {
    return (page - 1) * pageSize;
  }, [page, pageSize]);

  const endIndex = useMemo(() => {
    return startIndex + pageSize;
  }, [startIndex, pageSize]);

  const handlerDelete = useCallback(async (pid) => {
    const response = await apiDelete(`/api/v1/masters/user_position/${pid}`, {}, {}, false)
    if (response?.success) {
      funcGet({})
      message.success('ลบข้อมูลสำเร็จ')
    } else {
      message.error('ไม่สามารถลบข้อมูลได้')
    }
  }, [apiDelete, funcGet])

  const confirmDelete = useCallback((data) => {
    Modal.confirm({
      title: 'ยืนยันการลบข้อมูล ?',
      content: 'ท่านต้องการลบข้อมูลตำแหน่งงานใช่หรือไม่',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: () => handlerDelete(data.pid),
      okButtonProps: {
        loading: loadingDelete
      }
    })
  }, [handlerDelete, loadingDelete])

  const data = [
    {
      description: 'วิศวกรโยธาเชี่ยวชาญ'
    },
    {
      description: 'ช่างเทคนิค'
    },
    {
      description: 'ผู้ช่วยช่างทั่วไป ระดับ ช.2'
    },
    {
      description: 'วิศวกรเครื่องกล (พร.)'
    },
  ]

  return (
    <Spin spinning={loading}>
      {dataList?.overview?.data?.length !== 0 ?
        <Row gutter={[30, 30]}>
          {dataList?.overview?.data?.slice(startIndex, endIndex).map((item, index) => {
            return (
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} key={index}>
                <RoleDetailCard
                  index={index}
                  data={item}
                  setOpen={setOpen}
                  confirmDelete={confirmDelete}
                />
              </Col>
            )
          })}
        </Row>
        :
        <Row gutter={[30, 30]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <div className='p-12'>
              <Empty
                description={<Typography.Text className='!text-white'>No Data</Typography.Text>}
              />
            </div>
          </Col>
        </Row>
      }
    </Spin>
  )
}

export default React.memo(TableRole)
