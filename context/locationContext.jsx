import { createContext, useState } from "react";
import useLocation from "../hooks/useLocation";

const LocationContext = createContext({
  loc: null,
  setLoc: () => {}
})

const LocationProvider = (props) => {
  const {currentLoc, setLoc} = useLocation();

  return (
    <LocationContext.Provider value={{loc: currentLoc, setLoc: setLoc}}>
      {props.children}
    </LocationContext.Provider>
  )
}

export { LocationContext, LocationProvider }