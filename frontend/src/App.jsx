import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import Navigation from "@/components/Navigation";

//pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import PlayLists from "@/pages/PlayLists";
import Public from "@/pages/Public";
import NotFound from "@/pages/NotFound";

function App() {

  const token = useSelector(state => state.auth.token);

  return (
    <div className="bg-black h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={ token ? <Home/> : <Navigate to="/login"/>}/>
            <Route path="/playlists" element={token ? <PlayLists/>  : <Navigate to="/login"/>} />
            <Route path="/public" element={token ? <Public/>  : <Navigate to="/login"/>} />
            <Route path="/login" element={!token ? <Login/> : <Navigate to="/"/> } />
            <Route path="/register" element={!token ? <Register/> : <Navigate to="/"/>} />
          </Route>

          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
