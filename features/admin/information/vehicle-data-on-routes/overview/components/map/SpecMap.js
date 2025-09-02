"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-routing-machine";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON } from 'react-leaflet'
// import { createControlComponent } from '@react-leaflet/core'
import TH from '@/features/admin/dashboard/mock/th.json'
import stf from '@/utils/stringformat'

// Function to create world overlay with Thailand hole
const createWorldOverlayWithThailandHole = (thailandGeoJson) => {
  if (!thailandGeoJson || !thailandGeoJson.features) return null;

  // Extract Thailand coordinates and create holes
  const holes = [];

  thailandGeoJson.features.forEach(feature => {
    if (feature.geometry.type === 'Polygon') {
      // For Polygon, reverse the coordinates to create a hole
      holes.push(feature.geometry.coordinates[0].slice().reverse());
    } else if (feature.geometry.type === 'MultiPolygon') {
      // For MultiPolygon, process each polygon
      feature.geometry.coordinates.forEach(polygon => {
        holes.push(polygon[0].slice().reverse());
      });
    }
  });

  // Create overlay that matches the restricted world bounds
  return {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            // Outer ring (exact world bounds to match maxBounds)
            [
              [-180, -90],
              [-180, 90],
              [180, 90],
              [180, -90],
              [-180, -90]
            ],
            // Inner rings (Thailand bounds - creates holes)
            ...holes
          ]
        }
      }
    ]
  };
};

const LocationMarker = (props) => {
  const { item, icon, center, zoom } = props
  // MAP CONTEXT
  const map = useMapEvents({})
  // const router = useRouter()

  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom])

  // const parsePointString = useCallback((lineString) => {
  //   // Remove LINESTRING() wrapper and split coordinates
  //   const coordsStr = lineString.replace('POINT(', '').replace(')', '');
  //   const coordPairs = coordsStr.split(',');

  //   return coordPairs.map(pair => {
  //     const [lng, lat] = pair.trim().split(' ').map(Number);
  //     return [lat, lng]; // Leaflet uses [lat, lng] format
  //   });
  // }, []);

  // const getCarPlate = useCallback((plateNo, plateProvince) => {
  //   let textArr = [plateNo, plateProvince]

  //   return textArr.join(' ')
  // }, [])

  const renderContent = useMemo(() => {
    return (
      <figcaption>
        <section>
          <h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>ข้อมูลสายทาง</h1>
          {/* <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ทะเบียนรถ: <strong>{getCarPlate(item.plate_no, item.plate_province)}</strong></p> */}
          <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">สายทาง: <strong>{item.road_code}</strong></p>
        </section>
        <hr className='my-3' />
        <section>
          <h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>ข้อมูลยานพาหนะ</h1>
          {/* <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ระยะทาง: <strong>{Math.floor(item?.distance_from_road) || 0}</strong></p> */}
          {/* <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ความเร็วที่: <strong>{item?.speed || 0}</strong></p> */}
          <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">รถวิ่งตามปกติ: <strong>{stf(item.normal).normal() || 0}</strong></p>
          <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">รถที่จอดอยู่กับที่: <strong>{stf(item.stop).normal() || 0}</strong></p>
          <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">รถที่มีประวัติน้ำหนักเกิน: <strong>{stf(item.over_weight).normal() || 0}</strong></p>
        </section>
        <hr className='my-3' />
        <section>
          <h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>ข้อมูลรถรายวัน</h1>
          <p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">จำนวนรถรายวัน: <strong>{stf(item.unique_vehicles).normal() || 0}</strong></p>
        </section>
      </figcaption>
    )
  }, [item])

  return (
    <Marker
      // position={parsePointString(item.car_location)[0]}
      position={[item.latitude, item.longitude]}
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
        // click: () => map.flyTo(parsePointString(item.car_location)[0], 10)
        click: () => map.flyTo([item.latitude, item.longitude], 10)
      }}
    // icon={icon}
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
    showThailandFocus = true, // Toggle Thailand focus on/off
    overlayOpacity = 1.0, // Control overlay opacity (0.0 - 1.0)
    thailandGeoJsonUrl = "https://simplemaps.com/static/svg/country/th/all/th.json", // SimpleMap Thailand GeoJSON
    ...mapProps
  } = props

  const mapRef = useRef();
  // const [thailandGeoJson, setThailandGeoJson] = useState(null);
  // const [isLoadingGeoJson, setIsLoadingGeoJson] = useState(false);
  // const [geoJsonError, setGeoJsonError] = useState(null);

  // Fetch Thailand GeoJSON data from SimpleMap
  // useEffect(() => {
  //   if (!showThailandFocus) return;

  //   const fetchThailandGeoJson = async () => {
  //     setIsLoadingGeoJson(true);
  //     setGeoJsonError(null);

  //     try {
  //       const response = await fetch(thailandGeoJsonUrl, {
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  //       }

  //       const geoJsonData = await response.json();

  //       // Validate GeoJSON structure
  //       if (!geoJsonData || !geoJsonData.features) {
  //         throw new Error('Invalid GeoJSON format');
  //       }

  //       setThailandGeoJson(geoJsonData);
  //       console.log('Thailand GeoJSON loaded successfully:', geoJsonData);

  //     } catch (error) {
  //       console.error('Error fetching Thailand GeoJSON:', error);
  //       setGeoJsonError(error.message);
  //     } finally {
  //       setIsLoadingGeoJson(false);
  //     }
  //   };

  //   fetchThailandGeoJson();
  // }, [showThailandFocus, thailandGeoJsonUrl]);

  // Create world overlay with Thailand hole
  const worldOverlay = useMemo(() => {
    if (!TH || !showThailandFocus) return null;

    try {
      const overlay = createWorldOverlayWithThailandHole(TH);
      console.log('World overlay created:', overlay);
      return overlay;
    } catch (error) {
      console.error('Error creating world overlay:', error);
      return null;
    }
  }, [TH, showThailandFocus]);

  // Style for the black overlay
  const overlayStyle = useMemo(() => ({
    fillColor: '#9E9E9E',
    fillOpacity: overlayOpacity,
    stroke: false,
    interactive: false,
    bubblingMouseEvents: false
  }), [overlayOpacity]);

  const renderLocationMarker = useMemo(() => {
    const loopData = data.slice(0, 20).map((item, index) => {
      // let icon

      // if (item.isoverweight === 'Y') {
      //   icon = `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/red-truck.svg`
      // } else {
      //   if (item.speed === 0) {
      //     icon = `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/yellow-truck.svg`
      //   } else {
      //     icon = `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/green-truck.svg`
      //   }
      // }
      // const pinIcon = new L.icon({
      //   // iconUrl: icon,
      //   iconUrl: `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/green-truck.svg`,
      //   iconSize: [40, 33]
      // })
      return (
        <LocationMarker
          key={index + 1}
          item={item}
          // icon={pinIcon}
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
      worldCopyJump={false} // Disable world map repetition
      maxBounds={[[-90, -180], [90, 180]]} // Restrict to single world view
      maxBoundsViscosity={1.0} // Make bounds strict
      style={{
        width: "100%",
        height: "100%",
        // minHeight: "496px",
        minHeight: "46rem",
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
      {/* Thailand Focus Overlay - Black mask with Thailand hole */}
      {showThailandFocus && worldOverlay && (
        <GeoJSON
          data={worldOverlay}
          style={overlayStyle}
          pane="overlayPane"
          interactive={false}
          bubblingMouseEvents={false}
        />
      )}
      {/* Vehicle Markers */}
      {renderLocationMarker}
      {/* Loading indicator */}
      {/* {showThailandFocus && isLoadingGeoJson && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '10px 15px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 1000,
          border: '1px solid #e0e0e0'
        }}>
          🇹🇭 Loading Thailand boundaries...
        </div>
      )} */}

      {/* Error indicator */}
      {/* {showThailandFocus && geoJsonError && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(220, 53, 69, 0.95)',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 1000,
          maxWidth: '300px'
        }}>
          ⚠️ Failed to load Thailand boundaries: {geoJsonError}
        </div>
      )} */}
    </MapContainer>
  );
}

export default React.memo(SpecMap)