import React, { useState, useEffect, useCallback } from "react";
import { FormSearchCargo } from "../form";
import { TableCargo } from "../table";
import { Pagination } from "antd";
import { ModalCargo } from "../modal";
import useGetAPI from "@/utils/hooks/api/useGetAPI";
import { getCarGo } from "@/store/features/settingSlice";

const INIT_MODAL = { open: false, data: null, type: null }

const Cargo = (props) => {
  const { } = props;
  const [open, setOpen] = useState(INIT_MODAL)

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getCarGo, reducerName: 'setting', reducerKey: 'car_go'
  })

  useEffect(() => {
    apiGetData(`/api/v1/masters/goods`, { ...data?.overview?.search }, false, {})
    // apiGetProvince('/api/v1/masters/provinces_all', {}, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlerSearch = useCallback((values) => {
    apiGetData(`/api/v1/masters/goods`, { ...values, page: 1, page_size: data.overview.search?.page_size || 10 }, false, {})
  }, [apiGetData, data])

  const onChangePagination = useCallback((page, page_size) => {
    apiGetData(`/api/v1/masters/goods`, { ...data.overview.search, page: page, page_size: page_size }, false, {})
  }, [apiGetData, data])

  return (
    <div>
      <section>
        <FormSearchCargo
          setOpen={setOpen}
          handlerSearch={handlerSearch}
        />
      </section>
      <section className='mt-5'>
        <TableCargo
          setOpen={setOpen}
          dataList={data}
          loading={loading}
          funcGet={handlerSearch}
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
      <ModalCargo
        open={open.open}
        data={open?.data || null}
        setOpen={setOpen}
        type={open?.type}
        funcGet={handlerSearch}
      />
    </div>
  );
};

export default React.memo(Cargo);
