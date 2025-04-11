import React, { useCallback, useEffect, useState } from "react";
import { TableUser } from "../table";
import { FormSearchUser } from "../form";
import { ModalUser } from "../modal";
import useGetAPI from "@/utils/hooks/api/useGetAPI";
import { getUser, clearUser as clearSearchUser } from '@/store/features/settingSlice'
import { useAppDispatch } from "@/store/hooks";

const INIT_MODAL = { open: false, info: {} }

const User = (props) => {
  const { } = props;
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(INIT_MODAL)
  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getUser, reducerName: 'setting', reducerKey: 'user'
  })

  useEffect(() => {
    apiGetData('/api/v1/users', { ...data.overview.search }, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangePage = useCallback((page, perPage) => {
    apiGetData(`/api/v1/users`, { ...data.overview.search, page: page, page_size: perPage }, false, {})
  }, [data.overview.search, apiGetData])

  const clearData = useCallback(() => {
    apiGetData(`/api/v1/users`, { ...data.overview.search, search: '', page: 1, page_size: 10, }, false, {})
    dispatch(clearSearchUser(data.overview.search))
  }, [data, apiGetData, dispatch])

  const onReload = useCallback(() => {
    apiGetData('/api/v1/users', { ...data.overview.search }, false)
  }, [apiGetData, data])

  return (
    <div>
      <section>
        <FormSearchUser
          initialValues={data.overview.search}
          apiGetData={apiGetData}
          clearData={clearData}
        />
      </section>
      <section className='mt-5'>
        <TableUser
          // API DATA
          data={data.overview.data}
          loading={loading}
          // PAGE API
          page={data.overview.search.page}
          perPage={data.overview.search.page_size}
          total={data.overview.meta.total}
          onChange={onChangePage}
          // MODAL
          setOpen={setOpen}
          onReload={onReload}
        />
      </section>
      <ModalUser
        open={open.open}
        info={open.info}
        setOpen={setOpen}
        onReload={onReload}
      />
    </div>
  );
};

export default React.memo(User);
