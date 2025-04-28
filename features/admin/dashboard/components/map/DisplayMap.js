import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LongdoMap, map, longdo } from '@/components/map/LongdoMap'
import { MAP_PIN } from '../../mock'

const MAP_KEY = "f7ba675880ccab7ac7fd0a65f1b33553"

const DisplayMap = (props) => {
  const { } = props
  const [display, setDisplay] = useState(false)
  const mapRef = useRef()

  console.log("===", MAP_PIN.station.map(item => {
    return {
      lon: item.Longtitude,
      lat: item.Latitude,
    }
  }))

  const initMap = useCallback(() => {
    if (map && longdo) {
      setDisplay(true)
      // map.Layers.setBase(longdo.Layers.GRAY);
      new window.longdo.Map({
        placeholder: '',
        language: 'th',
        lastView: false,
        zoom: 13, // เพิ่มค่า zoom เริ่มต้น
        // zoomRange: { min: 12, max: 14 },

        mouse: {
          wheel: false, // ปิดการซูมด้วยลูกกลิ้งเมาส์
        }
      })
      // ตั้งค่าพื้นฐานของแผนที่
      map.Layers.setBase(window.longdo.Layers.NORMAL)

      // แสดงเครื่องมือบนแผนที่
      map.Ui.DPad.visible(false)
      map.Ui.Zoombar.visible(false)
      map.Ui.Geolocation.visible(false)
      map.Ui.Toolbar.visible(false)
      map.Ui.LayerSelector.visible(false)
      map.Ui.Fullscreen.visible(false)
      map.Ui.Crosshair.visible(false)
      map.Ui.Scale.visible(false)

      // Add other map configurations here
      MAP_PIN.station.map(item => {
        map.Overlays.add(new longdo.Marker({ lon: item.Longtitude, lat: item.Latitude }));
      })
    }

    setDisplay(false)
  }, [MAP_PIN, map, longdo, display, setDisplay])

  // const loadLongdoMapScript = useCallback(() => {
  //   if (longdo) {
  //     initMap()
  //   }

  //   const script = document.createElement('script')
  //   script.src = 'https://api.longdo.com/map/?key=f7ba675880ccab7ac7fd0a65f1b33553'
  //   script.async = true
  //   script.onload = () => {
  //     initMap()
  //   }
  //   script.onerror = () => {
  //     console.error('ไม่สามารถโหลด Longdo Map API ได้')
  //     // อาจจะเพิ่มการแจ้งเตือนหรือลองใหม่
  //   }
  //   document.head.appendChild(script)
  // }, [])

  useEffect(() => {
    initMap()
  }, [])

  return (
    <>
    <button onClick={() => initMap()}>Loadmap</button>
      {display ?
        <LongdoMap
          id="longdo-map"
          mapKey={MAP_KEY}
          callback={initMap()}
        />
        : null
      }
    </>
  )
}

export default React.memo(DisplayMap)
