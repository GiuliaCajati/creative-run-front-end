import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, Circle, useMap, Polyline } from 'react-leaflet'
import { Icon } from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import 'leaflet-geosearch/dist/geosearch.css';

// Next steps
// 1. Show polyline for each marker
    // Make addPolyline method (API request to OSRM)
    // a. save polyline to a variable (each marker can store polyline that points to prev marker) 
    // b. on pageload addPolyline for each marker 
    
// 2. Make New Drawing: 
    // a. Add Marker ... addPolyline
    // b. Edit Marker
    // c. Delete Marker 
// 3. Option to show all images or select from list 

const Map = () => {
    const [data, setData] = useState()
    
    const returnPolylines = (marker) => {
        return marker.add_polyline.forEach(coordinates => {
            return coordinates + ','
        })
    }

    
    
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
                
             
                <div>
                    {data[0].markers.map((marker, i) => { 
                        //debugger

                        return<div>
                            
                        <Marker 
                            icon={runner}
                            key = {marker.id} 
                            position={[
                                marker.latitude, 
                                marker.longitude
                            ]}
                            routeWhileDragging={true}
                          
                            draggable={true}>
                            
                            <Popup minWidth={90}>
                                <span>
                                Distance From Previous: {marker.distance_from_prev}
                                </span>
                            </Popup>
                            
                    
                            </Marker>
                            {marker.add_polyline === null?
                                null:
                            // returnPolylines(marker)?
                            //     null:
                                

                             <Polyline key={1} 
                             
                             positions={[
                                
                                //start 
                                [data[0].markers[i-1].latitude,
                                data[0].markers[i-1].longitude], 
                                //finish
                                [marker.latitude,
                                marker.longitude],
                                [marker.add_polyline[0][1],
                                    marker.add_polyline[0][0]]
                                // returnPolylines(marker),
                               
                              ]} color={'red'} />}  
                           
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