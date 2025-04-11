import React, { useCallback, useContext, useMemo } from 'react'
import { message, Typography, Button, Upload as UploadAntd } from 'antd'
import { UploadOutlined, PlusOutlined, EyeOutlined, DeleteOutlined, FilePdfOutlined } from '@ant-design/icons'
import { FormContext } from '@olapat/react-useform'
import {
  getValues,
  getRequired,
  getDisabled,
  getError,
  getOnChange,
} from '@olapat/react-useform/dist/utils/field'
import PropTypes from 'prop-types'
import uploadStyles from '@/styles/components/form/Upload.module.css'
import styles from '@/styles/components/form/Field.module.css'
import { getErrorWithLocalKey } from './utils'
import useTrans from '@/utils/hooks/useTrans'

const Upload = (props) => {
  const {
    // init,
    title,
    name,
    label,
    description,
    value,
    required,
    error,
    disabled,
    onChange,
    id,
    accept,
    maxSizeLimit = 5000000,
    onRemove,
    // notPdf,
    beforeUpload,
    listType,
    fileList,
    defaultFileList,
    // allowMultiple,
    maxCount,
    hasStar,
    hideRequired,
    previewFile,
    ...propsUpload
  } = props
  const formContext = useContext(FormContext)
  const tran = useTrans()

  const _value = useMemo(() => {
    return getValues(formContext, name, value)
  }, [formContext, name, value])

  const _required = useMemo(() => {
    return getRequired(formContext, name, required)
  }, [formContext, name, required])

  const _error = useMemo(() => {
    return getError(formContext, name, error)
  }, [formContext, name, error])

  const _errorWithLocal = useMemo(() => {
    if (error) return error
    return getErrorWithLocalKey(formContext, name, error);
  }, [formContext, name, error])

  const _disabled = useMemo(() => {
    return getDisabled(formContext, name, disabled)
  }, [formContext, name, disabled])

  const _onChange = useCallback(
    (value) => {
      const funChange = getOnChange(formContext, onChange)
      funChange(name, value.fileList)
    },
    [formContext, name, onChange]
  )

  const _onRemove = useCallback((file) => {
    // if (typeof onRemove === 'function') {
    //   return onRemove(file)
    // }
    const funChange = getOnChange(formContext, onRemove)
    funChange(name, _value?.filter((item) => item?.uid !== file?.uid), file)
  }, [onRemove, _value, formContext, name])

  // const onClickRemove = useCallback((event: any) => {
  //   event.stopPropagation()
  //   event.preventDefault()
  //   _onChange(null)
  // }, [_onChange])

  const _onBeforeUpload = useCallback((file, fileList) => {
    if (typeof beforeUpload === 'function') {
      return beforeUpload(file, fileList)
    }

    let acceptMimeTypes = accept?.split(',') || []

    if (acceptMimeTypes.length) {
      acceptMimeTypes = acceptMimeTypes.map(item => item.trim())
      if (!acceptMimeTypes.includes(file.type)) {
        message.error(`ไม่สามารถอัปโหลดไฟล์ได้ ประเภทไฟล์ไม่ถูกต้อง`)
        return UploadAntd.LIST_IGNORE
      }
    }

    const isOverMaxSize = file.size > maxSizeLimit
    if (isOverMaxSize) {
      message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
      return UploadAntd.LIST_IGNORE 
    }
    // return isOverMaxSize ? UploadAntd.LIST_IGNORE : true;
    return false;
  }, [beforeUpload, maxSizeLimit, accept])

  const _styleError = useMemo(() => {
    let res = [`${styles.error}`]
    if (hideRequired) {
      res.push('hidden')
    }
    return res.join(' ')
  }, [hideRequired])

  const _previewFile = useCallback(async (file) => {
    if (typeof previewFile === 'function') {
      return previewFile(file)
    }
    if (file.type && file.type.startsWith('image/')) {
      const objectURL = URL.createObjectURL(file)
      return objectURL
    } else if (file.type && file.type === 'application/pdf') {
      const pdfBlob = new Blob([file.originFileObj], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    }
    return false
  }, [previewFile])

  const _itemRender = useCallback((originNode, file) => {
    if (file.type === 'application/pdf') {
      return (
        <div className={uploadStyles.customUploadItem}>
          {originNode}
          <div className={uploadStyles.previewOverlay}>
            <EyeOutlined
              className={uploadStyles.previewIcon}
              onClick={() => _previewFile(file)}
            />
            <DeleteOutlined
              className={uploadStyles.deleteIcon}
              onClick={() => _onRemove(file)}
            // onClick={() => _onChange(file)}
            />
          </div>
        </div>
      )
    }
    return originNode
  }, [_previewFile, _onRemove]);

  return (
    <div className={`${styles.container} ${_error ? 'a-error' : ''}`}>
      {!!title && (
        <label className={`${styles.label}`} htmlFor={name} title={typeof title === 'string' ? title : ''}>
          {!!_required && hasStar && <span className={`${styles.star} mr-1`}>*</span>}
          {title}
        </label>
      )}
      <UploadAntd
        defaultFileList={defaultFileList || []}
        fileList={_value || []}
        id={id}
        accept={accept}
        onChange={_onChange}
        listType={listType}
        disabled={_disabled}
        beforeUpload={_onBeforeUpload}
        maxCount={maxCount}
        onRemove={_onRemove}
        style={{
          width: '100% !important'
        }}
        // PUT IT HERE
        previewFile={_previewFile}
        // LINE END HERE
        itemRender={_itemRender}
        showUploadList={{
          showRemoveIcon: (file) => {
            if (file.type === 'application/pdf') {
              return false
            } else {
              return true
            }
          }
        }}
        {...propsUpload}
      >
        {listType === 'picture-card' || listType === 'picture-circle' ?
          maxCount && _value.length >= maxCount ? null :
            <div>
              {/* <PlusOutlined style={{ display: 'block', color: '#3260E1', fontSize: 25, marginBottom: 10 }} /> */}
              <UploadOutlined style={{ display: 'block', color: '#FFFFFF', fontSize: 25, marginBottom: 10 }} />
              <Typography.Text strong>{label || 'อัปโหลด'}</Typography.Text><br />
              {description || ''}
            </div> :
          <Button icon={<UploadOutlined />} disabled={_disabled}>
            {label || 'อัปโหลด'}
          </Button>
        }
        {/* {!!maxCount && (
          _value.length >= maxCount ? null : (
            listType === 'picture-card' || listType === 'picture-circle' ?
              <Typography.Text>&#43; อัปโหลดไฟล์</Typography.Text> :
              <Button icon={<UploadOutlined />} disabled={_disabled}>
                {label || 'อัปโหลดไฟล์'}
              </Button>
          )
        )}
        {!maxCount && (
          listType === 'picture-card' || listType === 'picture-circle' ?
            <Typography.Text>&#43; อัปโหลดไฟล์</Typography.Text> :
            <Button icon={<UploadOutlined />} disabled={_disabled}>
              {label || 'อัปโหลดไฟล์'}
            </Button>
        )} */}
      </UploadAntd>
      <span className={_styleError}>{tran[_errorWithLocal]}</span>
    </div>
  )
}

Upload.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.any,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  accept: PropTypes.string,
  maxSizeLimit: PropTypes.number,
  // init: PropTypes.any,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  // addon
  beforeUpload: PropTypes.func,
  listType: PropTypes.string,
  defaultFileList: PropTypes.array,
  fileList: PropTypes.array,
  allowMultiple: PropTypes.bool,
  maxCount: PropTypes.number,
  hasStar: PropTypes.bool,
  onRemove: PropTypes.func
}

Upload.defaultProps = {
  accept: 'image/png,image/jpeg,application/pdf',
  maxSizeLimit: 5000000,
  listType: 'picture',
  hasStar: true
}

export default Upload
