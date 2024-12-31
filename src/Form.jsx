import "./form.css"
import { useState } from "react";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Spinner from './Spinner.jsx';
import UpdateMapCenter from "./UpdateMapCenter";



export default function Form() {
    const [addresses, setAddresses] = useState([]);
    let [data, setData] = useState([]);
    let [lat, setLat] = useState(30.8124247);
    let [lon, setLon] = useState(34.8594762);
    let [status, setStatus] = useState("");
    let [name, setName] = useState("")

    //מבצעת קריאה ל-API של Nominatim לחיפוש כתובות לפי קלט משתמש ומעדכנת את המצב.
    
    async function nominatim_API(e) {
        try {
            data = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${e}&limit=5`);
            data = await data.json();
            setData([...data])
            let copy = [];
            data.forEach(item => {
                copy.push(item.display_name);
                setAddresses(copy)
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    //מוצאת את פרטי המיקום שנבחר ומעדכנת את פסי האורך,פסי הרוחב, השם, והסטטוס.

    function getDetails(select) {
        let find = data.find(address => address.display_name == select)
        if
            (!find) { }
        else {

            setLat(find.lat)
            setLon(find.lon)
            setName(find.display_name)
            setStatus("✅" + "נמצא")
        }

    }

    return (
        <div className="container">
            <div className="form-container">

                {/* מבנה טופס הכולל קלט למשתמש שם פלאפון וכו וכולל
                 לחיפוש כתובות לפי מה שיתקל אורך ורוחב וכן מעדכנת את הקומפוננטה Autocomplete*/}

                <form>
                    <div className="form-fields">
                        <label htmlFor="username">שם משתמש :</label>
                        <input type="text" id="username" name="username" />
                        <div className="spinner-container">
                            {status == "מחפש..." && <Spinner />}
                            <div >{status}</div>
                        </div>
                        <Autocomplete
                            disablePortal
                            onInputChange={(e, select) => {
                                setStatus("מחפש...")
                                nominatim_API(e.target.value);
                                getDetails(select);

                            }}
                            options={addresses}
                            sx={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Address" />}
                        />
                        <label htmlFor="phone">פלאפון :</label>
                        <input type="text" id="phone" name="phone" />

                        <label htmlFor="email">כתובת מייל :</label>
                        <input type="email" id="email" name="email" />

                        <div className="checkbox-group">
                            <div>
                                <label htmlFor="internet connection">חיבור אינטרנט </label>
                                <input type="checkbox" id="internet connection" name="internet connection" />
                            </div>
                            <div>
                                <label htmlFor="kitchen">מטבח </label>
                                <input type="checkbox" id="kitchen" name="kitchen" />
                            </div>
                            <div>
                                <label htmlFor="coffee machine">מכונת קפה </label>
                                <input type="checkbox" id="coffee machine" name="coffee machine" />
                            </div>
                        </div>

                        <label htmlFor="room-number">מספר חדרים :</label>
                        <input type="number" id="room-number" name="room-number" />

                        <label htmlFor="distance">מרחק :</label>
                        <input type="number" id="distance" name="distance" />


                        <input type="submit" />




                    </div>
                </form>
            </div>
            {/* מציגה מפה עם מיקום מבוסס על פי פסי אורך והרוחב 
            מציינת את המיקום שנבחר עם מרקר, ומאפשרת הצגת שם המיקום */}
            <div className="map-container">
                <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <UpdateMapCenter center={[lat, lon]} />


                    <Marker position={[lat, lon]}>
                        <Popup>
                            {name}
                            <br />

                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

