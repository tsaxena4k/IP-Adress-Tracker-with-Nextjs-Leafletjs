import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const Map = ({result}) => {
  return (
    <MapContainer center={[result.location.lat,result.location.lng]} zoom={13} scrollWheelZoom={false} style={{height: "100%", width: "100%"}}>
      <TileLayer
       url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_API_key}`}
       attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker 
      position={[result.location.lat,result.location.lng]}
      draggable={true}
      animate={true}
      >
        <Popup>
          Your IP is here
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map