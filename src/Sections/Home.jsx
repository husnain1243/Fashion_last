import React from "react";

import { UserData } from "./UserData";
import { AboutUs } from "./AboutUs";
import { LatestOutfit } from "./LatestOutfit";
import { Subscribe } from "./Subscribe";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className='"Home_Container'>
      <Navbar />
      <UserData />
      <LatestOutfit />
      <AboutUs />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Home;
