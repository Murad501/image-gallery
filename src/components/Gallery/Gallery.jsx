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

// const Gallery = () => {
//   const images = [
//     image1,
//     image2,
//     image3,
//     image4,
//     image5,
//     image6,
//     image7,
//     image8,
//     image9,
//     image10,
//     image11,
//   ];
//   return (
//     <section className="p-10">
//       <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2  md:gap-5">
//         {images.map((image, idx) => (
//           <div
//             key={idx}
//             className={`${
//               idx === 0 && "col-span-2 row-span-2"
//             } border-2 border-slate-300 w-full h-full rounded-md overflow-hidden cursor-pointer`}
//           >
//             {" "}
//             <img src={image} alt="" />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

const Gallery = () => {
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

  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      const newImages = [...images];
      const [draggedImage] = newImages.splice(draggedIndex, 1);
      newImages.splice(index, 0, draggedImage);
      setImages(newImages);
    }
  };

  return (
    <section className="p-10">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-5">
        {images.map((image, idx) => (
          <div
            key={idx}
            className={`${
              idx === 0 && "col-span-2 row-span-2"
            } border-2 border-slate-300 w-full h-full rounded-md overflow-hidden cursor-pointer`}
            onDragOver={(e) => handleDragOver(e)}
            onDragStart={(e) => handleDragStart(e, idx)}
            onDrop={(e) => handleDrop(e, idx)}
            draggable
          >
            <img src={image} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
