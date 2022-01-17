import React from "react";
import './BaiTapTailWindCss.css';
export default function BaiTapTailWind() {
  return (
    <div className="container">
      <h1 className="text-green-400 text-center text-2xl">
        Welcome to the cybersoft frontend with tailwindcss
      </h1>
      <div className="flex justify-center mt-2">

        <div className="card__background">
          <div className="top__content">
            <p className="card__title">Category</p>
            <h4 className="font-bold">Cybersoft FrontEnd Developer</h4>
            <p>
              lorem ipsum dolor sit amet adiplorem ipsum dolor sit
              amet, ipsum dolor sit amet, consectetur adip
            </p>
          </div>
          <div className="bottom__content ">
                <p className="font-bold">1BTC</p>
                <button className="card__button">Register</button>
          </div>
        </div>

        <div className="card__background">
          <div className="top__content">
            <p className="card__title">Category</p>
            <h4 className="font-bold">Cybersoft FrontEnd Developer</h4>
            <p>
              lorem ipsum dolor sit amet adiplorem ipsum dolor sit
              amet, ipsum dolor sit amet, consectetur adip
            </p>
          </div>
          <div className="bottom__content ">
                <p className="font-bold">$Free</p>
                <button className="card__button">Register</button>
          </div>
        </div>

        <div className="card__background">
          <div className="top__content">
            <p className="card__title">Category</p>
            <h4 className="font-bold">Cybersoft FrontEnd Developer</h4>
            <p>
              lorem ipsum dolor sit amet adiplorem ipsum dolor sit
              amet, ipsum dolor sit amet, consectetur adip
            </p>
          </div>
          <div className="bottom__content ">
                <p className="font-bold">Free</p>
                <button className="card__button">Register</button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
