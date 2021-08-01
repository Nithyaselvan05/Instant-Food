import camelize from "camelize";

import { locations } from "./location.mock";

export const locationRequest = (searchTerm) => {
  return new Promise((resolve, reject) => {
    const locationMock = locations[searchTerm];
    if (!locationMock) {
      reject("not found");
    }
    resolve(locationMock);
  });
};


// export const locationRequest = (searchTerm) => {
//   // console.log(searchTerm)
//   return fetch(
//     `http://localhost:5001/instantfood-d5e2e/us-central1/geocode?city=${searchTerm}`
//   ).then((res) => res.json())
//   .then(data => console.log(data));
// };
export const locationTransform = (result) => {
  // console.log(result)
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
