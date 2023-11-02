import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import GalleryV3 from "./components/GalleryV3/GalleryV3";

function App() {
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  const handleDeleteImages = () => {
    setIsDeletingImage(true);
    setTimeout(() => {
      setIsDeletingImage(false);
    }, 1000);
  };

  return (
    <main className="bg-slate-100 min-h-screen min-w- p-3">
      <div className="container mx-auto bg-white rounded-md shadow-sm">
        <Navbar
          handleDeleteImages={handleDeleteImages}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <GalleryV3
          isDeletingImage={isDeletingImage}
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      </div>
    </main>
  );
}

export default App;
