import React from "react";
import "../styling/HomePage.css";

const Hero = () => (
  <div className="hero">
    <h1>Welcome to ShopEase</h1>
    <p>
      Discover the best products that will help you to satisfy your desires.
    </p>
    <div className="hero-video">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/M-UKkAZJNpE"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

const About = () => (
  <div className="about">
    <h2>About Us</h2>
    <p>
      We are a 3-year-old company dedicated to providing products that make a
      difference in people's lives. Our mission is to empower and improve the
      daily lives of our customers through innovative and high-quality products,
      and we believe in putting the customer first, sustainability, and
      continuous improvement.
    </p>
  </div>
);

const ProductCategories = () => (
  <div className="product-categories">
    <h2>Top favorite categories</h2>
    <ul>
      <li>
        <a href="#">Electronics</a>
      </li>
      <li>
        <a href="#">Food</a>
      </li>
      <li>
        <a href="#">Books</a>
      </li>
    </ul>
  </div>
);

const CustomerTestimonials = () => (
  <div className="customer-testimonials">
    <h2>What Our Customers Are Saying</h2>
    <blockquote>
      <p>
        "I love ShopEase! Their products are top-notch and their customer
        service is second to none."
      </p>
      <cite>- Happy Customer</cite>
    </blockquote>
    <blockquote>
      <p>"ShopEase has changed my life. I can't imagine going back to olx."</p>
      <cite>- Satisfied Customer</cite>
    </blockquote>
  </div>
);

const CTA = () => (
  <div className="cta">
    <h2>Join Our Community</h2>
    <p>
      Get the latest news, exclusive offers, and tips for [achieving a goal or
      solving a problem].
    </p>
    {/* <form action="#" method="post"> */}
    <form>
      <input type="email" placeholder="Your email address" />
      <button type="submit" id="submit_cta">
        Sign up
      </button>
    </form>
  </div>
);

const ContactInfo = () => (
  <div className="contact-info">
    <h2>Contact Us</h2>
    <p>Have a question or need help? We're here for you.</p>
    <p>Phone: (910) 974-7863</p>
    <p>
      Email: <a href="mailto:[email address]">shop-ease@support.com</a>
    </p>
    {/* <p>Follow us on [social media links]</p> */}
  </div>
);

export const Home = () => (
  <>
    <Hero />
    <About />
    <ProductCategories />
    <CustomerTestimonials />
    <CTA />
    <ContactInfo />
  </>
);
