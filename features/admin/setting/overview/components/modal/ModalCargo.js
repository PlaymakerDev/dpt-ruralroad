import React, { useCallback, useRef } from "react";
import { Modal, Row, Col, Button } from "antd";
import { Form, Field, useForm } from "@/components/form";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useDeleteAPI from "@/utils/hooks/api/useDeleteAPI";
import usePutAPI from "@/utils/hooks/api/usePutAPI";
import usePostAPI from "@/utils/hooks/api/usePostAPI";

const Content = (props) => {
  const { data, funcGet, type, ref_btn, setOpen } = props;
  const [funcPut, loadingPut] = usePutAPI();
  const [funcPost, loadingPost] = usePostAPI();

  const form = useForm({
    initialValues: {
      role: '',
      cargo: data?.goods_name || null
    },
    rules: {},
  });

  const buildValue = useCallback((values, next) => {
    next(values);
  }, []);

  const handlerSubmit = useCallback(async (values) => {
    if (type === 'edit') {
      const { success } = await funcPut(`/api/v1/masters/goods/${data?.gid}`, { goods_name: values?.cargo, g_id: data?.gid }, undefined, true)
      if (success) {
        funcGet({})
        setOpen({ open: false, data: null, type: null })
      }
    } else if (type === 'create') {
      const { success } = await funcPost(`/api/v1/masters/goods`, { goods_name: values?.cargo }, undefined, true)
      if (success) {
        funcGet({})
        setOpen({ open: false, data: null, type: null })
      }
    }
  }, [data, funcGet, funcPost, funcPut, setOpen, type]);


  return (
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Field.Input
            label="สิ่งของบรรทุก"
            name="cargo"
            placeholder="สิ่งของบรรทุก"
          />
        </Col>
      </Row>
      <button ref={ref_btn} type="submit" hidden></button>
    </Form>
  );
};

const ConfirmDelete = (props) => {
  const { data, setOpen, funcGet } = props
  const [funcDelete, loadingDelete] = useDeleteAPI();

  const handlerDelete = useCallback(async () => {
    const { success } = await funcDelete(`/api/v1/masters/goods/${data?.gid}`)
    if (success) {
      funcGet({})
      setOpen({ open: false, data: null, type: null })
    }
  }, [data, funcDelete, funcGet, setOpen])

  return (
    <div className="flex items-center w-full justify-center flex-col">
      <div style={{
        boxShadow: '0px 0px 12px 0px #00FF771F',
        background: '#ff194333',
        height: '79px',
        width: '79px',
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center'
      }}
      >
        <ExclamationCircleFilled style={{
          color: 'red',
          fontSize: '48px',
          background: 'white',
          borderRadius: '50%'
        }} />
      </div>
      <div className="font-bold	 text-[24px] text-[#ffffff]">ยืนยันการลบข้อมูล ?</div>
      <div className="text-[14px] font-[IBMPlexSansThai-Light] text-[#ffffffe6]">ท่านต้องการลบข้อมูลสิ่งของบรรทุกใช่หรือไม่</div>
      <br />
      <div className="flex gap-[18px]">
        <Button style={{ color: '#A4A4A4', width: '167px' }} onClick={() => { setOpen({ open: false, type: null, data: null }) }}>ยกเลิก</Button>
        <Button style={{ width: '167px' }} type="primary" onClick={handlerDelete}>ยืนยัน</Button>
      </div>
    </div>
  )
}

const ModalCargo = (props) => {
  const { open, setOpen, data, type, funcGet } = props;
  const [funcPut, loadingPut] = usePutAPI();
  const [funcPost, loadingPost] = usePostAPI();
  const ref_btn = useRef()

  return (
    <Modal
      title={type === 'delete' ? undefined : 'เพิ่มข้อมูล'}
      open={open}
      destroyOnClose
      onOk={() => { ref_btn.current.click() }}
      onCancel={() => setOpen({ open: false, type: null, data: null })}
      width={type === 'delete' ? 500 : 700}
      okText='บันทึก'
      cancelText='ยกเลิก'
      footer={type === 'delete' ? null : undefined}
      okButtonProps={{
        loading: loadingPost || loadingPut,
        htmlType: 'submit',
        type: 'primary',
        size: 'large'
      }}
      cancelButtonProps={{
        htmlType: 'button',
        type: 'text',
        size: 'large'
      }}
    >
      <main className='my-5'>
        {type === "delete" ?
          <ConfirmDelete
            data={data}
            setOpen={setOpen}
            funcGet={funcGet}
          />
          :
          <Content
            data={data}
            type={type}
            setOpen={setOpen}
            funcGet={funcGet}
            ref_btn={ref_btn}
          />
        }
      </main>
    </Modal>
  );
};

export default React.memo(ModalCargo);
