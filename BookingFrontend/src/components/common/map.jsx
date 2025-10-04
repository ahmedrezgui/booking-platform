import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";


function Map({ center, height }) {

    return (<>


        <MapContainer
            center={(center) || [51, -0.09]}
            zoom={center ? 4 : 2}
            scrollWheelZoom={false}
            className={`${height} rounded-lg`}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {center && <Marker position={center} />}
        </MapContainer>

    </>)
}
export default Map;