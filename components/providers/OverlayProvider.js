import React from 'react'
import PropTypes from 'prop-types'
import Spin, { SpinIndicator } from 'antd/lib/spin'
// import { LoadingOutlined } from '@ant-design/icons';

const OverlayProvider = (props) => {
  const { loading, children, ...propsSpin } = props

  return (
    <Spin spinning={loading} {...propsSpin} style={{ zIndex: 1001, position: 'fixed', top: 0, minHeight: '100dvh', ...(propsSpin.style || {}) }}>
      {children}
    </Spin>
  )
}

export default OverlayProvider
