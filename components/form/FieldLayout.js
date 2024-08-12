import React, { memo } from 'react'
import styles from '@/styles/components/form/Field.module.css'

const FiledLayout = (props) => {
  const { children, styleField } = props
  return (
    <div
      className={`${styles.container} `}
      style={styleField}
    >
      <label className={`${styles.label}`}>
        &nbsp;
      </label>
      {children}
    </div>
  )
}

FiledLayout.defaultProps = {
  labelAlign: 'left',
  styleField: {},
  styleLabel: {},
  noStar: false
}

export default memo(FiledLayout)
