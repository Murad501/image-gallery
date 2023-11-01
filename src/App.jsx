import Gallery from "./components/Gallery/Gallery";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <main className="bg-slate-100 min-h-screen min-w- p-3">
      <div className="container mx-auto bg-white rounded-md shadow-sm">
        <Navbar />
        <Gallery/>
      </div>
    </main>
  );
}

export default App;
