import React from 'react'
import { FormSearchCentralManagement } from '../form'
import { DetailCentralManagement } from '../detail'
import { Pagination } from 'antd'

const CentralManagementProposal = (props) => {
  const { tabKey } = props

  return (
    <div>
      <section className='mt-5'>
        <DetailCentralManagement
          tabKey={tabKey}
        />
      </section>
    </div>
  )
}

export default React.memo(CentralManagementProposal)
