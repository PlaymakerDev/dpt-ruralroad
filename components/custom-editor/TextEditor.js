import React, { useCallback, useMemo } from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    'imageUpload',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo'
  ]
};

const TextEditor = (props) => {
  const { initialData, data, onChange, disabled } = props

  const _onChange = useCallback((event, editor) => {
    const data = editor.getData()
    if (typeof onChange === 'function') {
      return onChange(data)
    }
  }, [onChange])

  return (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data={data}
      onChange={(event, editor) => _onChange(event, editor)}
      disabled={disabled}
    />
  )
}

export default React.memo(TextEditor)
