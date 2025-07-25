import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";

function App() {
  return (

      <Routes>
        <Route path='/bytehub' element={<LoginPage />} />
      </Routes>

  );
}

export default App;