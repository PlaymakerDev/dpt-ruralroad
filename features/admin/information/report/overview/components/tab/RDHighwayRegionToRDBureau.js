import React from 'react'
import { FormSearchRDHighwayRegionToRDBureau } from '../form'
import { DetailRDHighwayRegionToRDBureau } from '../detail'
import { Pagination } from 'antd'

const RDHighwayRegionToRDBureau = (props) => {
  const { tabKey } = props

  return (
    <div>
      {/* <section>
        <FormSearchRDHighwayRegionToRDBureau />
      </section> */}
      <section className='mt-5'>
        <DetailRDHighwayRegionToRDBureau tabKey={tabKey} />
      </section>

    </div>
  )
}

export default React.memo(RDHighwayRegionToRDBureau)
