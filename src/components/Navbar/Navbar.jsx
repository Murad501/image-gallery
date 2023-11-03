
import { ImSpinner9 } from "react-icons/im";
import PropTypes from 'prop-types'
const Navbar = ({
  selectedImages,
  setSelectedImages,
  handleDeleteImages,
  isDeletingImage,
}) => {
  return (
    <nav className="border-b border-slate-400 py-5 px-10 flex justify-between">
      <div>
        {selectedImages.length ? (
          <div className="text-slate-700 font-bold text-lg flex justify-center items-center gap-3">
            <input
              type="checkbox"
              onClick={() => setSelectedImages([])}
              checked={selectedImages.length}
              className={` w-4 h-4 cursor-pointer z-30`}
            />{" "}
            {selectedImages.length}{" "}
            {selectedImages.length > 1 ? "Files" : "File"} Selected
          </div>
        ) : (
          <h3 className="text-slate-700 font-bold text-lg">Gallery</h3>
        )}
      </div>
      <div className="flex items-center">
        {selectedImages.length ? (
          <h3
            onClick={handleDeleteImages}
            className="text-red-600 font-semibold cursor-pointer"
          >
            {isDeletingImage ? (
              <ImSpinner9 className="animate-spin text-2xl mx-7"/>
            ) : (
              <span>Delete {selectedImages.length > 1 ? "files" : "file"}</span>
            )}
          </h3>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  selectedImages: PropTypes.array.isRequired,
  setSelectedImages: PropTypes.func.isRequired,
  handleDeleteImages: PropTypes.func.isRequired,
  isDeletingImage: PropTypes.bool.isRequired,
}

export default Navbar;
