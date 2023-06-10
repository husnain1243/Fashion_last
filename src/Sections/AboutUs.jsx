import "../style/boostrap.css";

import { Card } from "../components/Card";

export const AboutUs = () => {
  return (
    <div className="About_Us_container bg-dark text-white py-3 py-lg-5">
      <div className="container">
        <h2 className="mb-5">About Us</h2>
        <Card />
      </div>
    </div>
  );
};