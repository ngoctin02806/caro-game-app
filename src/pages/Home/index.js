import React, { useEffect } from "react";

import "./styles.css";
import Banner from "./Banner";

const Home = (props) => {
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  return (
    <div className="home-root">
      <Banner />
    </div>
  );
};

export default Home;
