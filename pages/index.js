import React, { useEffect } from "react";
import Weather from "@/components/Weather";


export default function Home() {
  return (
      <React.Fragment>
      <div className="container">
        <Weather />
      </div>
      </React.Fragment>
  )
}
