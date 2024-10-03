import React from "react";
import { useNavigate } from "react-router-dom";
import "./OptionsPage.css";

function OptionsPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      
      <div className="box-container">
        <div className="box" onClick={() => navigate("/VaccineStatus")}>
          <img src="./vaccine-49373.png" alt="VaccineStatus" className="image" />
          VaccineInfluent
        </div>
        <div className="box">
          <a href="https://www.rajavithirangsit.go.th/main/" target="_blank" rel="noopener noreferrer">
            <img src="./format.png" alt="format" className="image" />
            Information
          </a>
        </div>
        <div className="box" onClick={() => navigate("/RJchatbot")}>
          <img src="./bot.png" alt="" className="image" />
          RJchatbot
        </div>
      </div>
    </div>
  );
}

export default OptionsPage;
