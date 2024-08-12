import React, { useCallback, useContext, useMemo } from 'react';
import { Checkbox as CheckboxAntd } from 'antd';
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

const Checkbox = (props) => {
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
    optKeys: keys,
    styleField,
    ...propsCheckbox
  } = props;
  const { locale } = useRouter();
  const formContext = useContext(FormContext);
  const tran = useTrans()

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
    (values) => {
      const funChange = getOnChange(formContext, onChange);
      const value = values;
      funChange(name, value);
    },
    [formContext, name, onChange]
  );

  const _options = useMemo(() => {
    if (options?.length && keys?.length) {
      return options.map((item) => ({
        label: item[keys[1]],
        value: item[keys[0]],
        ...item,
      }));
    } else {
      return [];
    }
  }, [options, keys]);

  return (
    <div
      className={`${styles.container} ${_error ? 'a-error' : ''}`}
      style={styleField}
    >
      {!!label && (
        <label className={`${styles.label}`} htmlFor={name} title={label}>
          {!!_required && <span className={`${styles.star}`}>*</span>}
          {label}
        </label>
      )}
      <div className="ant-col ant-form-item-control">
        <CheckboxAntd.Group
          value={_value}
          onChange={_onChange}
          options={_options}
          disabled={_disabled}
          {...propsCheckbox}
        ></CheckboxAntd.Group>
      </div>
      <span className={`${styles.error}`}>{tran["error_massage_form" + _errorWithLocal]}</span>
    </div>
  );
};

export default Checkbox;
