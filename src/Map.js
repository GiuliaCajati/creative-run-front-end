import React, { useState, useEffect, useCallback, useMemo, useRef} from 'react';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, Circle, useMap, Polyline } from 'react-leaflet'
import { Icon } from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import { GeoSearchControl, OpenStreetMapProvider, getLatLng } from "leaflet-geosearch";
import 'leaflet-geosearch/dist/geosearch.css';

const center = {
    lat: 51.505,
    lng: -0.09,
  }

const Map = () => {
    const [draggable, setDraggable] = useState(true)
    const [data, setData] = useState()
    const markerRef = useRef(null)
    const [position, setPosition] = useState(center)
    const runner = new Icon({
        iconUrl:'https://upload.wikimedia.org/wikipedia/commons/b/b0/Running_icon_-_Noun_Project_17825.svg',
        iconSize: [25, 25]
    })

    const eventHandlers = useMemo(
        () => ({
          dragend() {debugger
              
            const marker = markerRef.current
            if (marker != null) {
                debugger
              setPosition(marker.getLatLng())
            }
          },
        }),
        [],
      )
      const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
      }, [])

 
    useEffect(() => {
      fetch('http://localhost:3000/drawings')
      .then(data => data.json())
      .then(drawings => {
        setData(drawings);
      }) 
      
    },[])

    function LeafletgeoSearch() {
        const map = useMap();
      
        useEffect(() => {
          const provider = new OpenStreetMapProvider();
      
          const searchControl = new GeoSearchControl({
            provider,
            // marker: {
            //     runner
            // }
          });
          map.addControl(searchControl);
          return () => map.removeControl(searchControl);
        }, []);
      
        return null;
      }
      

return(
    <div>
        {data 
        ?
         <div>
             
             <MapContainer center={[38.9072, -77.0369]} zoom={15} stroke={true}>
               
                <LeafletgeoSearch />
                <FeatureGroup>
                    <EditControl
                    position='topright'
                    marker={{
                        icon: runner,
                        draggable: true
                    }}
                    
                    draw={{
                        rectangle: false
                    }}
                    />
                    
                 
                    <Circle center={[51.51, -0.06]} radius={200} />
                </FeatureGroup>
                
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                  {/* getLatLng() */}
    {/* moveend */}
                
                <div>
                    {data[0].markers.map((marker, i) => { 
                        
                        return<div>          
                         
                            {marker.add_polyline === null?
                                null:
                             <Polyline key={1} 
                        
                             positions={ marker.add_polyline } color={'blue'} />}
                                
                                <Marker 
                                    ref={markerRef}
                                    eventHandlers={eventHandlers}
                                    icon={runner}
                                    key = {marker.id} 
                                    position={[
                                        marker.latitude, 
                                        marker.longitude
                                    ]}
                                    routeWhileDragging={true}
                                    draggable={draggable}        
                                                  
                                    >
                    
                                    <Popup minWidth={90}>
                                        <span>
                                        Markers Details 
                                            <ul>
                                            <li>Place: {marker.place}</li>
                                            <li>Distance From Previous: {marker.distance_from_prev}</li>
                                            <li>Polyline: {marker.add_polyline}</li>
                                            <li>Latitude: {marker.latitude}</li>
                                            </ul>
                                        </span>
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