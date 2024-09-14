import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Spinner from "./components/Spinner";
// import { useSelector } from "react-redux";

 
function App() {
  // const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {/* {loading && <Spinner />} */}
      <BrowserRouter>
        <Routes>
          {/* <Route
            path="/"
            element={

                <Home />
            }
          /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
 
export default App;