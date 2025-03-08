import React from "react";
import "../styles/ContactSection.css";

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="container">
        {/* Title */}
        <div className="title-section">
          <h2>
            Contact Fourdoor
            <br />
            for Assistance and
            <br />
            Questions
          </h2>
          <div className="title-underline" />
        </div>

        {/* Helpline Numbers */}
        <div className="card">
          <h3>
            Helpline Numbers
            <div className="card-underline" />
          </h3>
          <div className="card-content">
            <p>
              Give us a missed call at{" "}
              <span className="highlight">9888133335</span> and our representatives will call you back shortly
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="card">
          <h3>
            Email
            <div className="card-underline" />
          </h3>
          <div className="card-content">
            <p>
              Email us at:{" "}
              <a href="mailto:fourdoor.support@cars24.com" className="highlight">
                fourdoor.support@cars24.com
              </a>
            </p>
          </div>
        </div>

        {/* Registered Office Address */}
        <div className="card office-address">
          <h3>
            Registered Office Address
            <div className="card-underline" />
          </h3>
          <div className="card-content">
            <p>CARS24 Private Limited</p>
            <p>Tower C, 7th Floor, SAS Towers, Medanta the Medicity,</p>
            <p>Sector 38, Gurugram, Haryana 122001</p>
          </div>
        </div>
      </div>

      {/* Cityscape Background */}
      <div className="cityscape-bg" />
    </section>
  );
}
