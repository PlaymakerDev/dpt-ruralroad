import React, { useCallback, useRef } from 'react'
import { message, Modal } from 'antd'
import { Form, Field, useForm } from '@/components/form'
import usePutAPI from '@/utils/hooks/api/usePutAPI'

const ModalContent = (props) => {
  const { data, refSubmit, onClose, onSubmit } = props

  const form = useForm({
    initialValues: {
      camera_description: data?.camera_description || '',
      camera_type: data?.camera_type || 'FIXED'
    },
    rules: {},
  })

  const buildValue = useCallback((values, next) => {
    next(values)
  }, [])

  const handlerSubmit = useCallback(async (values) => {
    onSubmit(values)
  }, [])

  return (
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
      <Field.Input
        label='ชื่อกล้อง'
        name='camera_description'
        placeholder='ชื่อกล้อง'
      />
      <Field.Select
        label='ประเภทกล้อง'
        name='camera_type'
        placeholder='ประเภทกล้อง'
        optKeys={['id', 'name']}
        options={[
          {
            id: 'fixed',
            name: 'FIXED'
          },
          {
            id: 'PTZ',
            name: 'PTZ'
          },
        ]}
        allowClear={false}
        // SEARCHABLE
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
      />
      <button type='submit' hidden ref={refSubmit} />
    </Form>
  )
}

const ModalConfigCCTV = (props) => {
  const { open, info, onClose, onSearch, cctvRef } = props
  const refSubmit = useRef()
  const [apiPut, loading] = usePutAPI('overlay')

  const onSubmit = useCallback(async (body, id) => {
    const response = await apiPut('/api/v1/cctv/camera_name', body, { id: info?.id }, false)
    if (response?.success) {
      message.success('แก้ไขข้อมูลสำเร็จ')
      onSearch()
      onClose()
    } else {
      message.error('ไม่สามารถแก้ไขข้อมูลได้')
    }
  }, [info?.id])

  return (
    <Modal
      title="แก้ไขรายละเอียดกล้อง"
      open={open}
      onOk={() => refSubmit.current.click()}
      onCancel={() => onClose()}
      destroyOnClose
      okText='บันทึก'
      cancelText='ยกเลิก'
      okButtonProps={{
        htmlType: 'submit',
        type: 'primary',
        size: 'large',
        loading: loading
      }}
      cancelButtonProps={{
        htmlType: 'button',
        type: 'text',
        size: 'large'
      }}
    >
      <ModalContent
        data={info}
        refSubmit={refSubmit}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </Modal>
  )
}

export default React.memo(ModalConfigCCTV)
