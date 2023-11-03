import { BiImage } from "react-icons/bi";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner10 } from "react-icons/im";
import PropTypes from "prop-types";

const AddImage = ({ setImages, images }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const handleImageUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      setIsUploading(true);
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=b608ecd30e3346e2fe1d8e4c41f0408f",
          formData
        );

        if (response.data && response.data.data) {
          const imageUrl = response.data.data.url;

          const imagesIds = images.map((image) => image.id);
          const largestId = Math.max(...imagesIds);

          setImages([...images, { id: largestId + 1, src: imageUrl }]);

          setIsUploading(false);
        }
        setIsUploading(false);
      } catch (error) {
        toast.error("Image upload failed:");
        setIsUploading(false);
      }
    }
  };

  return (
    <label htmlFor="fileInput" className="cursor-pointer">
      <div
        className={`border-2 border-dashed border-slate-300 w-full h-full py-10 rounded-md flex justify-center items-center ${
          isUploading ? "cursor-wait" : "cursor-pointer"
        }`}
      >
        {isUploading ? (
          <ImSpinner10 className="animate-spin text-5xl text-slate-500" />
        ) : (
          <div className="grid grid-cols-1 gap-5 cursor-pointer">
            <BiImage className="mx-auto text-5xl " />
            <p className="font-semibold text-slate-700 text-xl ">Add Images</p>
            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageUpload}
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </label>
  );
};

AddImage.propTypes = {
  setImages: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};

export default AddImage;
