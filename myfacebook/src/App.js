import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ProfilePage from "./pages/profilepage";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
