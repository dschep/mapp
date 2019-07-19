const queryParams = new Map(
  window.location.search
    .slice(1)
    .split("&")
    .filter(truthy => truthy)
    .map(field => (field.includes("=") ? field.split("=") : [field, true]))
);

export default queryParams;
