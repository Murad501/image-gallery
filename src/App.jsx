import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";

import image1 from "./assets/images/image-1.webp";
import image2 from "./assets/images/image-2.webp";
import image3 from "./assets/images/image-3.webp";
import image4 from "./assets/images/image-4.webp";
import image5 from "./assets/images/image-5.webp";
import image6 from "./assets/images/image-6.webp";
import image7 from "./assets/images/image-7.webp";
import image8 from "./assets/images/image-8.webp";
import image9 from "./assets/images/image-9.webp";
import image10 from "./assets/images/image-10.jpeg";
import image11 from "./assets/images/image-11.jpeg";
import { Toaster } from "react-hot-toast";
import Gallery from "./components/Gallery/Gallery";

function App() {
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
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  const handleDeleteImages = () => {
    setIsDeletingImage(true);
    setTimeout(() => {
      setImages(images.filter((image) => !selectedImages.includes(image.id)));
      setSelectedImages([]);
      setIsDeletingImage(false);
    }, 800);
  };

  return (
    <>
      <main className="bg-slate-100 min-h-screen min-w- p-3">
        <div className="container mx-auto bg-white rounded-md shadow-sm">
          <Navbar
            handleDeleteImages={handleDeleteImages}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            isDeletingImage={isDeletingImage}
          />
          <Gallery
            images={images}
            setImages={setImages}
            isDeletingImage={isDeletingImage}
            setSelectedImages={setSelectedImages}
            selectedImages={selectedImages}
          />
        </div>
      </main>
      <Toaster />
    </>
  );
}

export default App;
