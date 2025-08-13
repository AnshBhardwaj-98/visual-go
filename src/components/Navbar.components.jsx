import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-white text-2xl font-bold ">
        Visual-<span className="text-fuchsia-500">GO</span>
      </div>
      <div className="text-white text-l font-normal">
        {" "}
        Visualize any Sorting Algorithm here
      </div>
    </div>
  );
};

export default Navbar;
