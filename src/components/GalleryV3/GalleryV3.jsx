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
import { useState } from "react";
import "./Gallery.css";

const GalleryV3 = ({ selectedIndex, setSelectedIndex, isDeletingImage }) => {
  const [images, setImages] = useState([
    {
      id: 1,
      src: image1,
    },
    {
      id: 2,
      src: image2,
    },
    {
      id: 3,
      src: image3,
    },
    {
      id: 4,
      src: image4,
    },
    {
      id: 5,
      src: image5,
    },
    {
      id: 6,
      src: image6,
    },
    {
      id: 7,
      src: image7,
    },
    {
      id: 8,
      src: image8,
    },
    {
      id: 9,
      src: image9,
    },
    {
      id: 10,
      src: image10,
    },
    {
      id: 11,
      src: image11,
    },
  ]);
  const [isHover, setIsHover] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  // Handle the start of a drag operation
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  // Handle when an image is dragged over another
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

  // Handle the drop event
  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedOverIndex(null);
    setDraggedIndex(null);
  };

  // Handle when the drag operation leaves the element
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
          >
            <div
              onMouseOver={() => {
                setIsHover(true), setHoverIndex(idx);
              }}
              onMouseLeave={() => setIsHover(false)}
              className={` border-2 border-slate-300 w-full h-full rounded-md overflow-hidden`}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragStart={(e) => handleDragStart(e, idx)}
              onDrop={(e) => handleDrop(e)}
              draggable
            >
              <div className="relative z-0">
                {draggedOverIndex === idx ? (
                  ""
                ) : (
                  <img
                    src={image.src}
                    alt=""
                    className={`${
                      selectedIndex.includes(idx) &&
                      isDeletingImage &&
                      "shake-animation"
                    }`}
                  />
                )}
              </div>
              {/* image selection checkbox */}
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
                  (isHover && hoverIndex === idx) || selectedIndex.includes(idx)
                    ? "block"
                    : "hidden"
                }`}
              />
              {/* hover background black color with animation */}
              <div>
                <div
                  onMouseLeave={() => setIsHover(false)}
                  className={`absolute inset-0 cursor-pointer z-20 bg-black opacity-30 ${
                    hoverIndex === idx && isHover && !draggedIndex
                      ? "block enter-left-animation"
                      : "hidden"
                  }`}
                >
                  {" "}
                </div>
                <div
                  onMouseLeave={() => setIsHover(false)}
                  className={`absolute inset-0 cursor-pointer z-20 bg-black opacity-30 ${
                    hoverIndex === idx && isHover && !draggedIndex
                      ? "block enter-right-animation"
                      : "hidden"
                  }`}
                >
                  {" "}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GalleryV3;
