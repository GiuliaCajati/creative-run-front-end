import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, Circle, withLeaflet, useMap } from 'react-leaflet'
import React, { useState, useEffect } from 'react';
import { Icon } from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-geosearch/dist/geosearch.css';


import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";




const Map = () => {
    const [data, setData] = useState()

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
    })

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
           
            
                <FeatureGroup>
                    <EditControl
                    position='topright'
                    marker={{
                        icon: runner
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
                <LeafletgeoSearch />
             
                
                <div>
 
          
                    {data[0].markers.map(marker => { 
                        return <Marker 
                            icon={runner}
                            key = {marker.id} 
                            position={[
                                marker.latitude, 
                                marker.longitude
                            ]}
                          
                            draggable={true}>
                            
                            <Popup minWidth={90}>
                                <span>
                                Distance From Previous: {marker.distance_from_prev}
                                </span>
                            </Popup>
                    
                            </Marker>
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