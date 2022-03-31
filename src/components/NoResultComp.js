import React from "react";

const NoResultComp = (props) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <img src="rotation.gif" width={700} height={500} alt="" />
      <h1
        style={{
          position: "absolue",
          fontSize: "60px",
          bottom: "15px",
          color: "gray",
        }}
      >
        No {props.title} Found !
      </h1>
    </div>
  );
};

export default NoResultComp;
