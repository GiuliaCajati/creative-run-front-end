import React, { useState, useEffect } from 'react';
import RunMarker from './RunMarker.js'

const Markers = () => {
  const [ data, setData ] = useState()

  useEffect(() => {
      fetch('http://localhost:3000/drawings')
      .then(data => data.json())
      .then(drawings => {
        setData(drawings);
      })  
  },[])

  const setPosition = ( updatedCoordinates, markerID) => { 
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
        .then(updatedMarker => setData([updatedMarker,...data])) 
  }

  return(
    <div>
      {data
      ?
      <div>
        {data[0].markers.map((marker) => { 
          return<RunMarker marker={marker} setPosition={setPosition} />})}
      </div>
      : 
      <div>Loading...</div>} 
    </div>
    )
  }

export default Markers;