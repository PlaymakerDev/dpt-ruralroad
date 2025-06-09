"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-routing-machine";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap, useMapEvent, GeoJSON } from 'react-leaflet'
// import { createControlComponent } from '@react-leaflet/core'
import { useRouter } from "next/router";
import THAI_GEOJSON from "@/features/admin/dashboard/mock/thailand.json"

const DEFAULT_PATTERN = {
	fillColor: 'gray',
	weight: 1,
	opacity: 1,
	color: 'black',
	fillOpacity: 0.4
}

const HOVER_PATTERN = {
	weight: 5,
	color: '#4287f5',
	fillColor: '#4287f5',
	dashArray: '',
	fillOpacity: 0.5
}

const LocationMarker = (props) => {
	const { item, icon, center, zoom } = props
	// MAP CONTEXT
	const map = useMapEvents({})
	const router = useRouter()

	useEffect(() => {
		map.setView(center, zoom)
	}, [center, zoom])

	const renderContent = useMemo(() => {
		return (
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
					<p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">สถานะ: <strong>{item.isEnable ? 'ออนไลน์' : 'ออฟไลน์'}</strong></p>
				</section>
				<section className="text-center">
					<p
						className='font-IBMPlexSansThaiRegular text-blue-500 cursor-pointer underline'
						onClick={() => router.push({
							pathname: `/admin/project-info/wim-detail/${item.StationID}`,
							query: {
								prev_name: item.StationName
							}
						})}
					>
						รายละเอียด
					</p>
				</section>
			</figcaption>
		)
	}, [item])

	return (
		<Marker
			position={[item.Latitude, item.Longtitude]}
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
				click: () => map.flyTo([item.Latitude, item.Longtitude], 10)
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
			const pinIcon = new L.icon({
				iconUrl: item.isEnable ? `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-icon-2x-orange.png` : `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-icon-2x-black.png`,
				shadowUrl: `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-shadow.png`,
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowSize: [41, 41]
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
	}, [data, center, zoom])

	return (
		<MapContainer
			center={center}
			zoom={zoom}
			scrollWheelZoom={false}
			style={{
				width: "100%",
				height: "100%",
				minHeight: "300px",
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
			<GeoJSON
				data={THAI_GEOJSON}
				style={() => {
					return DEFAULT_PATTERN
				}}
				onEachFeature={(feature, layer) => {
					layer.on({
						mouseover: (e) => {
							const layer = e.target;
							layer.setStyle(HOVER_PATTERN);

							if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
								layer.bringToFront();
							}
							// SET TEXT
							setProvinceDesc(feature.properties.NL_NAME_1)
						},
						mouseout: (e) => {
							const layer = e.target;
							// Reset to original style
							layer.setStyle(DEFAULT_PATTERN);
							setProvinceDesc(null)
						},
						click: (e) => {
							if (mapRef.current) {
								mapRef.current.fitBounds(e.target.getBounds());
							}
						}
					});
				}}
			/>
		</MapContainer>
	);
}

export default React.memo(SpecMap)