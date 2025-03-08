// servicesData.js


import service1 from "../assets/EssentialServicePackage.jpeg";
import service2 from "../assets/MaxServicePackage.jpeg";
import service3 from "../assets/LuxuryServiceBasic.jpeg";
import service4 from "../assets/LuxuryServicePremium.jpeg";
import service5 from "../assets/BasicWheelCare.jpeg";


export const services = [
    {
      title: "Essential Service Package",
      description: ["Engine oil replacement", "Oil filter replacement"],
      image: service1,
    },
    {
      title: "Max Service Package",
      description: ["Engine oil replacement", "Wheel Alignment/ Balancing"],
      image: service2,
    },
    {
      title: "Luxury Service Basic",
      description: ["Engine oil replacement", "Oil filter replacement"],
      image: service3,
    },
    {
      title: "Luxury Service Premium",
      description: ["Engine oil replacement", "Cabin air filter replacement"],
      image: service4,
    },
    {
      title: "Basic Wheel Care",
      description: ["Wheel Alignment", "Steering Calibration", "Camber adjustment"],
      image: service5,
    },
  ];
  