import React, { useCallback, useContext, useMemo } from 'react'
import { FormContext } from '@olapat/react-useform';
import {
  getValues,
  getRequired,
  getDisabled,
  getError,
  getOnChange,
} from '@olapat/react-useform/dist/utils/field';
import styles from '@/styles/components/form/Field.module.css';
// import { useRouter } from 'next/router';
import { getErrorWithLocalKey } from './utils'
import useTrans from '@/utils/hooks/useTrans'
// LIBRARY COMPONENT
import dynamic from 'next/dynamic';
const FieldTextEditor = dynamic(() => { return import('@/components/custom-editor/TextEditor'); }, { ssr: false });

const TextEditor = (props) => {
  const {
    name,
    label,
    value,
    required,
    error,
    disabled,
    onChange,
    ...propsInput
  } = props;

  // const { locale } = useRouter();
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

  const _onChange = useCallback((values) => {
    const funChange = getOnChange(formContext, onChange);
    const value = values || '';
    funChange(name, value);
  },
    [formContext, name, onChange]
  );

  return (
    <div className={`${styles.container} ${_error ? 'a-error' : ''}`}>
      {!!label && (
        <label className={`${styles.label}`} htmlFor={name} title={label}>
          {!!_required && <span className={`${styles.star}`}>*&nbsp;</span>}
          {label}
        </label>
      )}
      
      <FieldTextEditor
        data={_value}
        onChange={_onChange}
        disabled={_disabled}
        {...propsInput}
      />
      {_errorWithLocal &&
        <span className={`${styles.error}`}>{tran[_errorWithLocal]}</span>
      }
    </div>
  )
}

export default React.memo(TextEditor)
