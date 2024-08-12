import React, { useCallback, useContext, useMemo } from 'react'
import { Form, Input, Tooltip } from 'antd'
import { FormContext } from '@olapat/react-useform'
import {
  getValues,
  getRequired,
  getDisabled,
  getError,
  getOnChange,
} from '@olapat/react-useform/dist/utils/field'
import PropTypes from 'prop-types'
import styles from '@/styles/components/form/Field.module.css'
import { useRouter } from 'next/router'
import { getErrorWithLocalKey } from './utils'
import useTrans from '@/utils/hooks/useTrans'
import { CheckCircleFilled, CloseCircleFilled, LoadingOutlined, InfoCircleFilled } from "@ant-design/icons";

const TextInput = (props) => {
  const {
    name,
    label,
    value,
    required,
    error,
    disabled,
    onChange,
    maxLength,
    notThai,
    onlyNumber,
    hideRequired,
    inputSuccess,
    inputError,
    inputWarning,
    inputLoading,
    ...propsInput
  } = props
  const { locale } = useRouter()
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
    return getErrorWithLocalKey(formContext, name, error)
  }, [formContext, name, error])

  const _disabled = useMemo(() => {
    return getDisabled(formContext, name, disabled)
  }, [formContext, name, disabled])

  const _onChange = useCallback(
    (event) => {
      let value
      const funChange = getOnChange(formContext, onChange)
      if (notThai) {
        let regex = /([ก-๙\s])/g
        if (!regex.test(event?.target?.value)) {
          value = event?.target?.value || ''
          funChange(name, value)
        }
      } else if (onlyNumber) {
        // let regex = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g
        let regex = /^(\(?\+?[0-9]*\)?)?[0-9_\\(\)]*$/g
        if (regex.test(event?.target?.value)) {
          value = event?.target?.value || ''
          funChange(name, value)
        }
      } else {
        value = event?.target?.value || ''
        funChange(name, value)
      }
    },
    [formContext, name, onChange, notThai, onlyNumber]
  )

  const _styleError = useMemo(() => {
    let res = [`${styles.error}`]
    if (hideRequired) {
      res.push('hidden')
    }
    return res.join(' ')
  }, [hideRequired])

  return (
    <div className={`${styles.container} ${_error ? 'a-error' : ''}`}>
      {!!label && (
        <label className={`${styles.label}`} htmlFor={name} title={label}>
          {!!_required && <span className={`${styles.star}`}>*</span>}
          {label}
        </label>
      )}
      <Input
        name={name}
        value={_value}
        disabled={_disabled}
        onChange={_onChange}
        size="large"
        maxLength={maxLength || 255}
        {...(inputSuccess && 
          { 
          style: {
            background: "rgba(28, 188, 64, 0.1)",
            border: '2px solid #1cbc40',
            borderWidth: '2px'
          },
          suffix: (
            <Tooltip>
              <CheckCircleFilled style={{ color: '#1CBD40' }} />
            </Tooltip>
          )
          }
        )}
        {...(inputError && 
          { 
          style: {
            background: "rgba(193, 0,34, 0.1)",
            border: '2px solid #c10022',
            borderWidth: '2px'
          },
          suffix: (
            <Tooltip>
              <CloseCircleFilled style={{color: '#c10022'}}/>
            </Tooltip>
          )
          }
        )}
        {...(inputLoading && 
          { 
          suffix: (
            <Tooltip>
              <LoadingOutlined style={{color: '#cccccc'}}/>
            </Tooltip>
          )
          }
        )}
        {...(inputWarning && 
          { 
            style: {
              background: "rgba(236, 167, 32, 0.1)",
              border: '2px solid #eca720',
              borderWidth: '2px'
            },
            suffix: (
              <Tooltip>
                <InfoCircleFilled style={{color: '#eca720'}}/>
              </Tooltip>
            )
            }
        )}
        {...propsInput}
      />
      <span className={_styleError}>{tran[_errorWithLocal]}</span>
    </div>
  )
}

TextInput.propTypes = {
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
  type: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  hasStar: PropTypes.bool
}

export default TextInput
