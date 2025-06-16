import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ProfilePage from "./pages/profilepage";
import SigninPage from "./pages/Signin";
import RegistrationPage from "./pages/Registraion";
import SettingsPage from "./pages/settings";
import Header from "./components/Header";
import LeftSideBar from './components/LeftsideBar';
import RightSideBar from './components/RightsideBar';
function App() {
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<SigninPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/registration" element={<RegistrationPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/setting" element={<SettingsPage/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
