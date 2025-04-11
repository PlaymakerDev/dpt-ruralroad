import React, { useCallback, useMemo, useRef } from "react";
import { Modal, Row, Col, Typography, message, Upload } from "antd";
import { Form, Field, useForm } from "@/components/form";
import { FileOutlined, FileTextOutlined } from '@ant-design/icons'
import usePostAPI from "@/utils/hooks/api/usePostAPI";
import usePutAPI from "@/utils/hooks/api/usePutAPI";
import useDeleteAPI from "@/utils/hooks/api/useDeleteAPI";

const Content = (props) => {
  const { refSubmit, setOpen, onReload, info, showArticleImage, showArticleFile } = props;
  const [apiPost, loadingPost] = usePostAPI('overlay')
  const [apiPut, LoadingPut] = usePutAPI('overlay')
  const [apiDelete, loadingDelete] = useDeleteAPI('overlay')

  const form = useForm({
    initialValues: {
      article_image: showArticleImage || [],
      article_title: info.news_header ? info.news_header : '',
      article_description: info.news_content ? info.news_content : '',
      article_file: showArticleFile || []
    },
    rules: {
      article_image: {
        required: 'required_article_image'
      },
      article_title: {
        required: 'required_article_title'
      },
      article_description: {
        required: 'required_article_description'
      },
      // article_file: {
      //   required: 'required_article_file'
      // }
    },
  });

  const { errors, handlerChange } = form

  const buildValue = useCallback((values, next) => {
    const body = {
      article: {
        news_header: values.article_title,
        news_content: values.article_description
      },
      file: {
        news_image: values.article_image,
        file_attached: values.article_file,
      }
    }
    next(body)
  }, []);

  const handlerSubmit = useCallback(async (values, next) => {
    if (info?.news_id) {
      const response = await apiPut(`/api/v1/news/${info.news_id}`, { ...values.article, news_id: info?.news_id }, {}, false)
      if (response?.success) {
        next({
          file: values.file,
          response: response?.data
        })
      } else {
        message.error('ไม่สามารถสร้างข้อมูลข่าวสารได้')
      }
    } else {
      const response = await apiPost('/api/v1/news', values.article, {}, false)
      if (response?.success) {
        next({
          file: values.file,
          response: response?.data
        })
      } else {
        message.error('ไม่สามารถสร้างข้อมูลข่าวสารได้')
      }
    }
  }, [apiPost, apiPut, info]);

  const uploadFile = useCallback(async (values, next) => {
    // CHECK OBJ
    let articleImage = values.file.news_image.filter(item => item.originFileObj)
    let articleFile = values.file.file_attached.filter(item => item.originFileObj)

    if (!articleImage?.length && !articleFile?.length) {
      next(values)
      return
    }
    // BUILD UPLOAD BODY
    const body = new FormData()
    if (values.file.news_image[0].originFileObj) {
      body.append('news_image', values.file.news_image[0].originFileObj)
    }

    values.file.file_attached.forEach((file, index) => {
      if (file.originFileObj) {
        body.append(`file_attached${index + 1}`, file.originFileObj);
      }
    });

    const response = await apiPost(`/api/v1/news/${values.response.news_id}/upload_file`, body, {}, false, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    if (response?.success) {
      message.success('บันทึกสำเร็จ')
      onReload()
      setOpen({ open: false, info: {} })
    } else {
      message.error('ไม่สามารถสร้างข้อมูลข่าวสารได้')
    }
  }, [apiPost, onReload, setOpen]);

  const deleteFile = useCallback(async (values) => {
    // INIT DELETE ARR
    let deleteArr = [];
    // LOOP PUSH DELETE PARAMETER
    showArticleFile?.forEach(item => {
      const itemFileName = item.url.split('/').pop().split('.').slice(0, -1).join('.');
      if (itemFileName.startsWith("file_attached")) {
        const fileCheck = values.file.file_attached.find(file_item => file_item.url === item.url);
        if (!fileCheck) {
          deleteArr.push(item);
        }
      }
    });
    await Promise.all(deleteArr?.map(async (item) =>
      await apiDelete(`/api/v1/news/${values.response.news_id}/${item.url.split('/').pop().split('.').slice(0, -1).join('.')}`, {}, {}, false)
    ))

    message.success('บันทึกสำเร็จ')
    onReload()
    setOpen({ open: false, info: {} })
  }, [showArticleFile, apiDelete, onReload, setOpen])

  const iconRender = (file) => {
    if (file.status === 'done') {
      return <FileOutlined style={{ color: 'white' }} />;
    }
    return <FileTextOutlined style={{ color: 'white' }} />;
  };

  return (
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit, uploadFile, deleteFile]}>
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <figure className="large-article-block">
              <Field.Upload
                name='article_image'
                maxCount={1}
                accept="image/png, image/jpeg"
                listType='picture-card'
                maxSizeLimit={10000000}
                beforeUpload={(file) => {
                  // DEFAULT VALUES
                  const allowList = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']
                  const maxFileSize = 10000000
                  // CHECK
                  const isListAvailable = allowList.some(item => item === file.type)
                  const isLt10 = file.size < maxFileSize
                  if (!isListAvailable) {
                    // message.error('Invalid file type')
                    message.error('ประเภทไฟล์ไม่ถูกต้อง')
                    return Upload.LIST_IGNORE
                  }
                  if (!isLt10) {
                    // message.error('File size exceed')
                    message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                    return Upload.LIST_IGNORE
                  }
                  // RETURN UPLOAD.LIST_IGNORE
                  return false
                }}
                label='เลือกรูปภาพ'
                description={
                  <div className='flex flex-col flex-wrap justify-center mt-3'>
                    <Typography.Text className='!text-sm'>รองรับรูปแบบไฟล์ .png .jpeg .jpg ขนาดไม่เกิน 10MB</Typography.Text>
                  </div>
                }
                hideRequired={!errors.article_image}
              />
            </figure>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Field.Input
              label="หัวข้อข่าวสาร"
              name="article_title"
              placeholder="ระบุชื่อข่าวสาร"
              hideRequired={!errors.article_title}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>

              <Field.TextEditor
                label='รายละเอียดข่าวสาร'
                name='article_description'
                placeholder='ระบุรายละเอียดข่าวสาร'
                hideRequired={!errors.article_description}
                className="border border-red !w-10"
              />

          </Col>
        </Row>
      </section>
      <section className="mt-5">
        <div className="flex items-center justify-between">
          <Typography.Text>ไฟล์เอกสาร</Typography.Text>
          <Typography.Text>รองรับไฟล์ .pdf ขนาดไม่เกิน 10MB (สูงสุด 3 ไฟล์)</Typography.Text>
        </div>
        <figure className="mt-5 small-article-block">
          <Field.Upload
            name='article_file'
            maxCount={3}
            accept="application/pdf"
            listType='picture-card'
            maxSizeLimit={10000000}
            onRemove={(name, list) => {
              handlerChange({
                [name]: list,
              })
            }}
            beforeUpload={(file) => {
              // DEFAULT VALUES
              // const allowList = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']
              const allowList = ['application/pdf']
              const maxFileSize = 10000000
              // CHECK
              const isListAvailable = allowList.some(item => item === file.type)
              const isLt10 = file.size < maxFileSize
              if (!isListAvailable) {
                // message.error('Invalid file type')
                message.error('ประเภทไฟล์ไม่ถูกต้อง')
                return Upload.LIST_IGNORE
              }
              if (!isLt10) {
                // message.error('File size exceed')
                message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                return Upload.LIST_IGNORE
              }
              // RETURN UPLOAD.LIST_IGNORE
              return false
            }}
            label='เลือกไฟล์'
            // description={
            //   <div className='flex flex-col flex-wrap justify-center mt-3'>
            //     <Typography.Text className='!text-sm'>รองรับรูปแบบไฟล์ .png .jpeg .jpg ขนาดไม่เกิน 10MB</Typography.Text>
            //   </div>
            // }
            hideRequired={!errors.article_file}
            iconRender={iconRender}
          />
        </figure>
      </section>
      <button type='submit' ref={refSubmit} hidden />
    </Form>
  );
};

const ModalTrollway = (props) => {
  const { open, setOpen, onReload, info } = props;
  const [apiPost, loadingPost] = usePostAPI('overlay')
  const refSubmit = useRef()

  const renderArticleImage = useMemo(() => {
    if (info?.news_image) {
      return [
        {
          uid: 'ARTICLE01',
          name: 'ArticleImage',
          status: 'done',
          url: info?.news_image,
        },
      ]
    }
    return []
  }, [info?.news_image])

  const renderArticleFile = useMemo(() => {
    let arr = []
    if (info?.file_attached1) {
      arr.push(info?.file_attached1)
    }
    if (info?.file_attached2) {
      arr.push(info?.file_attached2)
    }
    if (info?.file_attached3) {
      arr.push(info?.file_attached3)
    }

    const mapArr = arr?.map((item, index) => {
      return {
        uid: index + 1,
        name: 'ArticleFile' + index + 1,
        status: 'done',
        url: item,
      }
    })
    return mapArr || []
  }, [info])

  return (
    <Modal
      title="เพิ่มข้อมูลข่าวสาร"
      open={open}
      destroyOnClose
      onOk={() => refSubmit.current.click()}
      onCancel={() => setOpen({ open: false, info: {} })}
      width={700}
      okText='บันทึก'
      cancelText='ยกเลิก'
      okButtonProps={{
        htmlType: 'submit',
        type: 'primary',
        size: 'large',
        onClick: () => refSubmit.current.click(),
        loading: loadingPost,
      }}
      cancelButtonProps={{
        htmlType: 'button',
        type: 'text',
        size: 'large'
      }}
    >
      <main className='my-5'>
        <Content
          showArticleImage={renderArticleImage}
          showArticleFile={renderArticleFile}
          refSubmit={refSubmit}
          setOpen={setOpen}
          info={info}
          onReload={onReload}
        />
      </main>
    </Modal>
  );
};

export default React.memo(ModalTrollway);
