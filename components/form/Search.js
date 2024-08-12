import React, { useCallback, useContext, useMemo } from 'react'
import { Form, Input } from 'antd'
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

const SearchInput = (props) => {
  const {
    name,
    label,
    value,
    required,
    error,
    disabled,
    onChange,
    maxLength,
    // notThai,
    // onlyNumber,
    onSearch,
    hideRequired,
    ...propsInput
  } = props
  const { Search } = Input;
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
      value = event?.target?.value || ''
      funChange(name, value)
    },
    [formContext, name, onChange]
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
      <Search
        name={name}
        value={_value}
        disabled={_disabled}
        onChange={_onChange}
        onSearch={onSearch}
        size="large"
        maxLength={maxLength || 255}
        {...propsInput}
      />
      <span className={_styleError}>{tran[_errorWithLocal]}</span>
    </div>
  )
}

SearchInput.propTypes = {
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

export default SearchInput
