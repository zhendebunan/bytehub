import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/bytehub' element={<LoginPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;