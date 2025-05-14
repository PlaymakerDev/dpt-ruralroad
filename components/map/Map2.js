"use client";
import React, { useEffect }/*, { useEffect, useMemo, useState }*/ from "react";
// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-routing-machine";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap } from 'react-leaflet'
// import { createControlComponent } from '@react-leaflet/core'

const Map = (props) => {
  const {
    center,
    zoom,
    children,
    ...mapProps
  } = props

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{
        width: "100%",
        height: "100%",
        // minHeight: "496px",
        minHeight: "31rem",
        border: 0
      }}
      className="!rounded-lg"
      {...mapProps}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}

export default React.memo(Map)