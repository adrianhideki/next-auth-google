import haversineDistance from "haversine-distance";

export const DEFAULT_LOCATION = {lat: 45.85456252178256, lng: 8.406235206880227};

export type LatLangData = {
  lat: number;
  lng: number;
  maxDistance: number;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomNearLocation(
  values: Omit<LatLangData, "maxDistance">,
  meters: number = 500
) {
  var r = meters / 111300, // = 100 meters
    y0 = values.lat,
    x0 = values.lng,
    u = Math.random(),
    v = Math.random(),
    w = r * Math.sqrt(u),
    t = 2 * Math.PI * v,
    x = w * Math.cos(t),
    y1 = w * Math.sin(t),
    x1 = x / Math.cos(y0);

  return {
    lat: y0 + y1,
    lng: x0 + x1,
  };
}

export async function getRandomStreetView(values: LatLangData) {
  try {
    const streetViewService = new google.maps.StreetViewService();
    const latLng = new google.maps.LatLng(values.lat, values.lng);
    const randomFactor = Math.random();

    const randomMaxDistance =
      values.maxDistance *
      (randomFactor > 0.3 && randomFactor < 0.7 ? randomFactor : 1);

    const response = await streetViewService.getPanorama({
      location: latLng,
      radius: randomMaxDistance,
      preference: google.maps.StreetViewPreference.BEST,
      source: google.maps.StreetViewSource.OUTDOOR,
    });

    if (response?.data.location.latLng.lat()) {
      // console.log(
      //   response?.data.location.latLng.lat(),
      //   response?.data.location.latLng.lng()
      // );
      return response?.data.location.latLng;
    } else {
      return new google.maps.LatLng(-23.9330793, -46.3252711);
    }
  } catch {
    return new google.maps.LatLng(-23.9330793, -46.3252711);
  }
}

export function getDistanceInMeters(
  origin: Omit<LatLangData, "maxDistance">,
  destination: Omit<LatLangData, "maxDistance">
): number {
  return origin && destination ? haversineDistance(origin, destination) : 0;
  // return google.maps.geometry.spherical.computeDistanceBetween(
  //   new google.maps.LatLng(origin),
  //   new google.maps.LatLng(destination)
  // );
}

export function getRandomStartPoint() {
  const locations = [
    { lat: 52.47876324394502, lng: -1.913465674644272 },
    { lat: 13.76332743683398, lng: 100.4917797885622 },
    { lat: -23.9330793, lng: -46.3252711 },
    { lat: 45.85456252178256, lng: 8.406235206880227 },
    { lat: 47.91794611735139, lng: 106.9353424093317 },
    { lat: 14.6706902862828, lng: -17.39964976387397 },
    { lat: 25.19737753354876, lng: 55.27443320656716 },
    { lat: 34.3823720098183, lng: 7.933148797380197 },
    { lat: 46.29434507084763, lng: 11.84828825022669 },
  ];

  return locations[getRandomInt(0, locations.length - 1)];
}
