import { Nav } from "./components/Navbar/Nav";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home/Home";
import Articles from "./components/Articles/Articles"

function App() {
  return (
    <>

      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
