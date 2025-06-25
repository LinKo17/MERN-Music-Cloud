import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
            <Route index element={ token ? <Home/> : <Navigate to="/login"/>}/>
            <Route path="/playlists" element={token ? <PlayLists/>  : <Navigate to="/login"/>} />
            <Route path="/login" element={!token ? <Login/> : <Navigate to="/"/> } />
            <Route path="/register" element={!token ? <Register/> : <Navigate to="/"/>} />
          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
