import React, { useMemo, useState } from 'react'
import { useDashboardContext } from '../context'
import { useAppSelector } from '@/store/hooks'
import ContentCCTVList from './ContentCCTVList'
import { Spin } from 'antd'
import { ModalCCTV } from '@/features/admin/cctv/overview/components'

const INIT_MODAL = { open: false, data: null }

const CCTVSection = (props) => {
  const { } = props
  const { loadingCCTVList } = useDashboardContext()
  const data = useAppSelector(state => state.cctv.list)
  const [open, setOpen] = useState(INIT_MODAL)

  const renderCCTVList = useMemo(() => {
    if (!loadingCCTVList) {
      return (
        <ContentCCTVList
          cctv={data.data || []}
          setOpen={setOpen}
        />
      )
    } else {
      return <Spin spinning={loadingCCTVList} />
    }
  }, [loadingCCTVList, data])

  return (
    <>
      <div>
        {renderCCTVList}
      </div>
      <ModalCCTV
        open={open.open}
        info={open.data}
        onClose={() => setOpen(INIT_MODAL)}
      />
    </>
  )
}

export default React.memo(CCTVSection)
