"use client";

import React, { useEffect, useMemo, useState } from "react";
// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-routing-machine";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap, useMapEvent } from 'react-leaflet'
// import { createControlComponent } from '@react-leaflet/core'
import { useRouter } from "next/router";

const LocationMarker = (props) => {
	const { item, type, icon } = props
	// MAP CONTEXT
	const map = useMapEvents({})
	const router = useRouter()

	useEffect(() => {
		map.setView([item.Latitude, item.Longtitude])
	}, [item])

	const renderContent = useMemo(() => {
		if (type === 'mobile') {
			return (
				<figcaption>
					<section>
						<h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>รายละเอียด</h1>
						<p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ชื่อสถานี: <strong>{item.WayID}</strong></p>
					</section>
					<hr className='my-3' />
					{/* <section>
						<h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>พิกัด</h1>
						<p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ละติจูด: <strong>{item.Latitude || 0}</strong></p>
						<p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ลองจิจูด: <strong>{item.Longtitude || 0}</strong></p>
					</section> */}
					<section className="text-center">
						<p
							className='font-IBMPlexSansThaiRegular text-blue-500 cursor-pointer underline'
							underline
							onClick={() => router.push({
								pathname: `/admin/project-info/wim-detail/${item.TID}`,
								query: {
									prev_name: item.WayID
								}
							})}
						>
							รายละเอียด
						</p>
					</section>
				</figcaption>
			)
		} else {

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
					{/* <hr className='my-3' />
					<section>
						<h1 className='font-IBMPlexSansThaiBold text-[clamp(1px, 4vw, 15px)] font-bold underline'>พิกัด</h1>
						<p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ละติจูด: <strong>{item.Latitude || 0}</strong></p>
						<p className="font-IBMPlexSansThaiRegular text-sm !m-0 w-full break-words">ลองจิจูด: <strong>{item.Longtitude || 0}</strong></p>
					</section> */}
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
		}
	}, [])

	return (
		<Marker
			position={[item.Latitude, item.Longtitude]}
			eventHandlers={{
				mouseover: (event) => event.target.openPopup(),
				// mouseout: (event) => event.target.closePopup(),
				click: () => map.flyTo([item.Latitude, item.Longtitude], 10)
			}}
			icon={icon}
		>
			<Popup className="w-60" autoPan={false}>
				{renderContent}
			</Popup>
		</Marker>
	)
}

const SpecMap = (props) => {
	const {
		center,
		zoom,
		mobile,
		wim,
		station,
		...mapProps
	} = props

	const renderStationMarker = useMemo(() => {
		const loopStation = station?.map((item, index) => {
			const pinIcon = new L.icon({
				iconUrl: item.isEnable ? `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-icon-2x-violet.png` : `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-icon-2x-black.png`,
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
				/>
			)
		})
		return loopStation
	}, [station])

	const renderWIMMarker = useMemo(() => {
		const loopWIM = wim?.map((item, index) => {
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
				/>
			)
		})
		return loopWIM
	}, [wim])

	const renderMobileMarker = useMemo(() => {
		const loopMobile = mobile?.map((item, index) => {
			const pinIcon = new L.icon({
				iconUrl: item.isEnable ? `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-icon-2x-blue.png` : `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/marker/marker-icon-2x-black.png`,
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
				/>
			)
		})
		return loopMobile
	}, [mobile])



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
			{renderStationMarker}
			{renderWIMMarker}
			{renderMobileMarker}
		</MapContainer>
	);
}

export default React.memo(SpecMap)