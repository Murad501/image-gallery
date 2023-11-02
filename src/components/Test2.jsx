import { useState } from "react";

const ColorChangingDiv = () => {
  const [bgColor, setBgColor] = useState("");


  const handleMouseEnter = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rightThreshold = rect.width - 20;

    if (x <= 20) {
      setBgColor("bg-red-500");
    } else if (x >= rightThreshold) {
      setBgColor("bg-blue-500");
    } else if (y <= 20) {
      setBgColor("bg-green-500");
    } else if (y >= rect.height - 20) {
      setBgColor("bg-sky-500");
    }
  };

  const handleMouseLeave = () => {
    setBgColor("");
  };

  console.log(bgColor);

  return (
    <div
      className={`w-64 h-64 flex items-center justify-center relative border`}
      onMouseEnter={handleMouseEnter} // Remove the arrow function here
      onMouseLeave={handleMouseLeave} // Remove the arrow function here
    >
      <div
        className={`absolute inset-0 ${bgColor}`}
        onMouseEnter={handleMouseEnter} // Remove the arrow function here
      ></div>
    </div>
  );
};

export default ColorChangingDiv;
