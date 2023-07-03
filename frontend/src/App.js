import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, SignUp } from "./Routes.js";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-gray-200">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
