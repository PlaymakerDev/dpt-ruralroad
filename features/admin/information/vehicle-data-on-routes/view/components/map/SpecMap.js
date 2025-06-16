"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-routing-machine";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet'
// import { createControlComponent } from '@react-leaflet/core'

// Component to render LINESTRING directly as polyline with auto-fit
const LineStringPolyline = (props) => {
  const { geomText, color = "red", weight = 4, opacity = 0.8, autoFit = true } = props
  const map = useMapEvents({});

  const coordinates = useMemo(() => {
    if (!geomText) return [];

    try {
      // Parse LINESTRING directly - much more efficient!
      const coordsStr = geomText.replace('LINESTRING(', '').replace(')', '');
      const coordPairs = coordsStr.split(',');

      return coordPairs.map(pair => {
        const [lng, lat] = pair.trim().split(' ').map(Number);
        return [lat, lng]; // Leaflet uses [lat, lng] format
      });
    } catch (error) {
      console.error('Error parsing LINESTRING:', error);
      return [];
    }
  }, [geomText]);

  // Calculate bounds and fit map to polyline
  useEffect(() => {
    if (!autoFit || !coordinates.length || !map) return;

    try {
      // Calculate bounds
      const lats = coordinates.map(coord => coord[0]);
      const lngs = coordinates.map(coord => coord[1]);

      const bounds = [
        [Math.min(...lats), Math.min(...lngs)], // Southwest
        [Math.max(...lats), Math.max(...lngs)]  // Northeast
      ];

      // Fit map to bounds with padding
      map.fitBounds(bounds, {
        padding: [20, 20], // Add padding around the polyline
        maxZoom: 16 // Prevent zooming too close
      });
    } catch (error) {
      console.error('Error fitting bounds:', error);
    }
  }, [coordinates, map, autoFit]);

  if (!coordinates.length) return null;

  return (
    <Polyline
      positions={coordinates}
      color={color}
      weight={weight}
      opacity={opacity}
      smoothFactor={1.0}
    />
  );
};

const LocationMarker = (props) => {
  const { item, icon, center, zoom } = props
  // MAP CONTEXT
  const map = useMapEvents({})
  // const router = useRouter()

  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom])

  const parsePointString = useCallback((point) => {
    // Remove POINT() wrapper and split coordinates
    const coordsStr = point.replace('POINT(', '').replace(')', '');
    const coordPairs = coordsStr.split(',');

    return coordPairs.map(pair => {
      const [lng, lat] = pair.trim().split(' ').map(Number);
      return [lat, lng]; // Leaflet uses [lat, lng] format
    });
  }, []);

  const getCarPlate = useCallback((plateNo, plateProvince) => {
    let textArr = [plateNo, plateProvince]

    return textArr.join(' ')
  }, [])

  const renderContent = useMemo(() => {
    return (
      <figcaption>
        <section>
          <h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>ข้อมูลยานพาหนะ</h1>
          <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ทะเบียนรถ: <strong>{getCarPlate(item.plate_no, item.plate_province)}</strong></p>
          {/* <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">สายทาง: <strong>{item.road_code}</strong></p> */}
        </section>
        <hr className='my-3' />
        <section>
          <h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>ข้อมูลการขับขี่</h1>
          {/* <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ระยะทาง: <strong>{Math.floor(item?.distance_from_road) || 0}</strong></p> */}
          <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ความเร็วที่: <strong>{item?.speed || 0}</strong></p>
        </section>
        <hr className='my-3' />
        <section>
          <h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>ประวัติการชั่งน้ำหนัก</h1>
          <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">สถานะ: <strong>{item.isoverweight === 'Y' ? 'รถน้ำหนักเกิน' : 'รถน้ำหนักปกติ'}</strong></p>
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
        click: () => map.flyTo(parsePointString(item.car_location)[0], 13)
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
    car,
    road,
    setProvinceDesc,
    ...mapProps
  } = props
  const mapRef = useRef();

  const renderPolyLine = useMemo(() => {
    if (!road || !road.length) return null;

    return road.map((roadItem, index) => {
      if (!roadItem.geom_text) return null;

      return (
        <LineStringPolyline
          key={`road-${index}-${roadItem.road_code || index}`}
          geomText={roadItem.geom_text}
          color="red"
          weight={4}
          opacity={0.8}
        />
      );
    });
  }, [road])

  const renderLocationMarker = useMemo(() => {
    const loopData = car?.map((item, index) => {
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
  }, [car, center, zoom])

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
      {renderPolyLine}
    </MapContainer>
  );
}

export default React.memo(SpecMap)