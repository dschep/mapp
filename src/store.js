import createStore from "react-waterfall";
import getLocation from "./util/getLocation";

function cloneAsObject(obj) {
  if (obj === null || !(obj instanceof Object)) {
    return obj;
  }
  var temp = obj instanceof Array ? [] : {};
  // ReSharper disable once MissingHasOwnPropertyInForeach
  for (var key in obj) {
    temp[key] = cloneAsObject(obj[key]);
  }
  return temp;
}

const config = {
  initialState: {
    drawer: false,
    path: window.location.pathname,
    view: "Map",
    location: {
      ...(JSON.parse(localStorage.getItem("location") || null) || {
        coords: { latitude: 38.9043018, longitude: -77.0237815 }
      }),
      cached: true
    },
    zoomLevel: JSON.parse(localStorage.getItem("zoomLevel") || "16"),
    error: null
  },
  actionsCreators: {
    // Basic UI interaction
    toggleDrawer: ({ drawer }, actions, value) =>
      value !== undefined ? { drawer: value } : { drawer: !drawer },
    setPath: (state, actions, path, pop = false) => {
      if (!pop) {
        if (path === "/") {
          window.history.replaceState(undefined, undefined, path);
        } else {
          window.history.pushState(undefined, undefined, path);
        }
      }
      return { path };
    },
    setError: (state, actions, error) => ({ error }),
    // zoomlevel
    setZoomLevel: (state, actions, zoomLevel) => {
      localStorage.setItem("zoomLevel", zoomLevel.toString());
      return { zoomLevel };
    },
    // Location stuff
    setLocation: (state, actions, newLocation) => {
      const location = cloneAsObject(newLocation);
      localStorage.setItem("location", JSON.stringify(location));
      return { location };
    },
    watchLocation: async (state, actions) => {
      try {
        actions.setLocation(await getLocation());
      } catch (err) {
        if (err.code === 1) {
          return { error: "Location permission denied" };
        } else {
          return { error: "Unexpected error while accessing location" };
        }
      }
      navigator.geolocation.watchPosition(
        location => {
          actions.setLocation(location);
          console.log(location);
        },
        actions.setError,
        { enableHighAccuracy: true }
      );
    }
  }
};

export const { Provider, connect, actions } = createStore(config);

window.onpopstate = () => actions.setPath(window.location.pathname, true);
