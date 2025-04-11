import React, { useState, useEffect, useCallback } from "react";
import { FormSearchAddnews } from "../form";
import { TableAddnews } from "../table";
import { ModalAddnews } from '../modal'
import { getArticle, clearArticle } from '@/store/features/settingSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI';
import { useAppDispatch } from '@/store/hooks'
import useDeleteAPI from "@/utils/hooks/api/useDeleteAPI";
import { message, Modal } from "antd";

const INIT_MODAL = { open: false, info: {} }

const Addnews = (props) => {
  const { } = props;
  const [open, setOpen] = useState(INIT_MODAL)
  const dispatch = useAppDispatch()
  const [apiDelete, loadingDelete] = useDeleteAPI('overlay')

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getArticle, reducerName: 'setting', reducerKey: 'article'
  })

  useEffect(() => {
    

    apiGetData(`/api/v1/news`, { ...data.overview.search }, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangePage = useCallback((page, perPage) => {
    

    
    
    apiGetData(`/api/v1/news`, { ...data.overview.search, page: page, page_size: perPage }, false, {})
    // apiGetData(`/api/v1/info/workplan_way`, { ...data.workplans.search, page: page, page_size: perPage }, false, {})
  }, [apiGetData, data])

  const clearData = useCallback(() => {
    
    apiGetData(`/api/v1/news`, {
      // ...data.overview.search,
      search: '',
      // order: "ASC",
      page: 1,
      page_size: 10
    }, false, {})
    dispatch(clearArticle(data.overview.search))
  }, [data, apiGetData, dispatch])

  const onReload = useCallback(() => {

    apiGetData(`/api/v1/news`, { ...data.overview.search }, false, {})
  }, [apiGetData, data])

  const handlerDelete = useCallback(async (news_id) => {

    const response = await apiDelete(`/api/v1/news/${news_id}`, {}, {}, false)
    if (response?.success) {
      onReload()
      message.success('ลบข้อมูลสำเร็จ')
    } else {
      message.error('ไม่สามารถลบข้อมูลได้')
    }
  }, [apiDelete, onReload])

  const confirmDelete = useCallback((news_id) => {

    Modal.confirm({
      title: 'ยืนยันการลบข้อมูล ?',
      content: 'ท่านต้องการลบข้อมูลข่าวสารใช่หรือไม่',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: () => handlerDelete(news_id),
      onCancel: () => Modal.destroyAll()
    })
  }, [handlerDelete])
  return (
    <div>
      <section>
        <FormSearchAddnews
          initialValues={data.overview.search}
          setOpen={setOpen}
          clearData={clearData}
          apiGetData={apiGetData}
        />
      </section>
      <section className='mt-5'>
        <TableAddnews
          setOpen={setOpen}
          // API DATA
          data={data.overview.data}
          loading={loading}
          // PAGE API
          page={data.overview.search.page}
          perPage={data.overview.search.page_size}
          total={data.overview.meta.total}
          onChange={onChangePage}
          confirmDelete={confirmDelete}
        />
      </section>
      <ModalAddnews
        open={open.open}
        info={open.info}
        setOpen={setOpen}
        onReload={onReload}
      />
    </div>
  );
};

export default React.memo(Addnews);
