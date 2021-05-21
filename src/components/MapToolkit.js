import React, { useEffect, useRef, useState } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import 'leaflet-geosearch/dist/geosearch.css';
import { FeatureGroup, Circle, useMap , Popup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw';
import { Icon } from 'leaflet';

const MapToolkit = (props) => { 
  const [ place, setRoute ]  = useState(1)
  const createMarker = props.createMarker
  const drawingID = props.newDrawingID
  const markerRef = useRef(null)
  const runner = new Icon({
    iconUrl:'https://upload.wikimedia.org/wikipedia/commons/b/b0/Running_icon_-_Noun_Project_17825.svg',
    iconSize: [25, 25]
  })

  function LeafletgeoSearch(props) {
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
    debugger
    if(drawingID !== undefined){
      setRoute(1) // change with new drawingID
      const markerCoordinates = e.layer._latlng
        debugger 
      let newMarker = {
        longitude: markerCoordinates.lat,
        latitude: markerCoordinates.lng,
        place: place,
        drawing_id: drawingID 
      }
      createMarker( newMarker )  
      place++
    }
  }

  return (
    <div>
      <LeafletgeoSearch />
      <FeatureGroup >
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