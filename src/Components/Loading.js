import React from "react";
import loadingGif from "../image/loading-arrow.gif";
const Loading = (props) => {
  return (
    <div className="text-center pt-5">
      <h4>{props.title}</h4>
      <img src={loadingGif} alt="" />
    </div>
  );
};

export default Loading;