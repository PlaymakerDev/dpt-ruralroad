import React from 'react'
import { FormSearchCollaborate, TableCollaborate } from '../components'
import { Pagination } from 'antd'

const CollaborationAndIntegrationScreen = (props) => {
  const { } = props

  return (
    <div>
      <section>
        <FormSearchCollaborate />
      </section>
      <section className='mt-5'>
        <TableCollaborate />
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

export default React.memo(CollaborationAndIntegrationScreen)
