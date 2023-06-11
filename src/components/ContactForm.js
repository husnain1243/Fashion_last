import { useState } from "react";

import Form from "react-bootstrap/Form";

import "../style/boostrap.css";
import "../style/custom.css";
import axios from "axios";

export const ContactForm = () => {
  const [SenderName, setSenderName] = useState("");
  const [SenderEmail, setSenderEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/endpoint", {
        SenderName: SenderName,
        SenderEmail: SenderEmail,
      })
      .then(() => {
        console.log("user info sent to backend..");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="contact_form_container w-100">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <Form.Group>
            <input
              type="text"
              className="form-control bg-transparent text-white text-center btn_form"
              id="exampleInputname"
              placeholder="Name"
              value={SenderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="form-group mb-4">
          <Form.Group>
            <input
              type="email"
              className="form-control bg-transparent text-white text-center btn_form"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              value={SenderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
            />
          </Form.Group>
        </div>
        <button
          type="submit"
          className="btn btn-primary bg-white text-black w-50 border mb-5"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};
