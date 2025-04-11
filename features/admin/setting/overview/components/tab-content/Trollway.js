import React, { useState, useEffect, useCallback } from "react";
import { FormSearchTrollway } from "../form";
import { TableTrollway } from "../table";
import { ModalTrollway } from '../modal'
import { getTrollWay } from '@/store/features/settingSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI';
import { getDepartmentAll as getMasterDepartmentAll, getAllProvince as getProvinceAll, getDistrict, getSubDistrict } from '@/store/features/masterSlice'

const INIT_MODAL = { open: false, type: null, data: {} }

const Trollway = (props) => {
  const { } = props;
  const [open, setOpen] = useState(INIT_MODAL)

  const [apiGetProvince, loadingProvince, masterProvince] = useGetAPI('overlay', {
    funcDispatch: getProvinceAll, reducerName: 'master', reducerKey: 'province'
  })
  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getTrollWay, reducerName: 'setting', reducerKey: 'troll_way'
  })

  useEffect(() => {
    apiGetData(`/api/v1/masters/way`, { ...data.overview.search ,relations: 'department' }, false, {})
    apiGetProvince('/api/v1/masters/provinces_all', {}, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlerSearch = useCallback((values) => {
    apiGetData(`/api/v1/masters/way`, { ...values, page: 1, page_size: data.overview.search?.page_size || 10, relations: 'department' }, false, {})
  }, [apiGetData, data])

  const onChangePagination = useCallback((page, page_size) => {
    apiGetData(`/api/v1/masters/way`, { ...data.overview.search, page: page, page_size: page_size, relations: 'department' }, false, {})
  }, [apiGetData, data])

  return (
    <div>
      <section>
        <FormSearchTrollway
          setOpen={setOpen}
          handlerSearch={handlerSearch}
          masterProvince={masterProvince?.all}
        />
      </section>
      <section className='mt-5'>
        <TableTrollway
          setOpen={setOpen}
          // API DATA
          data={data.overview.data}
          loading={loading}
          // PAGE API
          page={data.overview.search.page}
          perPage={data.overview.search.page_size}
          total={data.overview.meta.total}
          onChange={onChangePagination}
          // GET DATA 
          funcGet={handlerSearch}
        />
      </section>
      <ModalTrollway
        open={open.open}
        type={open?.type}
        data={open?.data || {}}
        setOpen={setOpen}
        funcGet={handlerSearch}
        masterProvince={masterProvince?.all}
      />
    </div>
  );
};

export default React.memo(Trollway);
