import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PreviewContent = (props) => {
  const { } = props
  // GET DEFAULT LAYOUT
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer
        fileUrl="https://pdfobject.com/pdf/sample.pdf"
        plugins={[
          defaultLayoutPluginInstance,
        ]}
      />
    </Worker>
  )
}

export default React.memo(PreviewContent)
