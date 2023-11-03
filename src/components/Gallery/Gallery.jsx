import { useState } from "react";
import AddImage from "../AddImage/AddImage";
import PropTypes from "prop-types";
import "./Gallery.css";

const Gallery = ({
  selectedImages,
  setSelectedImages,
  isDeletingImage,
  images,
  setImages,
}) => {
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
              <div className="relative z-0 h-full">
                {draggedOverIndex === idx ? (
                  ""
                ) : (
                  <img
                    src={image.src}
                    alt=""
                    className={`w-full h-full object-cover ${
                      selectedImages.includes(image.id) &&
                      isDeletingImage &&
                      "shake-animation"
                    }`}
                  />
                )}
              </div>
              {/* image selection checkbox */}
              <input
                type="checkbox"
                checked={selectedImages.includes(image.id)}
                onClick={() =>
                  selectedImages.includes(image.id)
                    ? setSelectedImages(
                        selectedImages.filter((id) => id !== image.id)
                      )
                    : setSelectedImages([...selectedImages, image.id])
                }
                className={`absolute top-3 left-3 w-4 h-4 cursor-pointer z-30 ${
                  (isHover && hoverIndex === idx) ||
                  selectedImages.includes(image.id)
                    ? "block"
                    : "hidden"
                }`}
              />
              {/* hover background black color with animation */}
              <div>
                <div
                  onMouseLeave={() => setIsHover(false)}
                  className={`absolute inset-0  z-20 bg-black opacity-30 ${
                    hoverIndex === idx && isHover && !draggedIndex
                      ? "block enter-left-animation"
                      : "hidden"
                  }`}
                >
                  {" "}
                </div>
                <div
                  onMouseLeave={() => setIsHover(false)}
                  className={`absolute inset-0  z-20 bg-black opacity-30 ${
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
        <AddImage setImages={setImages} images={images} />
      </div>
    </section>
  );
};

// props validation
Gallery.propTypes = {
  setImages: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  selectedImages: PropTypes.array.isRequired,
  isDeletingImage: PropTypes.bool.isRequired,
  setSelectedImages: PropTypes.func.isRequired,
};

export default Gallery;
