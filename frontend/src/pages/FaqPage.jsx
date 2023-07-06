import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Faq from "../components/Faq.jsx";
import { faqData } from "../static/data";

function FaqPage() {
  return (
    <>
      <Header />
      <Navbar activeNo={4} />

      <div className="container px-6">
        <p className="text-xl font-semibold my-4">Faq</p>
        {faqData.map(({ id, title, subTitle }) => (
          <Faq id={id} title={title} subTitle={subTitle} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default FaqPage;
