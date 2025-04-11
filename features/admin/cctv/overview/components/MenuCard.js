import React, { useCallback, useContext } from 'react'
import { Row, Col, Typography, Empty } from 'antd'
import { RightOutlined } from '@ant-design/icons';
import CCTVIconMenu from '@/components/icon/CCTVIconMenu';
import { useRouter } from 'next/router';
import { CctvID } from '@/pages/_app';


const MenuCard = (props) => {
  const { data, findDepartmentListSum, active } = props

  const renderCardTemplate = useCallback((index, id, name, id_active) => {
    return (
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} key={index}
        onClick={() => {
          findDepartmentListSum(id)
          
        }}
      >
        <div className={`card-container rounded-lg ${id == id_active && '!bg-[#004449] !border-[#35a8af]'}`}>
          <div className='flex items-center'>
            <figure className='bg-[#FFFFFF17] p-5 rounded-l-lg'>
              <CCTVIconMenu width='1.5rem' height='1.5rem' className='block m-auto' />
            </figure>
            <section className='w-full flex items-center flex-wrap justify-between px-5 py-3 gap-3 '>
              <Typography.Text className='!text-lg'>{name}</Typography.Text>
              <div className='flex flex-wrap items-center gap-5'>
                <RightOutlined
                  className='!cursor-pointer !text-[#FFFFFF]'
                />
              </div>
            </section>
          </div>
        </div>
      </Col>
    )
  }, [findDepartmentListSum])

  const renderCard = useCallback((data, active) => {
    if (data) {
      return data.map((item, index) => (
        renderCardTemplate(index, item.department_id, item.department_name, active)
      ));
    }
    return <Empty />
  }, [renderCardTemplate]);

  return (
    <Row gutter={[16, 16]}>
      {renderCard(data, active)}
    </Row>
  )
}

export default React.memo(MenuCard)