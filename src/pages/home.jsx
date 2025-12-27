import React from "react";              // ✅ ADD THIS
import ModelShowcase from "../components/ModelShowcase";
import Latest from "../components/Latest";
import Bestseller from "../components/Bestseller";

import Ourpolicy from "../components/Ourpolicy.jsx";
import Faq from "../components/Faq.jsx";
import Insta from "../components/Insta.jsx";
import Newsletterbox from "../components/Newsletterbox.jsx";
import Footer from "../components/Footer.jsx";


const Home = () => {
  return (
    <>
      <ModelShowcase />
      <Latest />
      <Bestseller/>
      <Ourpolicy/>
      <Faq/>
      <Insta/>
      <Newsletterbox/>
      
    </>
  );
};

export default Home;
