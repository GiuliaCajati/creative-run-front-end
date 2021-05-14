import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import MapToolkit from '../components/MapToolkit.js'
import Markers from '../components/Markers.js'

const Map = () => {
return(
    <MapContainer center={[38.9072, -77.0369]} zoom={13} stroke={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <MapToolkit/>
        <Markers/>
    </MapContainer>
  )
}

export default Map