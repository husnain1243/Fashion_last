import card_image from "../images/about-card-vector.png";

import "../style/boostrap.css";
import "../style/custom.css";

function RenderingArrayOfObjects() {
  const data = [
    {
      Image: card_image,
      Title: "feature 1",
      Description:
        "Pons teren. Fasogon hålingar. Makrosm tredat spelangar. Hepp attitydig etnosion. Dunen favis och ninar, presade dåssade. ",
    },
    {
      Image: card_image,
      Title: "feature 2",
      Description:
        "Pons teren. Fasogon hålingar. Makrosm tredat spelangar. Hepp attitydig etnosion. Dunen favis och ninar, presade dåssade. ",
    },
    {
      Image: card_image,
      Title: "feature 3",
      Description:
        "Pons teren. Fasogon hålingar. Makrosm tredat spelangar. Hepp attitydig etnosion. Dunen favis och ninar, presade dåssade. ",
    },
    {
      Image: card_image,
      Title: "feature 4",
      Description:
        "Pons teren. Fasogon hålingar. Makrosm tredat spelangar. Hepp attitydig etnosion. Dunen favis och ninar, presade dåssade. ",
    },
    {
      Image: card_image,
      Title: "feature 5",
      Description:
        "Pons teren. Fasogon hålingar. Makrosm tredat spelangar. Hepp attitydig etnosion. Dunen favis och ninar, presade dåssade. ",
    },
    {
      Image: card_image,
      Title: "feature 6",
      Description:
        "Pons teren. Fasogon hålingar. Makrosm tredat spelangar. Hepp attitydig etnosion. Dunen favis och ninar, presade dåssade. ",
    },
  ];
  const listItems = data.map((e, index) => {
    return (
      <div className="card text-white rounded" key={index}>
        <div className="card-image-container text-start p-3">
          <img src={e.Image} alt="image" className="img-fluid rounded" />
        </div>
        <div className="card-body d-flex flex-column">
          <h3 className="card-title">{e.Title}</h3>
          <p className="card-text">{e.Description} </p>
        </div>
      </div>
    );
  });
  return (
    <div className="card_container d-flex flex-row flex-wrap gap-3 justify-content-center">
      {listItems}
    </div>
  );
}
export const Card = () => {
  return <RenderingArrayOfObjects />;
};
