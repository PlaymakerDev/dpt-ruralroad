import React, { useEffect, useMemo } from 'react'
import { Status } from '../card'

const CCTVStatus = (props) => {
  const { data } = props

  return (
    <div>
      <Status
        data={data}
      />
    </div>
  )
}

export default React.memo(CCTVStatus)
