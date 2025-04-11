import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useRouter } from 'next/router';

const Test = (props) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const router = useRouter();
  const { id } = router.query;


  const renderForm = () => {
    if (id === '1' || id === '2' || id === '3') {
      return <FormSearch />;
    } else if (id === '13' || id === '14') {
      return <FormSearchTest />;
    }
    return null;
  };

  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl="https://pdfobject.com/pdf/sample.pdf"
          plugins={[defaultLayoutPluginInstance]}
        />
      </Worker>
    </>
  );
};

export default React.memo(Test);
