import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Album from "./pages/album";
import Layout from "./components/layout";
// import { useQuery } from "@tanstack/react-query";
import { fetchTokens } from "./api";
import { useEffect } from "react";

function App() {
  useEffect(()=>{
    const tokens = fetchTokens()
    sessionStorage.setItem("tokens", JSON.stringify(tokens));
  },[])
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/album/:albumType" element={<Album />} />
      </Route>
    </Routes>
  );
}

export default App;
