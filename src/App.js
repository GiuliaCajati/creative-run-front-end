
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css';

function App() {
  return (
    <MapContainer center={[38.9072, -77.0369]} zoom={15}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default App;
