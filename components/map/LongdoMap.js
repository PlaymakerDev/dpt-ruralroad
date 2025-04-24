'use client';

import { useEffect, useRef } from 'react';

// We'll use these exports to match the original API
export let longdo;
export let map;

export const LongdoMap = (props) => {
  const { id, mapKey, callback } = props
  const initMap = useRef(false);
  
  const mapCallback = () => {
    // Only initialize if not already done and if longdo is available
    if (!initMap.current && window.longdo) {
      longdo = window.longdo;
      
      // Check if the Map constructor exists before using it
      if (window.longdo.Map) {
        map = new window.longdo.Map({
          placeholder: document.getElementById(id),
          language: 'en'
        });
        initMap.current = true;
        
        // Call the callback function if provided
        if (callback) callback();
      } else {
        console.error('Longdo Map constructor not available yet');
        // Try again after a short delay
        setTimeout(mapCallback, 100);
      }
    }
  };

  useEffect(() => {
    // Make sure we're in a browser environment
    if (typeof window === 'undefined') return;
    
    // Function to wait for Longdo API to fully load
    const initMap = () => {
      // Try to initialize the map
      if (window.longdo) {
        mapCallback();
      } else {
        console.log('Waiting for Longdo API to load...');
        // Check again after a short delay
        setTimeout(initMap, 100);
      }
    };

    // Check if script already exists
    const existingScript = document.getElementById('longdoMapScript');
    
    if (!existingScript) {
      // Create and load the script if it doesn't exist
      const script = document.createElement('script');
      script.src = `https://api.longdo.com/map/?key=${mapKey}`;
      script.id = 'longdoMapScript';
      
      // Set up the onload event before adding to the DOM
      script.onload = () => {
        console.log('Longdo script loaded');
        // Wait a moment for the API to initialize
        setTimeout(initMap, 100);
      };
      
      document.body.appendChild(script);
    } else {
      // If script already exists, try to initialize map
      initMap();
    }
    
    // Clean up function
    return () => {
      initMap.current = false;
    };
  }, [mapKey, callback, id]); // Dependencies for the effect

  return (
    <div id={id} style={{ width: '100%', height: '100%', color: 'black' }}></div>
  );
}