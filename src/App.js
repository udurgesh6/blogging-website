import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddBlog from "./AddBlog";
import Navbar from "./Navbar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addblog" element={<AddBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
