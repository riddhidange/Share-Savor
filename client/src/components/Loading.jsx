import React from "react";
import loadingLogo from "@/assets/loading.png";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center">
      <div className="animate-spin h-64 w-64 rounded-full transition-all duration-1000">
        <img src={loadingLogo} alt="Loading..." />
      </div>
    </div>
  );
};

export default Loading;
