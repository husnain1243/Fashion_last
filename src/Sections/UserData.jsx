import { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import search_vector from "../images/search-vector.png";
import { Results } from "../components/Result";
import { Oval } from 'react-loader-spinner'
import "../style/boostrap.css";
import "../style/custom.css";

import axios from "axios";
import { API_URL } from "../utils/constants";
import RelatedResult from "../components/RelatedResult";
import ProductSlider from "../components/ProductSlider";
const style = [
  {
    name: "Casual",
  },
  {
    name: "Business Casual",
  },
  {
    name: "Formal",
  },
  {
    name: "Athleisure",
  },
  {
    name: "Streetwear",
  },
  {
    name: "Bohemian",
  },
  {
    name: "Vintage",
  },
  {
    name: "Preppy",
  },
  {
    name: "Punk"
  },
  {
    name: "Minimalist"
  }
];

const gender = [
  {
    name: "male",
  },
  {
    name: "female",
  },
  {
    name: "other",
  },
];

const Loader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', /* Adjust the transparency by changing the last value (0.5) */
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Ensure the loader appears above other content
      }}
    >
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        secondaryColor="#4fa94d"
        strokeWidth={4}
        strokeWidthSecondary={2}
      />
    </div>
  );
};



export const UserData = () => {
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);
  const [clickedButtonGender, setClickedButtonGender] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageURL, setSelectedImageURl] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [products, setProducts] = useState(null);
  const [recordId, setRecordId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const ShownResult = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("style", selectedStyle);
    formData.append("gender", selectedGender);
    formData.append("age", age);
    setIsLoading(true);
    axios
      .post(`${API_URL}/api/submit_image_details`, formData)
      .then((response) => {
        setGeneratedImage(response.data.generated_image_url);
        setKeywords(response.data.keywords);
        setRecordId(response.data.id)
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (keywords) {
      const keyword_array = keywords.split(',');
      const requests = keyword_array.map((keyword) => {
        return new Promise((resolve) => {
          axios.post(`${API_URL}/api/get_products`, {
            keyword: keyword.trim(),
            id: recordId,
          })
            .then((response) => resolve(response))
            .catch((error) => resolve({ error }));
        });
      });

      Promise.all(requests)
        .then((responses) => {
          const product_list = responses.flatMap((response) => {
            if (response.error) {
              console.log(response.error);
              return [];
            }
            return response.data;
          });
          setProducts(product_list);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [keywords, recordId]);




  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImageURl(URL.createObjectURL(file));
    setSelectedImage(file);
  };

  const HandleBtn = (index, name) => {
    setClickedButtonIndex(index);
    setSelectedStyle(name);
  };
  const HandleGender = (index, gendername) => {
    setClickedButtonGender(index);
    setSelectedGender(gendername);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="data_container py-3 py-lg-5">
      {isLoading && <Loader />}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-white mb-5"></h2>

            <form onSubmit={handleSubmit}>
              <div className="form_container d-flex flex-column justify-content-center align-items-center">
                {/*  Click to Image for Upload.... */}
                <div className="imageUploader_container w-100">
                  <label
                    htmlFor="upload"
                    className="upload-button mb-5 btn_form border-dashed"
                  >
                    Click to upload a photo
                    <input
                      type="file"
                      id="upload"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <div className="Image_Selected_Result mb-5">
                  {selectedImageURL && (
                    <div className="image-select-img">
                      <img
                        src={selectedImageURL}
                        alt="Uploaded"
                        className="img-fluid rounded"
                      />
                    </div>
                  )}
                </div>

                <div className="SelectStyle_container">
                  <h3 className="text-white">Select Your Style</h3>

                  {/* SearchBar...... */}
                  {/* <div className="search_container d-flex flex-row justify-content-center align-items-center mb-5 btn_form">
                    <img
                      src={search_vector}
                      alt="search"
                      className="img-fluid"
                    />
                    <Form.Group>
                      <Form.Control
                        type="search"
                        icon="search"
                        placeholder={
                          selectedStyle ? selectedStyle.name : "find style"
                        }
                      />
                    </Form.Group>
                  </div> */}

                  {/* SearchBar options..... */}
                  <div className="button_container mb-4 d-flex justify-content-center gap-2 flex-wrap">
                    {style.map((item, index) => {
                      const btnClasses = `styleBtn${clickedButtonIndex === index ? " active" : ""
                        }`;

                      return (
                        <button
                          onClick={() => HandleBtn(index, item)}
                          key={index}
                          className={btnClasses}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* About..... */}
                <div className="AboutYou_container">
                  <h3 className="text-white">About You</h3>
                  <div
                    className="button_container mb-3 d-flex justify-content-center gap-2"
                    style={{ width: "100%" }}
                  >
                    <div className="button_container mb-3 d-flex justify-content-center gap-1 flex-wrap">
                      {gender.map((item, index) => {
                        const btnClasses = `stylegender${clickedButtonGender === index ? " active" : ""
                          }`;

                        return (
                          <button
                            onClick={() => HandleGender(index, item)}
                            key={index}
                            className={btnClasses}
                            style={{ width: "150px" }} // Adjust the width as per your requirement
                          >
                            {item.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Height........... */}
                  <div className="height_container btn_form">
                    <Form.Group>
                      <Form.Control
                        type="number"
                        placeholder="Your height"
                        min={0}
                        max={200}
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </Form.Group>
                    <p className="text-white mb-0">cm</p>
                  </div>

                  {/* Weight........... */}
                  <div className="height_container btn_form">
                    <Form.Group>
                      <Form.Control
                        type="number"
                        placeholder="Your weight"
                        min={0}
                        max={200}
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </Form.Group>
                    <p className="text-white mb-0">kg</p>
                  </div>

                  {/* Age........... */}
                  <div className="height_container btn_form">
                    <Form.Group>
                      <Form.Control
                        type="number"
                        placeholder="Your age"
                        min={0}
                        max={100}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </Form.Group>
                    <p className="text-white mb-0">year</p>
                  </div>
                </div>

                {/* Generate Style... */}
                <Button variant="primary" type="submit" onClick={ShownResult}>
                  Generate Style
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* 👇️ Result show on click */}
      {isLoading && <h5>Please wait… the generation can take up to 20 seconds</h5>}
      {generatedImage && (
        <Results image_url={generatedImage}/>
      )}
      {products && (
        <ProductSlider products={products} />
      )}
    </div>
  );
};
