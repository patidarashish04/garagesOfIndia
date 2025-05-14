import React from "react";
import "../styles/ServiceSection.css";
import { services } from "./servicesData";

function ServiceSection() {
  return (
    <section className="service-section">
      <h2 id="services" className="text-center font-bold text-2xl my-8">
        Service & Maintenance
      </h2>
      <div className="service-cards">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} className="service-image" />
            <div className="service-content">
              <h3>{service.title}</h3>
              <ul>
                {service.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <a href="/add-car" className="add-car-link">
                More Detail.. →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceSection;
