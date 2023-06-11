import React, { useEffect, useState} from 'react';
import Slider from "../components/slider";
import axios from "axios";
import { API_URL } from "../utils/constants";

import "../style/boostrap.css";
import "../style/custom.css";



function RenderingArrayOfObjects() {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    getOutfits();
  }, []);

  const getOutfits = () => {
    setOutfits([]);
    axios({
      method: "get",
      url: `${API_URL}/api/get_outfits`,
    }).then((response) => {
      setOutfits(response.data);
    });
  };
  
  return (
    <div className="Latestoutfit_container">
      <div className="container">
        <div className="row py-5 px-lg-5">
          <h3 className="mb-5 text-white">Last Outfits</h3>
          <div className="list_container">
            <Slider outfits={outfits}/>
          </div>
        </div>
      </div>
    </div>
  );
}
export const LatestOutfit = () => {
  return <RenderingArrayOfObjects />;
};
