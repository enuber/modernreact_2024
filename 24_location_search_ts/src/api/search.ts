// data comes back as being of type:any so we need to make sure to fix that.
// features is an array of objects. features: {}[], then we add into the object what we are looking for. Each object is going to have a geometry property. on the geometry object, we will have have coordinates that is an array of numbers. We also will have a properties property that will have a place_id that is a number and the display_name is a string.

import type { Place } from './Place';

interface SearchResponse {
  features: {
    geometry: {
      coordinates: number[];
    };
    properties: {
      place_id: number;
      display_name: string;
    };
  }[];
}

export const search = async (term: string) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`
  );

  //either of these ways is fine to show what type data should be.
  // const data = (await res.json()) as SearchResponse;
  const data: SearchResponse = await res.json();
  console.log(data);

  const places: Place[] = data.features.map((feature) => {
    return {
      id: feature.properties.place_id,
      name: feature.properties.display_name,
      longitude: feature.geometry.coordinates[0],
      latitude: feature.geometry.coordinates[1],
    };
  });

  return places;
};
