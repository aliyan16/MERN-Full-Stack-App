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
      <div className="flex flex-col h-screen">
        <Header/>
        <div className="flex flex-1 overflow-hidden">
          <LeftSideBar/>
          <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
            <Routes>
              <Route path="/" element={<SigninPage/>} />
              <Route path="/home" element={<HomePage/>} />
              <Route path="/registration" element={<RegistrationPage/>} />
              <Route path="/profile" element={<ProfilePage/>} />
              <Route path="/setting" element={<SettingsPage/>} />
            </Routes>
          </div>
          <RightSideBar/>
        </div>
      </div>
    </Router>
    </>
  );
}

export default App;
