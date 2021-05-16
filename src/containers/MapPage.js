import React from 'react';
import Button from '@material-ui/core/Button';
import Map from './Map.js'


const handleClick = (e) => {

}

const MapPage = () => {
return(
  <div>
    <Map/>
    <Button
      className="graph-button map-filter-button"
      variant="contained" 
      onClick={() => handleClick()}
      >
        Clear Routes
    </Button>
  </div>
  )
}

export default MapPage