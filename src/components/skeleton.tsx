import React from "react";

const Skeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full min-h-[500px] my-3 bg-gray-300 rounded-md"></div>
      <div className="h-6 bg-gray-300 rounded mt-2"></div>
      <div className="h-6 bg-gray-300 rounded mt-2"></div>
      <div className="h-6 bg-gray-300 rounded mt-2"></div>
    </div>
  );
};

export default Skeleton;
