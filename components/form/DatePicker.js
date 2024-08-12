import React, { useCallback, useContext, useMemo } from 'react';
import { Form, DatePicker as DatePickerAntd } from 'antd';
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
import Thai from 'antd/lib/date-picker/locale/th_TH';
import dayjs from 'dayjs';
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra)
dayjs.locale('th')

const DatePicker = (props) => {
  const {
    name,
    label,
    value,
    required,
    error,
    disabled,
    onChange,
    hideRequired,
    ...propsInput
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
    (value) => {
      const funChange = getOnChange(formContext, onChange);
      // const value = value
      funChange(name, value);
    },
    [formContext, name, onChange]
  );

  // Component level locale
  const buddhistLocale = {
    ...Thai,
    lang: {
      ...Thai.lang,
      fieldDateFormat: 'BBBB-MM-DD',
      fieldDateTimeFormat: 'BBBB-MM-DD HH:mm:ss',
      yearFormat: 'BBBB',
      cellYearFormat: 'BBBB',
    },
  };

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
      <DatePickerAntd
        name={name}
        value={_value}
        disabled={_disabled}
        onChange={_onChange}
        size="large"
        locale={buddhistLocale}
        {...propsInput}
        style={{ width: '100%', ...(propsInput.style || {}) }}
      />
      <span className={_styleError}>{tran[_errorWithLocal]}</span>
    </div>
  );
};

export default DatePicker;
