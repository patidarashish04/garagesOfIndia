import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Slider.css";
// import ArrowLeftIcon  from "../assets/left-arrow.png"; 
// import ArrowRightIcon  from "../assets/right-arrow.png";
import { ReactComponent as ArrowLeftIcon } from "../assets/left-arrow.svg";
import { ReactComponent as ArrowRightIcon } from "../assets/right-arrow.svg";

const sliderItems = [
  {
    id: 1,
    title: "Quality Garage Services",
    desc: "Top-notch vehicle care and repair services.",
    img: "https://media.istockphoto.com/id/1589417945/photo/hand-of-mechanic-holding-car-service-and-checking.jpg?s=612x612&w=0&k=20&c=02eGeLsQDyppYAK7k7WwxGUyxgG2a5n43yetegKvIfI=",
    bg: "#f5f5f5",
    button: "Explore Services",
  },
  {
    id: 2,
    title: "Affordable Prices",
    desc: "Get the best value for your money.",
    img: "https://media.istockphoto.com/id/1207296973/photo/vehicle-service-maintenance-handsome-mens-checking-under-car-condition-on-lifter-hoist-in.jpg?s=612x612&w=0&k=20&c=qR9LxUt01sldgysBW2947BcQzR1y_l19T_ueTGzzNyk=",
    bg: "#eef7ff",
    button: "View Products",
  },
  {
    id: 3,
    title: "Trusted Professionals",
    desc: "Expert care for your vehicle.",
    img: "https://media.istockphoto.com/id/1742216288/photo/happy-customer-and-auto-mechanic-using-touchpad-in-a-workshop.jpg?s=612x612&w=0&k=20&c=6QK1eKl6UUFjTLHg4seCEiq0Bv_PzKdXQvH9zLlVjTw=",
    bg: "#fff4e1",
    button: "Contact Us",
  },
  {
    id: 4,
    title: "Book Your Slot",
    desc: "Convenient online booking for all services.",
    img: "https://media.istockphoto.com/id/1222487350/photo/conceptual-hand-writing-showing-book-now-business-photo-showcasing-guaranteed-to-have-place.jpg?s=612x612&w=0&k=20&c=1cszqsVRDO2dVMyOr66rm3ar1FCKhZFg3gZm_PGqy18=",
    bg: "#e5f9e7",
    button: "About Us",
  },
];

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideSize = sliderItems.length - 1;

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slideSize);
    } else {
      setSlideIndex(slideIndex < slideSize ? slideIndex + 1 : 0);
    }
  };

  const linkMap = {
    1: "/services",
    2: "/products",
    3: "/contact",
    4: "/about",
  };

  return (
    <div className="slider">
      <div className="arrow left" onClick={() => handleClick("left")}>
        <ArrowLeftIcon />
      </div>
      <div className="wrapper" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
        {sliderItems.map((item) => (
          <div
            className="slide"
            key={item.id}
            style={{ backgroundColor: item.bg }}
          >
            <div className="img-container">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="info-container">
              <h2 className="title">{item.title}</h2>
              <p className="desc">{item.desc}</p>

              <Link to={linkMap[item.id] || "/default"}>
                <button className="slider-button">{item.button}</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="arrow right" onClick={() => handleClick("right")}>
        <ArrowRightIcon />
      </div>
    </div>
  );
};

export default Slider;
