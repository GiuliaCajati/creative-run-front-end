import React, { useState, useEffect, useMemo, useRef} from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { Icon } from 'leaflet';
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