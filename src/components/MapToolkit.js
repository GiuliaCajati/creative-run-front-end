import React, { useEffect, useRef } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import 'leaflet-geosearch/dist/geosearch.css';
import { FeatureGroup, Circle, useMap , Popup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw';
import { Icon } from 'leaflet';

const MapToolkit = () => {
  const markerRef = useRef(null)
  const runner = new Icon({
    iconUrl:'https://upload.wikimedia.org/wikipedia/commons/b/b0/Running_icon_-_Noun_Project_17825.svg',
    iconSize: [25, 25]
  })

  //temp state to store drawing 
  //create on button to create drawing 
  //
  
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

  const onCreate = (e) => {
    //e.layer._latlng
    //if first marker 
      //start route 
    
    debugger 
    //create marker and add polyline 
  }

  return (
    <div>
      <LeafletgeoSearch />
      <FeatureGroup >
        <Popup>
          <div>
          <form>
            <label for="fname">Route Name:</label>
            <input type="text" id="rname" name="rname">
            </input>
            <button>Start Route</button>
          </form>
          </div>
        </Popup>
        <EditControl
          position='topright'
          onCreated={(e)=> onCreate(e)}
          marker={{
              ref: markerRef ,
              // icon: runner,
              draggable: true
          }}
          draw={{ rectangle: false }}
        />
        <Circle center={[51.51, -0.06]} radius={200} />
      </FeatureGroup>
    </div>
  );
  
}

export default MapToolkit;