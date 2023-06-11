import "../style/boostrap.css";
import "../style/custom.css";

import { ContactForm } from "../components/ContactForm";

export const Subscribe = () => {
  return (
    <div className="subscribe_container mb-2 py-3 py-lg-5 ">
      <div className="container d-flex flex-column align-items-center">
        <h2 className="text-white pt-4 mb-4">Subscribe</h2>
        <p className="text-white mb-5">
          Stat up to date with our monthly newsletter to be the 1st one to
          experience the new and beta features
        </p>

        <ContactForm />
      </div>
    </div>
  );
};
