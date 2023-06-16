import arrowImg from "../images/RelatedArrow.png";
import card_image from "../images/banner_section.png";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import "../style/boostrap.css"
import "../style/custom.css";

const RelatedResult = () => {
  const products = [
    {id: 1, image: card_image, product_name: 'facebook' , product_price: 'instagram'},
    {id: 2, image: card_image, product_name: 'facebook' , product_price: 'instagram'},
    {id: 3, image: card_image, product_name: 'facebook' , product_price: 'instagram'},
    {id: 4, image: card_image, product_name: 'facebook' , product_price: 'instagram'},
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevIndex = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };
  const breakPoints = [
    { width: 375, itemsToShow: 1, itemsToScroll: 1, pagination: false },
    { width: 768, itemsToShow: 2, itemsToScroll: 1 },
    { width: 992, itemsToShow: 4, itemsToScroll: 1 },
  ];

  return (
    <ReactScrollWheelHandler
      upHandler={prevIndex}
      downHandler={nextIndex}
      preventScroll={true}
    >
      <div>
        <Carousel
          className="main-slide"
          infiniteLoop
          useKeyboardArrows
          autoPlay
          showArrows
          showStatus
          transitionTime={1000}
          selectedItem={currentIndex}
          breakPoints={breakPoints}
        >

          {products.map((product, index) => {
            return (
              <a
                href={product.product_url} target="_blank" rel="noopener noreferrer"
                className="List-related-result text-white rounded mb-5 d-flex flex-row align-items-center w-100 px-2"
                key={index}
                style={{ textDecoration: 'none' }}
                draggable="false" // Disable dragging
              >
                <div className="List-image-container">
                  <img
                    src={product.image}
                    alt="image"
                    className="rounded img-fluid mx-auto d-block"
                  />
                </div>
                <div className="List-related-result-body d-flex text-start flex-column align-items-start px-3">
                  <h3>{product.product_name}</h3>
                  <h3>{product.product_price}</h3>
                  <img
                    src={arrowImg}
                    alt="Arrow"
                    className="rounded-circle img-fluid d-block"
                  />
                </div>
              </a>
            );
          })}

      </Carousel>
      </div>
      </ReactScrollWheelHandler>
  );
};
export default RelatedResult;
