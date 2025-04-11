import React from 'react'
import { Card, Flex, Typography } from 'antd'
import { CameraOutlined, VideoCameraOutlined } from '@ant-design/icons'
import Failed from '@/components/icon/Failed'
import Success from '@/components/icon/Success'
import CCTVIcon from '@/public/Cctv';
import CCTVIconMenu from '@/components/icon/CCTVIconMenu'


const Status = (props) => {
  const { data } = props

  const gridProperties = {
    className: '!w-full sm:!w-full md:!w-2/6 lg:!w-2/6 xl:!w-2/6 !text-center !border-none !h-32'
  }

  return (
    <Card>
      <Card.Grid hoverable={false} {...gridProperties}>
        <Flex
          justify='space-evenly'
          align='center'
          wrap
          className='!h-full'
        >
          <Flex
            wrap
            align='center'
            gap={'1rem'}
          >
            <CCTVIconMenu className='!text-2xl' />
            <Typography.Text className='!text-2xl' strong>จำนวนกล้องทั้งหมด</Typography.Text>
          </Flex>
          <Typography.Text className='!text-2xl' strong>{Number(data?.total_cameras) || 0} กล้อง</Typography.Text>
        </Flex>
      </Card.Grid>
      <Card.Grid hoverable={false} {...gridProperties}>
        <Flex
          justify='space-evenly'
          align='center'
          wrap
          className='!h-full'
        >
          <Flex
            wrap
            align='center'
            gap={'1rem'}
          >
            <Success />
            <Typography.Text className='!text-2xl' strong>ใช้งานได้</Typography.Text>
          </Flex>
          <Typography.Text className='!text-2xl' strong>{Number(data?.online_cameras) || 0} กล้อง</Typography.Text>
        </Flex>
      </Card.Grid>
      <Card.Grid hoverable={false} {...gridProperties}>
        <Flex
          justify='space-evenly'
          align='center'
          wrap
          className='!h-full'
        >
          <Flex
            wrap
            align='center'
            gap={'1rem'}
          >
            <Failed />
            <Typography.Text className='!text-2xl' strong>ใช้งานไม่ได้</Typography.Text>
          </Flex>
          <Typography.Text className='!text-2xl' strong>{Number(data?.offline_cameras) || 0} กล้อง</Typography.Text>
        </Flex>
      </Card.Grid>
    </Card>
  )
}

export default React.memo(Status)
