import { createContext, useState } from "react";
import useLocation from "../hooks/useLocation";

const LocationContext = createContext({
  loc: null,
  saveLoc: () => {}
})

const LocationProvider = (props) => {
  const {loc, setLoc, saveLoc} = useLocation();

  return (
    <LocationContext.Provider value={{loc: loc, setLoc: setLoc, saveLoc: saveLoc}}>
      {props.children}
    </LocationContext.Provider>
  )
}

export { LocationContext, LocationProvider }