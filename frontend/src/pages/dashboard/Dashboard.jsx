import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      <div className="header">
        <img className="headerImg" src="images/aathva_brand.jpeg" alt="" />
      </div>

      <div className="super_set">
        <div className="sub_set">Aim</div>
        <div className="sub_set">Team</div>
        <div className="sub_set">About</div>
      </div>

      <div className="header">
        <img className="headerImg" src="images/youtube_brand.jfif" alt="" />
      </div>

      <div className="super_set">
        <div className="sub_set">Aim</div>
        <div className="sub_set">Team</div>
        <div className="sub_set">About</div>
      </div>
    </>
  );
}

export default Dashboard;
