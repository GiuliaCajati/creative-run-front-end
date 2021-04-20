import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React, { useState, useEffect } from 'react';
import { Icon } from 'leaflet';



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
    
  

return(
    <div>
        {data 
        ?
         <div>
             <MapContainer center={[38.9072, -77.0369]} zoom={15}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                
                
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