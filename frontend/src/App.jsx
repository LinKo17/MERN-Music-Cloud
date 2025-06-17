import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Navigation from "@/components/Navigation";

//pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";

function App() {
  return (
    <div className="bg-gray-100 h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home/>}/>
            <Route path="/store" element={<h1>Store</h1>} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
