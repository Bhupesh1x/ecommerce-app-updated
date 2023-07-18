import React from "react";
import { faqData } from "../static/data";
import Header from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer.jsx";
import Faq from "../components/HomePage/Faq";

function FaqPage() {
  return (
    <>
      <Header />
      <Navbar activeNo={4} />

      <div className="container px-6">
        <p className="text-xl font-semibold my-4">Faq</p>
        {faqData.map(({ id, title, subTitle }) => (
          <Faq key={id} id={id} title={title} subTitle={subTitle} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default FaqPage;
