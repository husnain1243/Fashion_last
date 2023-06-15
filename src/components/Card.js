import card_image from "../images/about-card-vector.png";

import "../style/boostrap.css";
import "../style/custom.css";

function RenderingArrayOfObjects() {
  const data = [
    {
      Image: card_image,
      Title: "AI generated Outfit Recommendations",
      Description:
        "Our application uses advanced AI technology to offer personalized outfit recommendations based on your preferences and the latest fashion trends.",
    },
    {
      Image: card_image,
      Title: "Seamless Shopping Experience",
      Description:
        "With integrated Amazon shopping, you can directly find and purchase the clothes and accessories from your recommended outfits without leaving the app.",
    },
    {
      Image: card_image,
      Title: "Visual Previews",
      Description:
        "Get a sneak peek of how each recommended outfit would look on you with our AI-driven outfit visualization feature.",
    },
    {
      Image: card_image,
      Title: "Expanded Shop Selection (coming soon)",
      Description:
        "We're working on adding more popular and diverse shops to our platform to give you even more clothing options and styles.",
    },
    {
      Image: card_image,
      Title: "Latest Fashion Trends (coming soon)",
      Description:
        "Stay ahead of the fashion curve with updates on the latest trends. Our app will soon incorporate trend forecasts into outfit recommendations.",
    },
    {
      Image: card_image,
      Title: "Digital Wardrobe (coming soon)",
      Description:
        "Manage and organize your clothes digitally. This upcoming feature will allow you to keep track of what you own, plan outfits with your existing wardrobe, and identify what you might need to add.",
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
