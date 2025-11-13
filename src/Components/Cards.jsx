import { useState, useEffect } from "react";
import { Popup } from "./Popup";
export const Cards = ({
  name,
  height,
  gender,
  skin_color,
  Mass,

  date_added,
  films_count,
  birth_year,
  homeworld,
}) => {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [homeWorldData, setHomeWorldData] = useState(null);
  useEffect(() => {
    getHomeWorldData();
  }, []);
  const getHomeWorldData = async () => {
    try {
      const response = await fetch(homeworld);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setHomeWorldData(jsonData);
    } catch (error) {
      console.log("error fetching homeworld data:", error);
    }
  };
  return (
    <>
      <div
        className="bg-slate-400 m-4 p-5 max-w-4/5 items-center text-sm rounded-lg shadow-lg hover:scale-105 transition-all duration-300  
  "
        onClick={() => setVisible(true)}
      >
        <p className="bg-gray-600  rounded-lg text-center ">Name: {name}</p>
        <p>Skin Color: {skin_color}</p>
        <p>Height: {height}M</p>
        <p> Gender: {gender}</p>
        <p>Mass: {Mass}Kg</p>

        <p>date_added: {date_added}</p>
        <p>birth year: {birth_year}</p>
        <p>films count: {films_count}</p>
        {visible && (
          <div onClick={() => setIsOpen(!isOpen)}>
            <Popup homeworldData={homeWorldData} />
          </div>
        )}
      </div>
    </>
  );
};
