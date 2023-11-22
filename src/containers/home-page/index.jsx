"use client";
import Image from "next/image";
import React from "react";
import Banner from "../../assets/images/Banner.jpg";
import ProductPage from "../product";

const HomePage = () => {
  return (
    <div>
      {/* <Image alt="Banner" src={Banner} height="100%" width="100%" /> */}
      <ProductPage />
    </div>
  );
};

export default HomePage;
