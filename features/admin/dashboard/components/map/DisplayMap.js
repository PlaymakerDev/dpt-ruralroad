import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LongdoMap, map, longdo } from '@/components/map/LongdoMap'
import { MAP_PIN } from '../../mock'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getPosition } from '@/store/features/dashboardSlice'
import { Spin } from 'antd'
import TruckWeight from '@/components/icon/TruckWeight'
import Button from 'antd'

const MAP_KEY = "f7ba675880ccab7ac7fd0a65f1b33553"

const DisplayMap = (props) => {
  const { } = props
  const [display, setDisplay] = useState(false)

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getPosition, reducerName: 'dashboard', reducerKey: 'position'
  })

  useEffect(() => {
    apiGetData('/api/v1/dashboards/position', {}, false)
  }, [])

  const initMap = useCallback(() => {
    if (map && longdo) {
      new window.longdo.Map({
        placeholder: 'map__container',
        language: 'th',
        lastView: false,
        zoom: 10, // เพิ่มค่า zoom เริ่มต้น
        // zoomRange: { min: 12, max: 14 },

        mouse: {
          wheel: false,
        },
      })
      map.Layers.setBase(longdo.Layers.GRAY);
      // แสดงเครื่องมือบนแผนที่
      // map.Ui.DPad.visible(false)
      // map.Ui.Zoombar.visible(false)
      // map.Ui.Geolocation.visible(false)
      // map.Ui.Toolbar.visible(false)
      // map.Ui.LayerSelector.visible(false)
      // map.Ui.Fullscreen.visible(false)
      // map.Ui.Crosshair.visible(false)
      // map.Ui.Scale.visible(false)

      // ปิดการซูมด้วยปุ่มเมาส์ (ถ้ามี)
      // if (map.Ui.Mouse) {
      //   map.Ui.Mouse.enableWheel(false)
      // }
      // Add other map configurations here

      // IF STATION EXISTED
      if (!!data?.overview?.data?.station?.length) {
        data?.overview?.data?.station?.map(item => {
          console.log("station", item)
          const stationMarker = new longdo.Marker(
            { lon: item.Longtitude, lat: item.Latitude },
            {
              title: item.StationName,
              icon: {
                // url: '/images/truck-wim.svg',
                // size: { width: 70, height: 50 }
                url: '/images/markerstation.svg',
                size: { width: 60, height: 70 }
              },
              popup: {
                html: `<figcaption class="popup-figure"><section><h1 class="popup-title">${item.StationName}</h1><p class="popup-description">${item.LocationDescription}</p></section><section style="margin-top: 0.25rem;"><h2 class="popup-subtitle">สถานะ</h2><div class="popup-container"><p class="popup-description">จำนวนรถเข้าชั่ง: ${item.Total}</p><p class="popup-description">จำนวนบรรจุเกิน: ${item.Over}</p></div></section><section style="margin-top: 0.25rem;"><h2 class="popup-subtitle">พิกัด</h2><div class="popup-container"><p class="popup-description">ละติจูด: ${item.Latitude}</p><p class="popup-description">ลองจิจูด: ${item.Longtitude}</p></div></section><Button type="primary" size="large">Sample</Button></figcaption>`,
                size: {
                  width: 500
                }
              }
            }
          )
          map.Overlays.add(stationMarker);
        })
      }

      // IF WIM EXISTED
      if (!!data?.overview?.data?.wim?.length) {
        data?.overview?.data?.wim?.map(item => {
          console.log("wim", item)
          const WIMMarker = new longdo.Marker(
            { lon: item.Longtitude, lat: item.Latitude },
            {
              title: item.StationName,
              icon: {
                // url: '/images/truck-inspect.svg',
                // size: { width: 70, height: 50 }
                url: '/images/markerwin.svg',
                size: { width: 60, height: 70 }
              },
              popup: {
                html: `
                <figcaption class="popup-figure">
                  <section>
                    <h1 class="popup-title">${item.StationName}</h1>
                    <p class="popup-description">${item.LocationDescription}</p>
                  </section>
                  <section style="margin-top: 0.25rem;">
                    <h2 class="popup-subtitle">สถานะ</h2>
                    <div class="popup-container">
                      <p class="popup-description">จำนวนรถเข้าชั่ง: ${item.Total}</p>
                      <p class="popup-description">จำนวนบรรจุเกิน: ${item.Over}</p>
                    </div>
                  </section>
                  <section style="margin-top: 0.25rem;">
                    <h2 class="popup-subtitle">พิกัด</h2>
                    <div class="popup-container">
                      <p class="popup-description">ละติจูด: ${item.Latitude}</p>
                      <p class="popup-description">ลองจิจูด: ${item.Longtitude}</p>
                    </div>
                  </section>
                  <Button type="primary" size="large">Sample</Button>
                </figcaption>`,
                size: {
                  width: 500
                }
              }

            }
          )
          map.Overlays.add(WIMMarker);
        })
      }

      // IF MOBILE EXISTED
      if (!!data?.overview?.data?.mobile?.length) {
        data?.overview?.data?.mobile?.map(item => {
          console.log("mobile", item)
          const mobileMarker = new longdo.Marker(
            { lon: item.Longtitude, lat: item.Latitude },
            {
              title: item.StationName,
              icon: {
                // url: '/images/truck-weight.svg',
                // size: { width: 70, height: 50 }
                url: '/images/markermobile.svg',
                size: { width: 60, height: 70 }
              },
              popup: {
                html: `
                <figcaption class="popup-figure">
                  <h1 class="popup-title">${item.WayID}</h1>
                  <section style="margin-top: 0.25rem;">
                    <h2 class="popup-subtitle">สถานะ</h2>
                    <div class="popup-container">
                      <p class="popup-description">จำนวนรถเข้าชั่ง: ${item.Total}</p>
                      <p class="popup-description">จำนวนบรรจุเกิน: ${item.Over}</p>
                    </div>
                  </section>
                  <section style="margin-top: 0.25rem;">
                    <h2 class="popup-subtitle">พิกัด</h2>
                    <div class="popup-container">
                      <p class="popup-description">ละติจูด: ${item.Latitude}</p>
                      <p class="popup-description">ลองจิจูด: ${item.Longtitude}</p>
                    </div>
                  </section>
                  <button onClick={() => console.log("test")}>Sample</button>
                </figcaption>`,
                size: {
                  width: 500
                }
              }
            }
          )
          map.Overlays.add(mobileMarker);
        })
      }
    }
  }, [MAP_PIN, map, longdo, loading, data])

  useEffect(() => {
    if (!loading) {
      initMap()
    }
  }, [loading])

  const renderMap = useMemo(() => {
    if (!loading) {
      return (
        <LongdoMap
          id="longdo-map"
          mapKey={MAP_KEY}
          callback={initMap()}
        />
      )
    } else {
      return <Spin spinning={loading} />
    }
  }, [loading, MAP_KEY, initMap])

  return (
    <>
      {renderMap}
    </>
  )
}

export default React.memo(DisplayMap)
