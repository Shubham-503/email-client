import React from "react";
import "./ShimmerEmailActive.css";

const ShimmerEmailActive = () => {
  return (
    <div className={`shimmer emailActive `}>
      <div className="emailActive-top">
        <div className="user__container">
          <span className="avatar"></span>
          <div className="user__details">
            <h1 className="user__name shine"> </h1>
            <p className="user__date shine"> </p>
          </div>
        </div>
      </div>
      <div className="emailActive-bottom">
        <p className="email__body shine"></p>
      </div>
    </div>
  );
};

export default ShimmerEmailActive;
