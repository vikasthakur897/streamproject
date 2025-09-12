import React from "react";

import "./page-header.scss";

import bg from "../../assets/footer-bg.jpg";

const PageHeader = (props) => {
  return (
    <div
  className="relative w-full h-64 flex items-center justify-center bg-cover bg-center rounded-2xl shadow-lg overflow-hidden"
  style={{ backgroundImage: `url(${bg})` }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Heading */}
  <h2 className="relative text-4xl md:text-5xl font-bold text-white drop-shadow-lg tracking-wide">
    {props.children}
  </h2>
</div>

  );
};

export default PageHeader;
