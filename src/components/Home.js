import React from "react";

import { UserData } from "./UserData";
import { AboutUs } from "./AboutUs";
import { LatestOutfit } from "./LatestOutfit";
import { Subscribe } from "./Subscribe";

const Home = () => {
  return (
    <div className='"Home_Container'>
      <UserData />
      <LatestOutfit />
      <AboutUs />
      <Subscribe />
    </div>
  );
};

export default Home;
