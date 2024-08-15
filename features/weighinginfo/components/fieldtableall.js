import React, { useCallback } from 'react'
import { useForm, Form, Field } from '@/components/form'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons';

const Fieldtableall = (props) => {
  const { } = props;

  const form = useForm({
    initialValues: {},
    rules: {},
  })
  
  const buildValue = useCallback((values, next) => {
    next(values)
  }, [])
  
  const handlerSubmit = useCallback((values) => {
    console.log(values)
  }, [])

  return (
    <div>
      <label className='text-lg'>ค้นหา</label>
        <Form form={form} handlerSubmit={[buildValue, handlerSubmit]} className="grid grid-cols-2 md:grid-cols-4 gap-4 flex justify-center items-center w-2/4">
          <Field.DatePicker
            label='วันที่'
            name='date'
            />
          <Button icon={<SearchOutlined />}> 
            ค้นหา
          </Button>
          <label class="text-gray-700 cursor-pointer">
            ล้างการค้นหา
          </label>
        </Form>
    </div>
  

  )
}

export default React.memo(Fieldtableall)