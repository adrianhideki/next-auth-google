import React, { Component, useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StreetViewPanorama,
} from "@react-google-maps/api";
import { GetStaticProps } from "next";
import { useGameContext } from "../../context/gameContext";

const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

type StreetMapProps = {
  googleMapsApiKey: string;
};

export default function StreetMap({ googleMapsApiKey }: StreetMapProps) {
  const { startPoint, setStreetPoint, hasStart, guessPoint, streetPoint } = useGameContext();
  const ref = React.useRef<StreetViewPanorama>();

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      {startPoint.lat && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={startPoint}
          zoom={2}
          clickableIcons={false}
          options={{
            clickableIcons: false,
            disableDefaultUI: true,
          }}
          onClick={(e) => console.log(e)}
        >
          <StreetViewPanorama
            options={{
              position: startPoint,
              enableCloseButton: false,
              linksControl: false,
              addressControl: false,
              visible: true,
              motionTracking: false,
              motionTrackingControl: false,
              disableDefaultUI: true,
              showRoadLabels: false,
            }}
            ref={ref}
            onPositionChanged={() => {
              if (ref.current?.context.data.map.streetView.location) {
                var lat =
                  ref.current?.context.data.map.streetView.location.latLng.lat();
                var lng =
                  ref.current?.context.data.map.streetView.location.latLng.lng();

                // console.log(lat, lng, hasStart, streetPoint);
                if (
                  lat &&
                  lng &&
                  hasStart &&
                  streetPoint.lat !== lat &&
                  streetPoint.lng !== lng
                ) {
                  // setStreetPoint({
                  //   lat: lat,
                  //   lng: lng,
                  // });
                }
              }
            }}
          />
        </GoogleMap>
      )}
    </LoadScript>
  );
}
