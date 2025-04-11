"use client";

import React, { useEffect, useMemo, useState } from "react";
// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-routing-machine";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap } from 'react-leaflet'
import { createControlComponent } from '@react-leaflet/core'

const createRoutineMachineLayer = (props) => {
  const { location } = props

  const instance = L.Routing.control({
    waypoints: [
      L.latLng(location[0][0], location[0][1]),
      L.latLng(location[1][0], location[1][1])
    ],
    lineOptions: {
      styles: [{ color: "red", weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
    createMarker: function () {
      return null;
    }
  });

  instance.on('routeselected', () => {
    const container = document.querySelector('.leaflet-routing-container');
    if (container) container.style.display = 'none';
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

const LocationMarker = (props) => {
  const { properties, location, icon, allowPopup, defaultIcon, hasLine } = props
  // MAP CONTEXT
  const map = useMapEvents({})
  // STATE POSITION
  const [position, setPosition] = useState({
    lat: location.lat,
    lng: location.lng
  })

  useEffect(() => {
    setPosition({
      lat: location.lat,
      lng: location.lng
    })
    if (!hasLine) {
      map.setView([location.lat, location.lng])
    }
  }, [location.lat, location.lng, map, hasLine])

  const renderPopUp = useMemo(() => {
    if (!!allowPopup) {
      return (
        <Popup className="w-60">
          <figcaption>
            <section className="text-center mb-2">
              <h3 className={`font-IBMPlexSansThaiBold ${properties?.plate ? 'underline' : ''} text-base`}>{properties?.plate || '-'}</h3>
              <p className="font-IBMPlexSansThaiBold text-base !m-0">{properties?.kind_desc || '-'} ({properties?.wheel_desc || '-'})</p>
            </section>
            <hr />
            <section className="grid grid-cols-2 mt-2 justify-items-center w-full">
              {/* <p className="font-IBMPlexSansThaiRegular text-sm !m-0">กม. ที่ <strong>48</strong></p> */}
              <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ระยะทาง <strong>{Math.floor(properties?.distance_from_road) || 0}</strong></p>
              <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ความเร็วที่ <strong>{properties?.speed || 0}</strong></p>
            </section>
          </figcaption>
        </Popup>
      )
    }
  }, [allowPopup, properties])

  return position === null ? null : defaultIcon === true ? (
    <Marker position={position}>
      {renderPopUp}
    </Marker>
  ) : (
    <Marker position={position} icon={icon}>
      {renderPopUp}
    </Marker>
  )
}

const LineMarker = (props) => {
  const { properties, location } = props

  return (
    <Polyline
      pathOptions={properties}
      positions={location}
    />
  )
}

const PositionPolyLine = (props) => {
  const { location } = props;
  const map = useMap();

  // Calculate the center of the polyline
  const bounds = L.latLngBounds(location);
  const center = bounds.getCenter();

  // Center the map on the polyline's center
  map.setView(center, map.getZoom());
  return null
}

const Map = (props) => {
  const {
    center,
    zoom,
    data,
    line,
    defaultIcon,
    allowPopup = false,
    hasLine = false
  } = props

  const renderLocationMarker = useMemo(() => {
    const loopPoint = data?.map((item, index) => {
      if (item.has_overweight_history) {
        // INIT ICON
        const pinIcon = new L.icon({
          iconUrl: `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/red-truck.svg`,
          iconSize: [40, 33]
        })
        // RETURN
        return (
          <LocationMarker
            key={index + 1}
            properties={{
              plate: item.plate,
              type_desc: item.type_desc,
              kind_desc: item.kind_desc,
              wheel_desc: item.wheel_desc,
              distance_from_road: item.distance_from_road,
              wgt: item.wgt,
              wgt_total: item.wgt_total,
              speed: item.speed
            }}
            location={{
              lat: item.coordinates.point.latitude,
              lng: item.coordinates.point.longitude
            }}
            icon={pinIcon}
            allowPopup={allowPopup}
            defaultIcon={defaultIcon}
            hasLine={hasLine}
          />
        )
      } else {
        if (item.speed > 0) {
          // INIT ICON
          const pinIcon = new L.icon({
            iconUrl: `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/green-truck.svg`,
            iconSize: [40, 33]
          })
          // RETURN
          return (
            <LocationMarker
              key={index + 1}
              properties={{
                plate: item.plate,
                type_desc: item.type_desc,
                kind_desc: item.kind_desc,
                wheel_desc: item.wheel_desc,
                distance_from_road: item.distance_from_road,
                wgt: item.wgt,
                wgt_total: item.wgt_total,
                speed: item.speed
              }}
              location={{
                lat: item.coordinates.point.latitude,
                lng: item.coordinates.point.longitude
              }}
              icon={pinIcon}
              allowPopup={allowPopup}
              defaultIcon={defaultIcon}
              hasLine={hasLine}
            />
          )
        } else {
          // INIT ICON
          const pinIcon = new L.icon({
            iconUrl: `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/yellow-truck.svg`,
            iconSize: [40, 33]
          })
          // RETURN
          return (
            <LocationMarker
              key={index + 1}
              properties={{
                plate: item.plate,
                type_desc: item.type_desc,
                kind_desc: item.kind_desc,
                wheel_desc: item.wheel_desc,
                distance_from_road: item.distance_from_road,
                wgt: item.wgt,
                wgt_total: item.wgt_total,
                speed: item.speed
              }}
              location={{
                lat: item.coordinates.point.latitude,
                lng: item.coordinates.point.longitude
              }}
              icon={pinIcon}
              allowPopup={allowPopup}
              defaultIcon={defaultIcon}
              hasLine={hasLine}
            />
          )
        }
      }
    }, [])
    return loopPoint
  }, [data, defaultIcon, allowPopup, hasLine])

  const renderRoutingMachine = useMemo(() => {
    if (!!line?.geom?.coordinates?.length) {
      const location = line?.geom?.coordinates?.map(([lon, lat]) => [lat, lon])


      if (location[0][0] !== location[1][0] && location[0][1] !== location[1][1]) {
        return (
          <RoutingMachine
            location={location}
          />
        )
      }
    }
    return null
  }, [line])

  return (
    <MapContainer
      center={center} 
      zoom={zoom}
      scrollWheelZoom={true}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "40rem",
        border: 0
      }}
      className="!rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {renderLocationMarker}
      {renderRoutingMachine}
    </MapContainer>
  );
}

export default React.memo(Map)