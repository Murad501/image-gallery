const Navbar = () => {
  return (
    <nav className="border-b border-slate-400 py-5 px-10 flex justify-between">
      <div>
        <h3 className="text-slate-700 font-bold text-lg">Gallery</h3>
      </div>
      <div>
        <h3 className="text-red-600 font-semibold">Delete file</h3>
      </div>
    </nav>
  );
};

export default Navbar;
