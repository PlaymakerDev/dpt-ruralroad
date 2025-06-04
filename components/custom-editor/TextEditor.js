import React, { useCallback } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

// const editorConfiguration = {
//   licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NTAyOTExOTksImp0aSI6ImIyMGEzNTM0LTc5YjktNGE1OS1hODY5LTdkMzQzYmY4MjJlNSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6Ijg5NzU0NmQ2In0.t1tgEB61UpEzg9BGEmd-qqV0d4aFQcnFgIqvyOHDSNNz1lFlYSWMa31J3WLCA9UXzrGjiX48nBQl8yBUIJnxGA',
//   toolbar: [
//     'heading',
//     '|',
//     'bold',
//     'italic',
//     'link',
//     'bulletedList',
//     'numberedList',
//     '|',
//     'outdent',
//     'indent',
//     '|',
//     'imageUpload',
//     'blockQuote',
//     'insertTable',
//     'mediaEmbed',
//     'undo',
//     'redo'
//   ]
// };

const TextEditor = (props) => {
  const { initialData, data, onChange, disabled } = props

  const _onChange = useCallback((event, editor) => {
    const data = editor.getData()
    if (typeof onChange === 'function') {
      return onChange(data)
    }
  }, [onChange])

  return (
    // <CKEditor
    //   editor={Editor}
    //   config={editorConfiguration}
    //   data={data}
    //   onChange={(event, editor) => _onChange(event, editor)}
    //   disabled={disabled}
    // />
    <CKEditor
      editor={ClassicEditor}
      config={{
        licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NTAyOTExOTksImp0aSI6ImIyMGEzNTM0LTc5YjktNGE1OS1hODY5LTdkMzQzYmY4MjJlNSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6Ijg5NzU0NmQ2In0.t1tgEB61UpEzg9BGEmd-qqV0d4aFQcnFgIqvyOHDSNNz1lFlYSWMa31J3WLCA9UXzrGjiX48nBQl8yBUIJnxGA', // Or 'GPL'.
        // plugins: [Essentials, Paragraph, Bold, Italic],
        // toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|'],
        // initialData: initialData || '<p>Hello from CKEditor 5 in React!</p>'
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
      }}
      data={data}
      onChange={(event, editor) => _onChange(event, editor)}
      disabled={disabled}
    />
  )
}

export default React.memo(TextEditor)
