import React, { Component, useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DistanceMatrixService,
  useJsApiLoader,
  LoadScriptNext,
} from "@react-google-maps/api";
import { GetStaticProps } from "next";
import axios from "axios";

const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

const center = {
  lat: 37.5247596,
  lng: -122.2583719,
};

const street = {
  lat: 51.5320665,
  lng: -0.177203,
};

type MapProps = {
  googleMapsApiKey: string;
};

type Position = {
  lat: number;
  lng: number;
  visible: boolean;
};

export default function Map({ googleMapsApiKey }: MapProps) {
  const google = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
  });

  const [position, setPosition] = useState({
    ...center,
    visible: false,
  } as Position);

  const handleMapClick = (e: any) => {
    const { latLng } = e;
    console.log({
      lat: latLng.lat(),
      lng: latLng.lng(),
    });

    setPosition({
      lat: latLng.lat(),
      lng: latLng.lng(),
      visible: true,
    });
  };

  return (
    <>
      {/* <LoadScriptNext googleMapsApiKey={googleMapsApiKey}> */}
      {/* <DistanceMatrixService
          options={{
            destinations: [{ lat: 1.296788, lng: 103.778961 }],
            origins: [{ lng: 103.780267, lat: 1.291692 }],
          }}
          callback={(response) => {
            console.log(response);
          }}
        /> */}
      {/* </LoadScriptNext> */}
      <LoadScriptNext googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={2}
          onClick={handleMapClick}
          clickableIcons={false}
          options={{
            clickableIcons: false,
            disableDefaultUI: true,
          }}
        >
          <Marker position={position} visible={position.visible} />
        </GoogleMap>
      </LoadScriptNext>
    </>
  );
}
