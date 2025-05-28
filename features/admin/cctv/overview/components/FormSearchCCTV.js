import React, { useCallback, useMemo, useRef } from 'react'
import { Form, Field, useForm } from "@/components/form";

const FormSearchCCTV = (props) => {
  const { dptGroup, defaultSearch, apiGetData, cctvRef, clearSearch, setCCTVStatus } = props
  const submitRef = useRef()

  const form = useForm({
    initialValues: {
      department_id: ''
    },
    rules: {}
  })

  const { handlerChange } = form;

  const strDptGroup = useMemo(() => {
    const updateArr = dptGroup?.map((item) => {
      return {
        ...item,
        department_id: String(item.department_id)
      }
    })
    return updateArr
  }, [dptGroup])

  const onChangeDptGroup = useCallback(async (name, value) => {
    await handlerChange({
      [name]: String(value)
    })
    await submitRef.current?.click()
  }, [])

  const buildValue = useCallback((values, next) => {
    const body = {
      department_id: values.department_id
    }
    next(body)
  }, [])

  const handlerSubmit = useCallback((values) => {
    apiGetData('/api/v1/cctv/deparment_list_sum', {
      ...defaultSearch,
      ...values,
      page_size: 100
    }, false)

  }, [])

  return (
    <Form
      form={form}
      handlerSubmit={[buildValue, handlerSubmit]}
    >
      <Field.Select
        label='หน่วยงาน'
        name='department_id'
        placeholder='หน่วยงาน'
        optKeys={['department_id', 'department_name']}
        options={strDptGroup}
        allowClear={false}
        // SEARCHABLE
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        hideRequired
        onChange={(name, value) => {
          onChangeDptGroup(name, value)
          clearSearch()
          setCCTVStatus(null)
        }}
      />
      <button ref={submitRef} type="submit" hidden />
    </Form>
  )
}

export default React.memo(FormSearchCCTV)
