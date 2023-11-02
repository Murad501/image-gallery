/* eslint-disable react/prop-types */
const Navbar = ({ selectedIndex, setSelectedIndex, handleDeleteImages }) => {

  return (
    <nav className="border-b border-slate-400 py-5 px-10 flex justify-between">
      <div>
        {selectedIndex.length ? (
          <div className="text-slate-700 font-bold text-lg flex justify-center items-center gap-3">
            <input
              type="checkbox"
              onClick={()=>setSelectedIndex([])}
              checked={selectedIndex.length}
              className={` w-4 h-4 cursor-pointer z-30`}
            />{" "}
            {selectedIndex.length} {selectedIndex.length > 1 ? "Files" : "File"}{" "}
            Selected
          </div>
        ) : (
          <h3 className="text-slate-700 font-bold text-lg">Gallery</h3>
        )}
      </div>
      <div>
        {selectedIndex.length ? (
          <h3 onClick={handleDeleteImages} className="text-red-600 font-semibold cursor-pointer">
            Delete {selectedIndex.length > 1 ? "files" : "file"}
          </h3>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
