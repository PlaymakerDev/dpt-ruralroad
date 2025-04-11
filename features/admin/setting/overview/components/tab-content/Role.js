import React, { useState, useEffect, useCallback } from "react";
import { FormSearchRole } from "../form";
import { TableRole } from "../table";
import { Pagination } from "antd";
import { ModalRole } from "../modal";
import useGetAPI from "@/utils/hooks/api/useGetAPI";
import { getRole } from "@/store/features/settingSlice";

const INIT_MODAL = { open: false, type: null, data: {} }

const Role = (props) => {
  const { } = props;
  const [open, setOpen] = useState(INIT_MODAL)

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getRole, reducerName: 'setting', reducerKey: 'role'
  })

  useEffect(() => {
    apiGetData(`/api/v1/masters/user_position`, { ...data.overview.search }, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlerSearch = useCallback((values) => {
    apiGetData(`/api/v1/masters/user_position`, { ...values, page: 1, page_size: data.overview.search?.page_size || 10 }, false, {})
  }, [apiGetData, data])

  const onChangePagination = useCallback((page, page_size) => {
    apiGetData(`/api/v1/masters/user_position`, { ...data.overview.search, page: page, page_size: page_size }, false, {})
  }, [apiGetData, data])

  return (
    <div>
      <section>
        <FormSearchRole
          setOpen={setOpen}
          handlerSearch={handlerSearch}
        />
      </section>
      <section className='mt-5'>
        <TableRole
          setOpen={setOpen}
          dataList={data || []}
          loading={loading}
          funcGet={handlerSearch}
          // page={data.overview.search.page}
          // pageSize={data.overview.search.page_size}
        />
      </section>
      <section className='mt-5'>
        <div className='flex justify-center'>
          <Pagination
            onChange={onChangePagination}
            defaultCurrent={1}
            defaultPageSize={10}
            current={data?.overview?.search?.page || 1}
            pageSize={data?.overview?.search?.page_size || 10}
            total={data?.overview?.meta?.total || 0}
            showSizeChanger={false}
          />
        </div>
      </section>
      <ModalRole
        open={open.open}
        setOpen={setOpen}
        funcGet={handlerSearch}
        data={open?.data || {}}
        type={open?.type}
      />
    </div>
  );
};

export default React.memo(Role);
