import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// components
import Navigation from "@/components/Navigation";

//pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";

function App() {
  const token = useSelector(state => state.auth.token);
  return (
    <div className="bg-gray-100 h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={token ?  <Home/> : <Navigate to="/login"/> }/>
            <Route path="/store" element={<h1>Store</h1>} />

            <Route path="/login" element={ token ? <Navigate to="/"/> : <Login /> } />
            <Route path="/register" element={token ? <Navigate to="/"/> : <Register/>} />
          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
