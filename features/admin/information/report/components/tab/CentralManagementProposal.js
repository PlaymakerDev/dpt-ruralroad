import React from 'react'
import { FormSearchCentralManagement } from '../form'
import { DetailCentralManagement } from '../detail'
import { Pagination } from 'antd'

const CentralManagementProposal = (props) => {
  const { } = props

  return (
    <div>
      <section>
        <FormSearchCentralManagement />
      </section>
      <section className='mt-5'>
        <DetailCentralManagement />
      </section>
      <section className='mt-5'>
        <div className='flex justify-center'>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={10}
            current={1}
            pageSize={10}
            total={2}
          // onChange={(pageNumber, pageSize) => handleOnChangePage(pageNumber, pageSize)}
          // onShowSizeChange={(_, pageSize) => handleOnChangePageSize(pageSize)}
          // showSizeChanger={true}
          // hideOnSinglePage={qrCodeData.total === 0}
          />
        </div>
      </section>
    </div>
  )
}

export default React.memo(CentralManagementProposal)
