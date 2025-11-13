import React from "react";

export const Popup = ({ homeworldData }) => {
  return (
    <>
      <div className="popup">
        <div className="popup-inner">
          <h5>Homeworld Details</h5>
          <p> Name: {homeworldData?.name}</p>
          <p className="flex flex-wrap">
            Terrain: {homeworldData?.terrain.slice(0, 12)}
          </p>
          <p>Climate: {homeworldData?.climate}</p>
          <p>Population: {homeworldData?.population}</p>
        </div>
      </div>
    </>
  );
};
