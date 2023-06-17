import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { UserData } from "./UserData";
import { AboutUs } from "./AboutUs";
import { LatestOutfit } from "./LatestOutfit";
import { Subscribe } from "./Subscribe";
import {EmailUs} from "../components/EmailUs"
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
        const response = await axios.get(`${API_URL}/api/language/${userCountryCode}`);
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
      {languageData && <UserData languageData={languageData.form_section} />}
      {languageData && <LatestOutfit languageData={languageData.last_outfits_section} />}
      {languageData && <AboutUs languageData={languageData.aboutus_section} />}
      <EmailUs/>
      {languageData && <Subscribe languageData={languageData.subscribe_section} />}
      <Footer />
    </div>
  );
};

export default Home;
