import { createContext, useState } from "react";
import useLocation from "../hooks/useLocation";

const LocationContext = createContext({
  loc: null,
  saveLoc: () => {}
})

const LocationProvider = (props) => {
  const {loc, saveLoc} = useLocation();

  return (
    <LocationContext.Provider value={{loc: loc, saveLoc: saveLoc}}>
      {props.children}
    </LocationContext.Provider>
  )
}

export { LocationContext, LocationProvider }