import React, { useMemo, useRef } from 'react';
import { Marker, Popup, Polyline } from 'react-leaflet'
import { Icon } from 'leaflet';

const RunMarker = (props) => {
  const marker = props.marker
  const setPosition = props.setPosition
  const markerRef = useRef(null)
  const runner = new Icon({
    iconUrl:'https://upload.wikimedia.org/wikipedia/commons/b/b0/Running_icon_-_Noun_Project_17825.svg',
    iconSize: [25, 25]
  })

  const popupDetails = (marker) => {
    return <div>
            <span>
            Markers Details 
                <ul>
                <li>Place: {marker.place}</li>
                <li>Polyline: {marker.add_polyline}</li>
                <li>Latitude: {marker.latitude}</li>
                </ul>
            </span>
          </div>
  }

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng(), marker.getElement().alt)
        }
      },
    }),
    [],
  )

  return(
    <div>          
      { marker.add_polyline === null?
          null:
        <Polyline key = { marker.id + 1 } positions={ marker.add_polyline } color={'blue'} />}
        <Marker 
            alt = { marker.id }
            ref={ markerRef }
            id = { marker.id }
            eventHandlers={ eventHandlers }
            icon={ runner }
            key = { marker.id } 
            position={ [ marker.latitude, marker.longitude ] }
            routeWhileDragging={ true }
            draggable = { true } 
            >
          <Popup minWidth={90}>
            {popupDetails(marker)}
          </Popup>
        </Marker>
    </div>
  )
}

export default RunMarker;