/* eslint-disable react/prop-types */
import image1 from "../../assets/images/image-1.webp";
import image2 from "../../assets/images/image-2.webp";
import image3 from "../../assets/images/image-3.webp";
import image4 from "../../assets/images/image-4.webp";
import image5 from "../../assets/images/image-5.webp";
import image6 from "../../assets/images/image-6.webp";
import image7 from "../../assets/images/image-7.webp";
import image8 from "../../assets/images/image-8.webp";
import image9 from "../../assets/images/image-9.webp";
import image10 from "../../assets/images/image-10.jpeg";
import image11 from "../../assets/images/image-11.jpeg";
import { useEffect, useState } from "react";

const GalleryV2 = ({ selectedIndex, setSelectedIndex }) => {
  const [images, setImages] = useState([
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
  ]);
  const [isHover, setIsHover] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - startPosition.x;
        const dy = e.clientY - startPosition.y;

        const newPosition = {
          x: position.x + dx,
          y: position.y + dy,
        };

        setPosition(newPosition);
        setStartPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setStartPosition(null);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, position, startPosition]);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent text selection

    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      const newImages = [...images];
      const [draggedImage] = newImages.splice(draggedIndex, 1);
      newImages.splice(index, 0, draggedImage);
      setImages(newImages);
      setDraggedIndex(index);
      setDraggedOverIndex(index);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedOverIndex(null);
    setDraggedIndex(null);
  };

  const handleDragLeave = () => {
    setDraggedOverIndex(null);
  };

  return (
    <section onDragLeave={handleDragLeave} className="p-10">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-5">
        {images.map((image, idx) => (
          <div
            key={idx}
            className={`relative overflow-hidden ${
              idx === 0 && "col-span-2 row-span-2"
            }`}
            onMouseDown={handleMouseDown}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              position: idx === draggedIndex && "absolute",
            }}
          >
            <div
              onMouseOver={() => {
                setIsHover(true), setHoverIndex(idx);
              }}
              className={` border-2 border-slate-300 w-full h-full rounded-md overflow-hidden`}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragStart={(e) => handleDragStart(e, idx)}
              onDrop={(e) => handleDrop(e)}
              draggable
            >
              <div className="relative z-0">
                {draggedOverIndex === idx ? "" : <img src={image} alt="" />}
              </div>
              <input
                type="checkbox"
                checked={selectedIndex.includes(idx)}
                onClick={() =>
                  selectedIndex.includes(idx)
                    ? setSelectedIndex(
                        selectedIndex.filter((index) => index !== idx)
                      )
                    : setSelectedIndex([...selectedIndex, idx])
                }
                className={`absolute top-3 left-3 w-4 h-4 cursor-pointer z-30 ${
                  hoverIndex === idx || selectedIndex.includes(idx)
                    ? "block"
                    : "hidden"
                }`}
              />
            </div>
            {isHover ? (
              <div
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => {
                  setIsHover(false), setHoverIndex(null);
                }}
                className={`bg-black opacity-50 absolute z-0  w-full h-full inset-0 overflow-hidden ${
                  hoverIndex === idx ? "block" : "hidden"
                } ${hoverIndex === idx && "hidden"}`}
              ></div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GalleryV2;
