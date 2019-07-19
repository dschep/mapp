import queryParams from "./queryParams";

export default options => {
  if (queryParams.has("location")) {
    const [latitude, longitude] = queryParams.get("location").split(",", 2);
    return Promise.resolve({ coords: { latitude, longitude } });
  }
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
};
