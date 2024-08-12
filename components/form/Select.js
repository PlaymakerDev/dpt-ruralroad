import React, { useCallback, useContext, useMemo } from 'react';
import { Form, Select, Empty } from 'antd';
import { FormContext } from '@olapat/react-useform';
import {
  getValues,
  getRequired,
  getDisabled,
  getError,
  getOnChange,
} from '@olapat/react-useform/dist/utils/field';
import styles from '@/styles/components/form/Field.module.css';
import { useRouter } from 'next/router';
import { getErrorWithLocalKey } from './utils'
import useTrans from '@/utils/hooks/useTrans'

const { Option } = Select;

const SelectInput = (props) => {
  const {
    name,
    label,
    value,
    required,
    error,
    disabled,
    onChange,
    id,
    options,
    // data,
    optKeys: keys,
    style,
    hideRequired,
    ...propsInput
  } = props;
  const { locale } = useRouter();
  const formContext = useContext(FormContext);
  const tran = useTrans()

  const selectId = `select-body-${id || name}`;

  const _value = useMemo(() => {
    return getValues(formContext, name, value);
  }, [formContext, name, value]);

  const _required = useMemo(() => {
    return getRequired(formContext, name, required);
  }, [formContext, name, required]);

  const _error = useMemo(() => {
    return getError(formContext, name, error);
  }, [formContext, name, error]);

  const _errorWithLocal = useMemo(() => {
    return getErrorWithLocalKey(formContext, name, error);
  }, [formContext, name, error]);

  const _disabled = useMemo(() => {
    return getDisabled(formContext, name, disabled);
  }, [formContext, name, disabled]);

  const _onChange = useCallback(
    (value) => {
      const funChange = getOnChange(formContext, onChange);
      // const value = value || ''
      funChange(name, value);
    },
    [formContext, name, onChange]
  );

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
      <div id={selectId}>
        <Select
          getPopupContainer={() => document.getElementById(selectId)}
          optionFilterProp="label"
          notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          value={_value || null}
          disabled={_disabled}
          onChange={_onChange}
          size="large"
          style={{ width: '100%', ...style }}
          {...propsInput}
        >
          {!!options?.length &&
            options.map((item, index) => (
              <Option
                key={index}
                {...(item.props || {})}
                value={item[keys[0]]}
                label={item[keys[1]] || '-'}
              >
                {item[keys[1]] || '-'}
              </Option>
            ))}
        </Select>
      </div>
      <span className={_styleError}>{tran[_errorWithLocal]}</span>
    </div>
  );
};

export default SelectInput;

