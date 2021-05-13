import React, { useState, useEffect, useMemo, useRef} from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { Icon } from 'leaflet';
import MapToolkit from '../components/MapToolkit.js'

const Map = () => {
    const [ draggable, setDraggable ] = useState(false)
    const [ markerID, setSelectedMarker ] = useState(null)
    const [ data, setData ] = useState()
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
        debugger
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
             
             <MapContainer center={[38.9072, -77.0369]} zoom={15} stroke={true}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <MapToolkit/>
                <div>
                    {data[0].markers.map((marker, i) => { 
                        
                        return<div>          
                         
                            {marker.add_polyline === null?
                                null:
                             <Polyline key={1} 
                        
                             positions={ marker.add_polyline } color={'blue'} />}
                                
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
                                  <div>
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
                                </Popup>
                              </Marker>
                            </div>
                      
                        })}
                </div>
            </MapContainer>
         </div>
        : 
        <div>Loading...</div>} 
    </div>
    )
}

export default Map