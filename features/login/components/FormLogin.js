import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { Form, useForm, Field } from '@/components/form'
import { Button, Typography, Row, Col, Alert } from 'antd'
import Image from 'next/image'
import DPTLogo from '@/public/images/dpt-logo2.png'
import { UserOutlined } from '@ant-design/icons'
import UserTie from '@/public/UserTie'
import styles from '@/features/login/styles/Login.module.css'
import { useRouter } from 'next/router'

const ROLE = "ADMIN"

const initialValues = {
  username: '',
  password: '',
}

const FormLogin = (props) => {
  const { actionURL, error, initUsername, push } = props
  const router = useRouter()

  const form = useForm({
    initialValues: {
      ...initialValues,
      username: initUsername || initialValues.username,
    },
    rules: {
      username: {
        required: "required_username"
      },
      password: {
        required: "required_password"
      },
    }
  })

  const { errors } = form

  const onSubmit = () => {
    (document.getElementById('role'))?.setAttribute?.('value', ROLE);
    (document.getElementById('form-login'))?.submit();
  }

  const errorMessage = useMemo(() => {
    if (error?.message) {
      return error?.message
    }
  }, [error])

  // const [errorMessage, setErrorMessage] = useState('');

  // useEffect(() => {
  //   if (error) {
  //     if (typeof error === 'object') {
  //       setErrorMessage(error.message || JSON.stringify(error));
  //     } else {
  //       setErrorMessage(error);
  //     }
  //   }
  // }, [error])

  // const onSubmit = useCallback(async (values) => {
  //   try {
  //     console.log('Submitting login form with values:', { ...values, password: '***' });

  //     // ใช้ fetch แทน axios เพื่อให้มีการจัดการ cookie ที่ดีขึ้น
  //     const response = await fetch(actionURL, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         ...values,
  //         role: ROLE
  //       }),
  //       // สำคัญมาก: ต้องมี credentials เพื่อให้ browser ส่ง cookie กลับไปด้วย
  //       credentials: 'include'
  //     });

  //     console.log('Login response status:', response.status);

  //     const data = await response.json();
  //     console.log('Login response data:', data);

  //     if (data.error) {
  //       setErrorMessage(data.error);
  //     } else if (data.redirectTo) {
  //       console.log('Redirecting to:', data.redirectTo);

  //       // เพิ่มการหน่วงเวลาก่อนที่จะ redirect เพื่อให้ browser มีเวลาในการบันทึก cookie
  //       console.log('Waiting for cookie to be set before redirecting...');

  //       // เพิ่มเวลาในการหน่วงเป็น 1000ms (1 วินาที) เพื่อให้มั่นใจว่า cookie ถูกบันทึกเรียบร้อยแล้ว
  //       setTimeout(() => {
  //         // ตรวจสอบว่ามี cookie หรือไม่ก่อนที่จะ redirect
  //         console.log('Checking cookies before redirect:', document.cookie);

  //         // ใช้ window.location.href แทน router.push เพื่อให้มีการโหลดหน้าใหม่ทั้งหมด
  //         window.location.href = data.redirectTo;
  //       }, 5000); // เพิ่มเวลาหน่วงเป็น 5000ms
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     setErrorMessage('เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง');
  //   }
  // }, [actionURL, router]);

  return (
    <div className={styles.container}>
      <Row className="justify-center mb-4">
        <Image src={DPTLogo} alt="dpt-logo" className={styles.logo} priority />
      </Row>
      <Row className="justify-center mb-2">
        <Col>
          <Typography.Title
            level={2}
            className={styles.title}
          >
            กรมทางหลวงชนบท
          </Typography.Title>
        </Col>
      </Row>
      <Row className="justify-center mb-4">
        <Typography.Text className={styles.system_text}>
          Vehicle Inspection System
        </Typography.Text>
      </Row>
      {!!errorMessage && (
        <section className='my-2'>
          <Alert message={errorMessage.toString()} type="error" />
        </section>
      )}
      <Row className={styles.row_no_gap}>
        <Form
          form={form}
          action={actionURL}
          method='POST'
          handlerSubmit={onSubmit}
          id={'form-login'}
          className={styles.form}
        >
          <Field.Input
            label="ชื่อผู้ใช้งาน"
            name="username"
            placeholder="ชื่อผู้ใช้งาน"
            className={styles.input_field}
            hideRequired={!errors.username}
          />
          <Field.Password
            label="รหัสผ่าน"
            name="password"
            placeholder="รหัสผ่าน"
            className={styles.input_field}
          />
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            className={styles.login_button}
            disabled={form.submitting}
            loading={form.submitting}
          >
            เข้าสู่ระบบ
          </Button>
        </Form>
      </Row>
      <Row className={styles.row_with_gap}>
        <Col xs={24} sm={24} md={12} lg={12} className={styles.col_padding}>
          <Button
            htmlType='button'
            type="primary"
            size="large"
            block
            className={styles.external_button}
            icon={<UserTie />}
            onClick={() => router.push({
              pathname: '/admin/dashboard',
              query: {
                type: 'EXECUTIVE'
              }
            })}
          >
            ผู้บริหาร
          </Button>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className={styles.col_padding}>
          <Button
            htmlType='button'
            type="primary"
            size="large"
            block
            className={styles.external_button}
            icon={<UserOutlined />}
            onClick={() => router.push({
              pathname: '/admin/dashboard',
              query: {
                type: 'CITIZEN'
              }
            })}
          >
            ประชาชนทั่วไป
          </Button>
        </Col>
      </Row>
      <Row className="mt-8 justify-center">
        <Typography.Text className={styles.copyright_text}>
          All rights reserved 2025.
        </Typography.Text>
      </Row>
      <Row className="justify-center">
        <Typography.Text className={styles.contact_text}>
          มีปัญหาในการเข้าสู่ระบบ ติดต่อ 01-234-5678
        </Typography.Text>
      </Row>
    </div>
  )
}

export default FormLogin
