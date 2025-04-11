import React, { useCallback, useContext, useMemo, useEffect } from 'react';
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
import useGetAPI from '@/utils/hooks/api/useGetAPI';

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
    apiPath,
    ...propsInput
  } = props;
  const { locale } = useRouter();
  const formContext = useContext(FormContext);
  const tran = useTrans()

  const [apiGet, loading, data] = useGetAPI('overlay', {
    funcDispatch: apiPath?.dispatchKey, reducerName: apiPath?.reducerName, reducerKey: apiPath?.reducerKey
  })

  useEffect(() => {
    if (apiPath?.path) {
      apiGet(apiPath?.path, {}, false, {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiPath?.path])

  const _options = useMemo(() => {
    if (apiPath?.path) {
      return data[apiPath?.mapKey]
    }

    return options
  }, [apiPath?.path, apiPath?.mapKey, data, options])

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
          {!!_options?.length &&
            _options.map((item, index) => (
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
        <span className={_styleError}>{tran[_errorWithLocal]}</span>
      </div>
    </div>
  );
};

export default SelectInput;

