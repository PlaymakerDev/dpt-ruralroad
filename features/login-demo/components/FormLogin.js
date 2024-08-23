import React, { useCallback } from 'react'
import { Form, useForm, Field } from '@/components/form'
import { Button, Typography, Row, Col } from 'antd'
import Image from 'next/image'
import DPTLogo from '@/public/images/dpt-logo2.png'
import { UserOutlined } from '@ant-design/icons'
import UserTie from '@/public/UserTie'
const FormLoginDemo = (props) => {

  const { } = props

  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    },
    rules: ''
  })

  console.log(form)

  const buildValue = useCallback((values, next) => {
    next(values)
  }, [])

  const handlerSubmit = useCallback((values) => {
    console.log(values)
  }, [])

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <div className='rounded-lg shadow-lg'>
        <Row className=' justify-center'>
          <Image
            src={DPTLogo}
            alt='dpt-logo'
            className='w-20'
          />
        </Row>
        <Row className=' justify-center'>
          <Col>
            <Typography.Title level={2} className='text-[#FFFFFF] m-0 font-IBMPlexSansThaiBold'>
              กรมทางหลวงชนบท
            </Typography.Title>
          </Col>
        </Row>
        <Row className=' justify-center'>
          <Typography.Text className='!font-bold !text-[#56E4EE] text-xl font-IBMPlexSansThaiSemiBold'>
            Weight Tracking System
          </Typography.Text>
        </Row>
        <Row className='mb-6'>
          <Form form={form} handlerSubmit={[buildValue, handlerSubmit]} className='w-full'>
            <Field.Input
              label='ชื่อผู้ใช้งาน'
              name='username'
              placeholder='ชื่อผู้ใช้งาน'
              className='-mt-10'
            />
            <Field.Password
              label='รหัสผ่าน'
              name='password'
              placeholder='รหัสผ่าน'
              className='-mt-10'
            />
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              block
              className='w-full h-12 text-base font-IBMPlexSansThaiBold !text-[#1E4066] !font-bold'
              style={{ backgroundColor: '#56E4EE', color: '#1E4066', border: 'none' }} 
            >
              เข้าสู่ระบบ
            </Button>
          </Form>
        </Row>
        <Row className='mb-4' gutter={[16,16]}>
          <Col span={12} className='flex justify-center'>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              block
              className='w-full h-12 text-base font-IBMPlexSansThaiBold'
              style={{ backgroundColor: '#5671EE', color: '#ffffff', border: 'none' }}
              icon={<UserTie />}
            >
              ผู้บริหาร
            </Button>
          </Col>
          <Col span={12} className='flex justify-center'>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              block
              className='w-full h-12 text-base font-IBMPlexSansThaiBold'
              style={{ backgroundColor: '#5671EE', color: '#ffffff', border: 'none' }}
              icon={<UserOutlined />}
            >
              ประชาชนทั่วไป
            </Button>
          </Col>
        </Row>
        <Row className='mb-2 justify-center'>
          <Typography.Text className='text-[#FFFFFF] text-md font-IBMPlexSansThaiThin'>
            All rights reserved 2025.
          </Typography.Text>
        </Row>
        <Row className='justify-center'>
          <Typography.Text className='text-[#FFFFFF80] text-md font-IBMPlexSansThaiThin'>
            มีปัญหาในการเข้าสู่ระบบ ติดต่อ 01-234-5678
          </Typography.Text>
        </Row>
      </div>
    </div>
  )
}

export default FormLoginDemo
