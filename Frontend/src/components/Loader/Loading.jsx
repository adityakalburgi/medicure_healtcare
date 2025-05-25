import React from "react";
import { DNA } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <DNA 
        visible={true} 
        height="100" 
        width="100" 
        ariaLabel="dna-loading"
        wrapperStyle={{background: "transparent"}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};


export default Loading;
