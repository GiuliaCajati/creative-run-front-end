import React, { useState, useEffect } from 'react';
import RunMarker from './RunMarker.js'

const Markers = () => {
  const [ drawings, setDrawings ] = useState()

  useEffect(() => {
      fetch('http://localhost:3000/drawings')
      .then(data => data.json())
      .then(drawings => { 
        setDrawings(drawings);
      })  
  },[])

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
          debugger
          setDrawings([updatedMarker.drawing])//make modification
          //setDrawings([updatedMarker, ...drawings[0].markers.filter(marker => marker.id !== updatedMarker.id)])
          debugger
        }) 
  }

  return(
    <div>
      {drawings
      ?
      <div>
        {drawings[0].markers.map((marker) => {
          return<RunMarker marker={marker} setPosition={updatePosition} />})}
      </div>
      : 
      <div>Loading...</div>} 
    </div>
    )
  }

export default Markers;