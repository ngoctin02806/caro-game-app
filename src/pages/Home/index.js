import React from "react";

import "./styles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "./Banner";

const Home = (props) => {
  return (
    <div className="home-root">
      <Header />
      <Banner />
      <Footer />
    </div>
  );
};

export default Home;
