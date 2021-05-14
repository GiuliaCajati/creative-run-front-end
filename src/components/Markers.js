import React, { useState, useEffect, useMemo, useRef} from 'react';
import { Marker, Popup, Polyline } from 'react-leaflet'
import { Icon } from 'leaflet';

const Markers = () => {
  const [ data, setData ] = useState()
  const [ draggable, setDraggable ] = useState(false)
  const [ markerID, setSelectedMarker ] = useState(null)  
  const markerRef = useRef(null)

  const runner = new Icon({
    iconUrl:'https://upload.wikimedia.org/wikipedia/commons/b/b0/Running_icon_-_Noun_Project_17825.svg',
    iconSize: [25, 25]
  })

  useEffect(() => {
      fetch('http://localhost:3000/drawings')
      .then(data => data.json())
      .then(drawings => {
        setData(drawings);
      })  
  },[])

  const popupDetails = (marker) => {
    return <div>
            <span onClick={() => toggleDraggable(marker.id)}>
              {draggable
                ? 'Marker is draggable'
                : 'Click here to make marker draggable'}
            </span>
            <span>
            Markers Details 
                <ul>
                <li>Place: {marker.place}</li>
                <li>Distance From Previous: {marker.distance_from_prev}</li>
                <li>Polyline: {marker.add_polyline}</li>
                <li>Latitude: {marker.latitude}</li>
                </ul>
            </span>
          </div>
  }

  const toggleDraggable = (markerID) => {
    setSelectedMarker(markerID)
    if (markerID) {
      setDraggable(true)
    }
  }

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
          setDraggable(false)
        }
      },
    }),
    [],
  )

  const setPosition = ( updatedCoordinates ) => { 
    fetch(`http://localhost:3000/markers/${markerID}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
                'Accept': 'application/json'
        },
        body: JSON.stringify({
        coordinates: updatedCoordinates 
        })
    })
        .then(res => res.json())   
  }

  return(
    <div>
      {data 
      ?
      <div>
        {data[0].markers.map((marker, i) => { 
          debugger
          return<div>          
            { marker.add_polyline === null?
                null:
              <Polyline key={1} positions={ marker.add_polyline } color={'blue'} />}
              <Marker 
                  ref={ markerRef }
                  eventHandlers={ eventHandlers }
                  icon={ runner }
                  key = { marker.id } 
                  position={ [ marker.latitude, marker.longitude ] }
                  routeWhileDragging={true}
                  draggable = { draggable } 
                  >
                <Popup minWidth={90}>
                  {popupDetails(marker)}
                </Popup>
              </Marker>
          </div>
          })}
      </div>
      : 
      <div>Loading...</div>} 
    </div>
    )
  }

export default Markers;