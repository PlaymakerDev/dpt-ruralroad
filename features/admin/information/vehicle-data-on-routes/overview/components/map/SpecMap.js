"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-routing-machine";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { createControlComponent } from '@react-leaflet/core'

const LocationMarker = (props) => {
  const { item, icon, center, zoom } = props
  // MAP CONTEXT
  const map = useMapEvents({})
  // const router = useRouter()

  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom])

    const parsePointString = useCallback((lineString) => {
    // Remove LINESTRING() wrapper and split coordinates
    const coordsStr = lineString.replace('POINT(', '').replace(')', '');
    const coordPairs = coordsStr.split(',');
    
    return coordPairs.map(pair => {
      const [lng, lat] = pair.trim().split(' ').map(Number);
      return [lat, lng]; // Leaflet uses [lat, lng] format
    });
  },[]);

  const getCarPlate = useCallback((plateNo, plateProvince) => {
    let textArr = [plateNo, plateProvince]

    return textArr.join(' ')
  },[])

  const renderContent = useMemo(() => {
    return (
      <figcaption>
        <section className="text-center mb-2">
          <h3 className={`font-IBMPlexSansThaiBold ${item?.plate_no ? 'underline' : ''} text-base`}>{getCarPlate(item.plate_no, item.plate_province)}</h3>
          <p className="font-IBMPlexSansThaiBold text-base !m-0">{item.road_code}</p>
          <p className="font-IBMPlexSansThaiBold text-base !m-0">{item.isoverweight === 'Y' ? 'น้ำหนักเกิน' : 'น้ำหนักปกติ'}</p>
        </section>
        <hr />
        <section className="grid grid-cols-2 mt-2 justify-items-center w-full">
          {/* <p className="font-IBMPlexSansThaiRegular text-sm !m-0">กม. ที่ <strong>48</strong></p> */}
          <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ระยะทาง <strong>{Math.floor(item?.distance_from_road) || 0}</strong></p>
          <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ความเร็วที่ <strong>{item?.speed || 0}</strong></p>
        </section>
      </figcaption>
    )
  }, [item])

  return (
    <Marker
      position={parsePointString(item.car_location)[0]}
      // eventHandlers={{
      // 	mouseover: (event) => event.target.openPopup(),
      // 	click: () => map.flyTo([item.Latitude, item.Longtitude], 10)
      // }}
      eventHandlers={{
        mouseover: (event) => event.target.openPopup(),
        // mouseout: (event) => event.target.closePopup(),
        mouseout: (event) => {
          // Add delay before closing
          setTimeout(() => {
            if (!event.target.getPopup()._container?.matches(':hover')) {
              event.target.closePopup();
            }
          }, 100);
        },
        click: () => map.flyTo(parsePointString(item.car_location)[0], 10)
      }}
      icon={icon}
    >
      <Popup
        className="w-60"
        autoPan={false}
        eventHandlers={{
          add: (event) => {
            const popupElement = event.target.getElement();

            // Keep popup open when hovering over it
            popupElement.addEventListener('mouseenter', () => {
              event.target._source.openPopup();
            });

            // Close popup when mouse leaves the popup
            popupElement.addEventListener('mouseleave', () => {
              event.target._source.closePopup();
            });
          },
        }}
      >
        {renderContent}
      </Popup>
    </Marker>
  )
}

const SpecMap = (props) => {
  const {
    center,
    zoom,
    data,
    setProvinceDesc,
    ...mapProps
  } = props
  const mapRef = useRef();

  const renderLocationMarker = useMemo(() => {
    const loopData = data?.map((item, index) => {
      let icon

      if (item.isoverweight === 'Y') {
        icon = `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/red-truck.svg`
      } else {
        if (item.speed === 0) {
          icon = `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/yellow-truck.svg`
        } else {
          icon = `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/green-truck.svg`
        }
      }
      const pinIcon = new L.icon({
        iconUrl: icon,
        iconSize: [40, 33]
      })
      console.log(item)
      return (
        <LocationMarker
          key={index + 1}
          item={item}
          icon={pinIcon}
          center={center}
          zoom={zoom}
        />
      )
    })
    return loopData
  }, [data, center, zoom])

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{
        width: "100%",
        height: "100%",
        // minHeight: "496px",
        minHeight: "40rem",
        border: 0
      }}
      className="!rounded-lg"
      ref={mapRef}
      {...mapProps}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {renderLocationMarker}
    </MapContainer>
  );
}

export default React.memo(SpecMap)