import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Album from "./pages/album";
import Layout from "./components/layout";

function App() {
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
