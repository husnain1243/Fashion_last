import { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import search_vector from "../images/search-vector.png";
import { Results } from "../components/Result";
import "../style/boostrap.css";
import "../style/custom.css";

import axios from "axios";
import { API_URL } from "../utils/constants";
import toast from 'react-hot-toast';
import ProductSlider from "../components/ProductSlider";
import Loader from "../components/Loader";

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
  },
  {
    name: "Hipster"
  },
  {
    name: "Festival"
  }
];

const gender = [
  {
    name: "Male",
  },
  {
    name: "Female",
  },
  {
    name: "Other",
  },
];


export const UserData = ({languageData}) => {
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
  const [description, setDescription] = useState(null);
  const [input_image_url, setInput_image_url] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);


  const handleError = (error) => {
    console.error("An error occurred:", error);
    toast.error(error); // Show error toast notification
  };


  const ShownResult = async (event) => {
    event.preventDefault();
    setIsLoadingImage(true);
    setIsLoadingProducts(true);
    setGeneratedImage(null);
    setProducts(null);
    try {
      const formData = new FormData();
      formData.append("style", selectedStyle.name);
      formData.append("gender", selectedGender.name);
      formData.append("age", age);
      formData.append("height", height);
      formData.append("weight", weight);

      const chatGptResponse = await axios.post(`${API_URL}/api/get_chatgpt_response`, formData);
      const { keywords, description } = chatGptResponse.data;

      setKeywords(keywords);
      setDescription(description);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    const getLeonardoResponse = async () => {
      if (description) {
        try {
          const formData = new FormData();
          formData.append("image", selectedImage);
          formData.append("description", description);

          const leonardoResponse = await axios.post(`${API_URL}/api/get_leonardo_response`, formData);
          const { input_image_url, generated_image_url } = leonardoResponse.data;

          setInput_image_url(input_image_url);
          setGeneratedImage(generated_image_url);
          setIsLoadingImage(false);
        } catch (error) {
          setIsLoadingImage(false);
          handleError(error);
        }
      }
    };

    getLeonardoResponse();
  }, [description]);

  useEffect(() => {
    const submitImageDetails = async () => {
      if (generatedImage) {
        try {
          const formData = new FormData();
          formData.append("input_image_url", input_image_url);
          formData.append("style", selectedStyle.name);
          formData.append("gender", selectedGender.name);
          formData.append("age", age);
          formData.append("height", height);
          formData.append("weight", weight);
          formData.append("description", description);
          formData.append("keywords", keywords);
          formData.append("generated_image_url", generatedImage);
          const response = await axios.post(`${API_URL}/api/submit_image_details`, formData);
          const { record_id } = response.data;

          setRecordId(record_id);
        } catch (error) {
          handleError(error);
        }
      }
    };

    submitImageDetails();
  }, [generatedImage]);


  useEffect(() => {
    const getProducts = async () => {
      if (keywords) {
        try {
          const keywordArray = keywords.split(',');
          const requests = keywordArray.map((keyword) => {
            return axios.post(`${API_URL}/api/get_products`, {
              keyword: keyword.trim(),
            });
          });

          const responses = await Promise.all(requests);
          const product_list = responses.flatMap((response) => {
            if (response.error) {
              console.log(response.error);
              return [];
            }
            return response.data;
          });

          setProducts(product_list);
          setIsLoadingProducts(false);
        } catch (error) {
          setIsLoadingProducts(false);
          handleError(error);
        }
      }
    };

    getProducts();
  }, [keywords]);


  useEffect(() => {
    const saveProducts = async () => {
      if (products && recordId) {
        try {
          const saveData = {
            products: products,
            id: recordId,
          };

          const response = await axios.post(`${API_URL}/api/save_products`, saveData);
          console.log(response.data.message);
        } catch (error) {
          handleError(error);
        }
      }
    };

    saveProducts();
  }, [products, recordId]);


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
      {/* {isLoading && <Loader />} */}
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
                    {languageData.upload_photo_title}
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
                  <h3 className="text-white">{languageData.style_title}</h3>

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
                  <h3 className="text-white">{languageData.about_you_title}</h3>
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
                        placeholder={languageData.height_title}
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
                        placeholder={languageData.weight_title}
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
                        placeholder={languageData.age_title}
                        min={0}
                        max={100}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </Form.Group>
                    <p className="text-white mb-0">years</p>
                  </div>
                </div>

                {/* Generate Style... */}
                <Button variant="primary" type="submit" onClick={ShownResult}>
                {languageData.generate_button_title}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* 👇️ Result show on click */}
      {/* {isLoading && <h5>Please wait… the generation can take up to 20 seconds</h5>} */}
      <div>
        {isLoadingImage && <Loader />}
        {generatedImage && <Results image_url={generatedImage} />}

        {isLoadingProducts && <Loader />}
        {products && <ProductSlider products={products} />}
      </div>
    </div>
  );
};
