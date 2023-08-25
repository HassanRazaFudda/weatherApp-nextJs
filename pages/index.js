import React from "react";
import CurrentLocation from "@/components/currentLocation";


export default function Home() {
  return (
      <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      </React.Fragment>
  )
}
