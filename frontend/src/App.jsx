import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import Navigation from "@/components/Navigation";

//pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import PlayLists from "@/pages/PlayLists";

function App() {

  const token = useSelector(state => state.auth.token);

  return (
    <div className="bg-gray-100 h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home/>}/>
            <Route path="/playlists" element={<PlayLists/>} />
            <Route path="/login" element={<Login /> } />
            <Route path="/register" element={<Register/>} />
          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
