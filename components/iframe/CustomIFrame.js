import React, { useEffect, useRef } from 'react';

const CustomIFrame = (props) => {
  const { src, ...iframeProps } = props

  const iframeRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const iframe = iframeRef.current;
      if (iframe) {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleResize);
    }

    // Cleanup
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleResize);
      }
    };
  }, []);

  return (
    <iframe ref={iframeRef} src={src} {...iframeProps} />
  )
}

export default React.memo(CustomIFrame)
