import React, { useCallback } from 'react'
import { Form, useForm, Field } from '@/components/form'
import { Button, Typography } from 'antd'
import Image from 'next/image'
import DPTLogo from '@/public/images/dpt-logo2.png'
import styles from '@/features/login/styles/Login.module.css'

const FormLogin = (props) => {
  const { } = props

  const form = useForm({
    initialValue: '',
    rules: ''
  })

  const buildValue = useCallback((values, next) => {
    next(values)
  }, [])

  const handerSubmit = useCallback((values) => {
    console.log(values)
  }, [])

  return (
    <div className='h-full flex flex-col justify-between'>
      <div className='my-auto'>
        <section className='flex flex-col flex-wrap items-center justify-center gap-5'>
          <figure>
            <Image
              src={DPTLogo}
              alt='dpt-logo'
              className='w-40'
            />
          </figure>
          <section className='text-center'>
            <Typography.Title level={2} className='!text-[#FFFFFF] !m-0 !font-IBMPlexSansThaiBold'>กรมทางหลวงชนบท</Typography.Title>
            <Typography.Text className='!text-[#56E4EE] !text-xl !font-IBMPlexSansThaiSemiBold'>Weight Tracking System</Typography.Text>
          </section>
        </section>
        <section className='mt-10'>
          <Form form={form} handerSubmit={[buildValue, handerSubmit]}>
            <Field.Input
              label='ชื่อผู้ใช้งาน'
              name='username'
              placeholder='ชื่อผู้ใช้งาน'
              className={styles.loginField}
              style={{
                backgroundColor: '#1282C260',
                padding: '12px 12px', 
                border: 'none',
                color: '#FFFFFF'
              }}
              />
            <Field.Password
              label='รหัสผ่าน'
              name='password'
              placeholder='รหัสผ่าน'
              className={styles.loginField}
              style={{
                backgroundColor: '#1282C260',
                padding: '12px 12px', 
                border: 'none',
                color: '#FFFFFF'
              }}
            />
            <Button
              size='large'
              block
              className='!w-full !h-12 !text-base !font-IBMPlexSansThaiBold'
            >
              เข้าสู่ระบบ
            </Button>
          </Form>
        </section>
      </div>
      <div className='container-bottom'>
        <section className='text-center'>
          <Typography.Text className='!text-[#FFFFFF] !text-md !font-IBMPlexSansThaiThin'>All rights reserved 2025. </Typography.Text><br />
          <Typography.Text className='!text-[#FFFFFF80] !text-md !font-IBMPlexSansThaiThin'>มีปัญหาในการเข้าสู่ระบบ ติดต่อ 01-234-5678</Typography.Text>
        </section>
      </div>
    </div>
  )
}

export default React.memo(FormLogin)
