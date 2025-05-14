import React, { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import useGetAPI from '@/utils/hooks/api/useGetAPI';
import { getPosition } from '@/store/features/dashboardSlice';
import { Button, Dropdown } from 'antd';
const SpecMap = dynamic(() => import('@/features/admin/dashboard/components/map/SpecMap'), { ssr: false })
// const Map = dynamic(() => import('@/components/map/Map2.js'), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const DisplayMap = (props) => {
  const { } = props;

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getPosition, reducerName: 'dashboard', reducerKey: 'position'
  })

  useEffect(() => {
    apiGetData('/api/v1/dashboards/position', {}, false)
  }, [])

  const mapData = data.overview.data

  const renderMobileMarker = useMemo(() => {
    if (typeof window === 'undefined' || !mapData?.mobile) return null;

    const leaflet = require('leaflet');
    // RENDER
    const mobileMarker = mapData?.mobile?.map((item, index) => {
      // INIT ICON
      const pinIcon = new leaflet.icon({
        iconUrl: item.isEnable ? `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-icon-2x-blue.png` : `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-icon-2x-black.png`,
        shadowUrl: `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-shadow.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
      return (
        <Marker
          key={`mobile-${index}`}
          position={[item.Latitude, item.Longtitude]}
          eventHandlers={{
            mouseover: (event) => event.target.openPopup(),
            mouseout: (event) => event.target.closePopup(),
            click: () => console.log('first')
          }}
          icon={pinIcon}
        >
          <Popup className="w-60" autoPan={false}>
            <figcaption>
              <section>
                <h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>รายละเอียด</h1>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ชื่อสถานี: <strong>{item.WayID}</strong></p>
              </section>
              <hr className='my-3' />
              <section>
                <h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>พิกัด</h1>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ละติจูด: <strong>{item.Latitude || 0}</strong></p>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ลองจิจูด: <strong>{item.Longtitude || 0}</strong></p>
              </section>
            </figcaption>
          </Popup>
        </Marker>
      )
    })
    return mobileMarker
  }, [mapData])

  const renderWIMMarker = useMemo(() => {
    if (typeof window === 'undefined' || !mapData?.wim) return null;

    const leaflet = require('leaflet');
    // RENDER
    const wimMarker = mapData?.wim?.map((item, index) => {
      const pinIcon = new leaflet.icon({
        iconUrl: item.isEnable ? `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-icon-2x-orange.png` : `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-icon-2x-black.png`,
        shadowUrl: `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-shadow.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
      return (
        <Marker
          key={`wim-${index}`}
          position={[item.Latitude, item.Longtitude]}
          eventHandlers={{
            mouseover: (event) => event.target.openPopup(),
            mouseout: (event) => event.target.closePopup(),
            click: () => console.log('first')
          }}
          icon={pinIcon}
        >
          <Popup className="w-60" autoPan={false}>
            <figcaption>
              <section>
                <h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>รายละเอียด</h1>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ชื่อสถานี: <strong>{item.StationName}</strong></p>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ชื่อ WIM: <strong>{item.LocationDescription}</strong></p>
              </section>
              <hr className='my-3' />
              <section>
                <h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>สถานี</h1>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">จำนวนรถเข้าชั่ง: <strong>{item.Total || 0}</strong></p>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">จำนวนบรรจุเกิน: <strong>{item.Over || 0}</strong></p>
              </section>
              <hr className='my-3' />
              <section>
                <h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>พิกัด</h1>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ละติจูด: <strong>{item.Latitude || 0}</strong></p>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ลองจิจูด: <strong>{item.Longtitude || 0}</strong></p>
              </section>
              <hr className='my-3' />
              <section>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">สถานะ: <strong>{item.isEnable ? 'ออนไลน์' : 'ออฟไลน์'}</strong></p>
              </section>
            </figcaption>
          </Popup>
        </Marker>
      )
    })
    return wimMarker
  }, [mapData])

  const renderStationMarker = useMemo(() => {
    if (typeof window === 'undefined' || !mapData?.station) return null;

    const leaflet = require('leaflet');
    // RENDER
    const stationMarker = mapData?.station?.map((item, index) => {
      const pinIcon = new leaflet.icon({
        iconUrl: item.isEnable ? `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-icon-2x-violet.png` : `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-icon-2x-black.png`,
        shadowUrl: `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-shadow.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
      return (
        <Marker
          key={`station-${index}`}
          position={[item.Latitude, item.Longtitude]}
          eventHandlers={{
            mouseover: (event) => event.target.openPopup(),
            mouseout: (event) => event.target.closePopup(),
            click: () => console.log('first')
          }}
          icon={pinIcon}
        >
          <Popup className="w-60" autoPan={false}>
            <figcaption>
              <section>
                <h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>รายละเอียด</h1>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ชื่อสถานี: <strong>{item.StationName}</strong></p>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ชื่อ WIM: <strong>{item.LocationDescription}</strong></p>
              </section>
              <hr className='my-3' />
              <section>
                <h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>สถานี</h1>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">จำนวนรถเข้าชั่ง: <strong>{item.Total || 0}</strong></p>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">จำนวนบรรจุเกิน: <strong>{item.Over || 0}</strong></p>
              </section>
              <hr className='my-3' />
              <section>
                <h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>พิกัด</h1>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ละติจูด: <strong>{item.Latitude || 0}</strong></p>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ลองจิจูด: <strong>{item.Longtitude || 0}</strong></p>
              </section>
              <hr className='my-3' />
              <section>
                <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">สถานะ: <strong>{item.isEnable ? 'ออนไลน์' : 'ออฟไลน์'}</strong></p>
              </section>
            </figcaption>
          </Popup>
        </Marker>
      )
    })
    return stationMarker
  }, [mapData])

  const items = [
    {
      key: '1',
      label: 'กล้อง WIM ถาวร',
    },
  ];

  return (
    <div>
      {/* <Map
        center={[13.736717, 100.523186]}
        zoom={5}
        className='!relative !z-10'
      >
        {renderMobileMarker}
        {renderWIMMarker}
        {renderStationMarker}
      </Map> */}
      <SpecMap
        center={[13.736717, 100.523186]}
        zoom={5}
        className='!relative !z-10'
        mobile={mapData.mobile}
        wim={mapData.wim}
        station={mapData.station}
      />
      <div className='!absolute !top-3 !right-5 !z-20 flex items-center gap-3'>
        <Button
          className=' !bg-blue-500 hover:!bg-blue-400 active:!bg-blue-500'
          type='primary'
        >
          สํานักจังหวัด/แขวง
        </Button>
        <Dropdown menu={{ items }}>
          <Button
            className=' !bg-green-500 hover:!bg-green-400 active:!bg-green-500'
            type='primary'
          >
            ประเภทอุปกรณ์
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}

export default React.memo(DisplayMap)