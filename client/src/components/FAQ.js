import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import '../styles/FAQ.css';

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "Q. How this theme is different from others in the market?",
      answer: "AuraUI provides unique, customizable components designed to simplify the development process and enhance user experience.",
    },
    {
      id: 2,
      question: "Q. Does this theme support plugins?",
      answer: "AuraUI supports various plugins to extend the functionality of your projects, making development faster and easier.",
    },
    {
      id: 3,
      question: "Q. Do you provide any moneyback guarantee for this product?",
      answer: "Yes, we offer a 30-day money-back guarantee if you are not satisfied with AuraUI.",
    },
    {
      id: 4,
      question: "Q. What payment method do you support?",
      answer: "AuraUI supports various payment methods including credit cards, PayPal, and cryptocurrencies.",
    },
    {
      id: 5,
      question: "Q. How do you provide support?",
      answer: "Our team provides extensive documentation and 24/7 support for all products and plugins included in AuraUI.",
    },
  ];

  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently asked questions</h2>
          <p className="faq-subtitle">
            Ask everything you need to know about our products and services.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item" role="region">
              <h3>
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={activeId === faq.id}
                  className="faq-question"
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">
                    {activeId === faq.id ? (
                      <Minus className="icon" />
                    ) : (
                      <Plus className="icon" />
                    )}
                  </span>
                </button>
              </h3>
              {activeId === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="contact-section">
          <div className="contact-content">
            <div className="avatar-group">
              <img
                className="avatar"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Team member 1"
              />
              <img
                className="avatar avatar-center"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Team member 2"
              />
              <img
                className="avatar"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Team member 3"
              />
            </div>

            <h3 className="contact-title">Still have questions?</h3>
            <p className="contact-text">
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <div className="contact-action">
              <button className="contact-button">
                Start free trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
