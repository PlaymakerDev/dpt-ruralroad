import React from 'react'
import { FormLogin, PageImage } from '../components/content'
import styles from '@/features/login/styles/Login.module.css'
import { Col, Row } from 'antd'
import Image from 'next/image'
import PageBanner from '@/public/images/login-img.png'

const LoginScreen = (props) => {
  const { } = props

  return (
    <main className='p-10 w-full h-screen lg:overflow-hidden'>
      <Row gutter={[80, 30]} align={'middle'} className={styles.rowContainer}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <section className='mx-auto max-w-xl'>
            <FormLogin />
          </section>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} className={styles.imageColumn}>
          <section className='mx-auto'>
            <Image
              src={PageBanner}
              alt='login-banner'
              className={styles.loginImage}
            />
          </section>
        </Col>
      </Row>
    </main>
  )
}

export default React.memo(LoginScreen)
