import React, {useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import MapToolkit from '../components/MapToolkit.js'
import CreateDrawingForm from '../components/CreateDrawingForm'
import RunMarker from '../components/RunMarker.js'
import Button from '@material-ui/core/Button';


const Map = () => {
  const [ drawings, setDrawings ] = useState()
  const [ open, setOpen ] = useState(false);
 
  useEffect(() => {
      fetch('http://localhost:3000/drawings')
      .then(data => data.json())
      .then(drawings => { 
        setDrawings(drawings);
      })  
  },[])

  const handleClick = () => {
    setOpen(true)
  }

  const updatePosition = ( updatedCoordinates, markerID) => { 
    fetch(`http://localhost:3000/markers/${parseInt(markerID)}`, {
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
        .then(updatedMarker => {
          setDrawings([updatedMarker.drawing])//make modification
          //setDrawings([updatedMarker, ...drawings[0].markers.filter(marker => marker.id !== updatedMarker.id)])
        }) 
  }

  

  const createDrawing = ( newDrawing ) => { 
    fetch('http://localhost:3000/drawings', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( newDrawing )
    })
        .then(res => res.json())
        .then(newDrawing =>{
          debugger
          setDrawings([...drawings, newDrawing])
        })
  }

  // //working on
  const createMarker = ( newMarker ) => { 
    //newDrawingID & place
    fetch(`http://localhost:3000/markers`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
                'Accept': 'application/json'
        },
        body: JSON.stringify({
        coordinates: newMarker 
        })
    })
        .then(res => res.json()) 
        .then(newMarker => {
          debugger
          setDrawings([newMarker.drawing])//make modification
          //setDrawings([updatedMarker, ...drawings[0].markers.filter(marker => marker.id !== updatedMarker.id)])
        }) 
  }

  return(
    <div>
      <MapContainer center={[38.9072, -77.0369]} zoom={13} stroke={true}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          <MapToolkit  
            createMarker={createMarker} />
            <div>
              {drawings
                ? 
                  <div>
                  {drawings[0].markers.map((marker) => {
                  return<RunMarker 
                  setPosition={updatePosition}
                  marker={marker} 
                  />})}
                  </div>
                : 
                  <div>Loading...</div>} 
            </div>
      </MapContainer>
      <CreateDrawingForm createDrawing={createDrawing} open={open} setOpen={setOpen}/>
      <Button
        className="graph-button map-filter-button"
        variant="contained" 
        onClick={() => handleClick()}
        >
          Start Drawing Route
      </Button>
    </div>
      
    )
}

export default Map