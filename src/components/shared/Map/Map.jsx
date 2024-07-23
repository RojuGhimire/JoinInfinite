import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";

const libraries = ["places"];

const Map = ({ location, setLocation, isOpen }) => {
  const [newlocation, setNewLocation] = useState(null);
  const [googleApiKey, setGoogleApiKey] = useState(1);
  const [map, setMap] = useState(null);
  const [nullMap, setNullMap] = useState(null);
  const markerRef = useRef(null);

  const options = {
    zoomControl: true, // Optional: Enable zoom control
    mapTypeControl: false,
  };

  const position = location
    ? { lat: location.latitude, lng: location.longitude }
    : { lat: 0, lng: 0 };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLocation({ latitude: lat, longitude: lng });
    setNewLocation({ latitude: lat, longitude: lng });
  };

  //to get the current and selected location
  useEffect(() => {
    if (map) {
      if (newlocation) {
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
        markerRef.current = new window.google.maps.Marker({
          position: { lat: newlocation.latitude, lng: newlocation.longitude },
          map,
        });
      } else {
        markerRef.current = new window.google.maps.Marker({
          position: position,
          map,
        });
      }
    }
  }, [map, newlocation]);

  useEffect(() => {
    if (nullMap) {
      if (newlocation) {
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
        markerRef.current = new window.google.maps.Marker({
          position: { lat: newlocation.latitude, lng: newlocation.longitude },
          map,
        });
      }
    }
  }, [map, newlocation]);

  //to reload the google api
  useEffect(() => {
    setGoogleApiKey((prev) => prev + 1);
  }, [isOpen]);

  const onLoad = (map) => {
    setMap(map);
  };

  const onNullMapLoad = (nullMap) => {
    setMap(nullMap);
  };

  return (
    <>
      {location === null ? (
        <LoadScript
          googleMapsApiKey="AIzaSyAn_-3vGjvMmmaN8La8BIQew_Big6QRCU8"
          libraries={libraries}
          key={googleApiKey}
        >
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={{ lat: 27.698226996254885, lng: 85.31715684278657 }}
            zoom={12}
            isOpen
            onLoad={onNullMapLoad}
            onClick={(e) => handleMapClick(e)}
          >
            {newlocation && <Marker position={newlocation} />}
          </GoogleMap>
        </LoadScript>
      ) : (
        <LoadScript
          googleMapsApiKey="AIzaSyAn_-3vGjvMmmaN8La8BIQew_Big6QRCU8"
          libraries={libraries}
          key={googleApiKey}
        >
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={position || { lat: 0, lng: 0 }}
            zoom={{ lat: location.latitude, lng: location.longitude } ? 12 : 2}
            options={options}
            isOpen
            onLoad={onLoad}
            onClick={(e) => handleMapClick(e)}
          ></GoogleMap>
        </LoadScript>
      )}
   </>
  );
};

export default Map;
