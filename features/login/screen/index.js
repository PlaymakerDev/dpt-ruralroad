import React from 'react'
import { FormLogin } from '../components/content'
import styles from '@/features/login/styles/Login.module.css'
import { Col, Row } from 'antd'
import Image from 'next/image'
import PageBanner from '@/public/images/login-img.png'
import DPTTop from '@/public/images/top-line.svg'
import DPTBottom from '@/public/images/bottom-line.svg'

const LoginScreen = (props) => {
  const { } = props

  return (
    <main className={`${styles.mainContainer} relative z-10`}>
      <Row gutter={[0, 30]} justify={'center'} align={'middle'} className={styles.rowContainer}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <section className={styles.loginContainer}>
            <FormLogin />
          </section>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} className={styles.imageColumn}>
          <section className='p-12'>
            <Image
              src={PageBanner}
              alt='login-banner'
              className={styles.loginImage}
            />
          </section>
        </Col>
      </Row>
      <Image
        src={DPTTop}
        alt='dpt-top'
        width={548}
        height={274}
        className='absolute top-0 left-0 -z-10'
      />
      <Image
        src={DPTBottom}
        alt='dpt-bottom'
        className='absolute bottom-10 translate-x-3/4 -z-10'
      />
    </main>
  )
}

export default React.memo(LoginScreen)
