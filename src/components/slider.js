import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import card_image from "../images/banner_section.png";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import "../style/boostrap.css"
import "../style/custom.css";

const Slider = () => {
  const outfits = [
      card_image,
      card_image
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % outfits.length);
  };

  const prevIndex = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? outfits.length - 1 : prevIndex - 1
    );
  };

  return (
    <ReactScrollWheelHandler
      upHandler={prevIndex}
      downHandler={nextIndex}
      preventScroll={true}
    >
      <div>
        <Carousel
          className="main-slide"
          useKeyboardArrows
          autoPlay
          showArrows
          showStatus
          transitionTime={800}
          selectedItem={currentIndex}
        >
          {outfits.map((index) => (
            <div key={index}>
              <img src={card_image} alt="#" className="img-fluid mx-auto d-block" />
            </div>
          ))}
        </Carousel>
      </div>
    </ReactScrollWheelHandler>
  );
};

export default Slider;