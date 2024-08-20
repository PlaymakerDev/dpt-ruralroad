import React, { useMemo } from 'react'
import { Card, Col, Empty, Row, Spin } from 'antd'
import DetailCard from './content/DetailCard'

const TableCollaborate = (props) => {
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
    {
      title: 'สายทาง - ลบ.4003',
      collab_img1: 'https://i.scdn.co/image/ab67616d0000b273cc68eea0db7110e3b8cca14e',
      collab_img2: 'https://image.api.playstation.com/vulcan/ap/rnd/202308/1103/8c3ce3611a4bb187418bb5e24924a055ba33d3046a7aaacb.png',
      date: '09 กันยายน 2565',
      department: 'ขทช.ลพบุรี',
      collaboration: 'ขนส่งจังหวัด, ตำรวจ'
    },
    {
      title: 'สายทาง - ศก.3023',
      collab_img1: 'https://i.scdn.co/image/ab67616d0000b273c427497c3be9cc3cb2eb33ea',
      collab_img2: 'https://image.api.playstation.com/vulcan/img/rnd/202104/2507/Xdncb153Sz5UZMaF0X944NP5.png',
      date: '06 กันยายน 2565',
      department: 'ขทช.ศรีสะเกษ',
      collaboration: 'อส.ทช'
    },
    {
      title: 'สายทาง - ลบ.4003',
      collab_img1: 'https://i.scdn.co/image/ab67616d0000b273d97e2c6ea1bfebc2b6090e2f',
      collab_img2: 'https://image.api.playstation.com/vulcan/ap/rnd/202405/2210/28867e1a0757cd5b7b6eff2315351a9307a78f3b8c4b9a7f.png',
      date: '02 กันยายน 2565',
      department: 'ขทช.ลพบุรี',
      collaboration: 'ขนส่งจังหวัด, ตำรวจ'
    },
  ]

  return (
    <Spin spinning={false}>
      {data?.length !== 0 ?
        <Row gutter={[30, 30]}>
          {data?.slice(startIndex, endIndex).map((item, index) => {
            return (
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8} key={index}>
                <DetailCard
                  index={index}
                  data={item}
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
                description='No Data'
              />
            </div>
          </Col>
        </Row>
      }
    </Spin>
  )
}

export default React.memo(TableCollaborate)
