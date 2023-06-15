import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { UserData } from "./UserData";
import { AboutUs } from "./AboutUs";
import { LatestOutfit } from "./LatestOutfit";
import { Subscribe } from "./Subscribe";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { API_URL } from "../utils/constants";

const Home = () => {
  const [languageData, setLanguageData] = useState(null);
  const [userCountryCode, setUserCountryCode] = useState(null);
  
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/get_country`);
        setUserCountryCode(response.data.countryCode);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountryData();
  }, []);

  useEffect(() => {
    const fetchLanguageData = async () => {
      try {
        const language = "en_GB";
        const response = await axios.get(`${API_URL}/api/language/${language}`);
        setLanguageData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if(userCountryCode){
      fetchLanguageData();
    }
  }, [userCountryCode]);

  return (
    <div className='"Home_Container'>
      <Navbar />
      {languageData && <UserData languageData={languageData} />}
      <LatestOutfit />
      <AboutUs />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Home;
