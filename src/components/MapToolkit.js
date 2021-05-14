import React, { useEffect } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import 'leaflet-geosearch/dist/geosearch.css';
import { FeatureGroup, Circle, useMap , Popup, Marker } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw';
import { Icon } from 'leaflet';


const MapToolkit = () => {
  const runner = new Icon({
    iconUrl:'https://upload.wikimedia.org/wikipedia/commons/b/b0/Running_icon_-_Noun_Project_17825.svg',
    iconSize: [25, 25]
  })
  
  function LeafletgeoSearch() {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({ provider });
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, []);
    return null;
  }

  const setMarker = (e) => {  
    debugger
  }

  return (
    <div>
      <LeafletgeoSearch />
      <FeatureGroup >
        <Popup>
          <span onClick={(e) => setMarker(e)}>
            Add to Drawing 
          </span>
        </Popup>
        <EditControl
          position='topright'
          marker={{
              // icon: runner,
              draggable: true
          }}
          draw={{ rectangle: false }}
        />
        <Circle center={[51.51, -0.06]} radius={200} />
        {/* <Marker></Marker> */}
      </FeatureGroup>
    </div>
  );
  
}

export default MapToolkit;