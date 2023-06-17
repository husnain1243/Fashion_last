import { useState } from "react";

import Form from "react-bootstrap/Form";

import "../style/boostrap.css";
import "../style/custom.css";

export const EmailUs = () => {
  const [SenderName, setSenderName] = useState("");
  const [SenderEmail, setSenderEmail] = useState("");
  const [SenderMessage, setSenderMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  
  return (
    <div className="EmailUs-section px-lg-5 py-lg-5 py-5 text-white text-center">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Contact Us</h2>
                    <p>have any questions or queries? We are always here to help you</p>
                </div>
                <div className="col-12 col-md-6 m-auto">
                    <div className="contact_form_container w-100">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4">
                                <Form.Group>
                                    <input
                                    type="text"
                                    className="form-control bg-transparent text-white text-center btn_form btn_form"
                                    id="Inputname"
                                    placeholder="Name(Optional)"
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
                                    id="InputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Email"
                                    value={SenderEmail}
                                    onChange={(e) => setSenderEmail(e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                            <div className="form-group mb-4">
                                <Form.Group>
                                    <input
                                    type="text"
                                    className="form-control bg-transparent text-white text-center btn_form btn_form width"
                                    id="InputMessage"
                                    placeholder="Type Your Message"
                                    value={SenderMessage}
                                    onChange={(e) => setSenderMessage(e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary bg-white text-black w-50 border mb-5"
                                >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
