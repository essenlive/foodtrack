import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import styles from '@styles/components/map.module.css'


export default function Map() {


  return  (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className={styles.map}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          etsts
        </Popup>
      </Marker>
    </MapContainer>
)}
