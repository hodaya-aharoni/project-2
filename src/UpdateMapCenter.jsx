import { marker } from 'leaflet';
import { useMap } from 'react-leaflet'
//שמחזירה את המפה useMap  קוראת לפונקציה prop מקבלת את פסי האורך והרוחב ב 
//prop ומעדכנת את מיקום המפה לפי ה
const UpdateMapCenter = (prop) => {
    
  
    const map = useMap();
    map.setView(prop.center)
    return null
}

export default UpdateMapCenter