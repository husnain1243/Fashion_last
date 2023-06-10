import React, { Component } from "react";
import Carousel from "@itseasy21/react-elastic-carousel";

import arrowImg from "../images/RelatedArrow.png";

class RelatedResult extends Component {
  constructor(props) {
    super(props);
    this.breakPoints = [
      { width: 375, itemsToShow: 1, itemsToScroll: 1, pagination: false },
      { width: 768, itemsToShow: 2, itemsToScroll: 1 },
      { width: 992, itemsToShow: 4, itemsToScroll: 1 },
    ];
  }
  render() {
    const { products } = this.props;
    return (
      <div>
        <Carousel breakPoints={this.breakPoints}>
          {products.map((product, index) => {
            const rawPrice = product?.price?.raw || "";
            return (
              <div
                className="List-related-result text-white rounded mb-5 d-flex flex-row align-items-center w-75 px-2"
                key={index}
              >
                <div className="List-image-container">
                  <img
                    src={product.image}
                    alt="image"
                    className="img-fluid rounded"
                  />
                </div>
                <div className="List-related-result-body d-flex text-start flex-column align-items-start px-4">
                  <h3>{product.title}</h3>
                  <h3>{rawPrice}</h3>
                  <a href={product.link}>
                    <img
                      src={arrowImg}
                      alt="Arrow"
                      className="img-fluid rounded-circle"
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    );
  }
}
export default RelatedResult;
