import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./ScreenTypes/LandingPage/LandingPage";
import MyEventsAdmin from "./ScreenTypes/MyEventsAdmin/MyEventsAdmin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./ScreenTypes/LoginScreen/LoginScreen.js";
import UserRegisterScreen from "./ScreenTypes/RegisterScreen/UserRegisterScreen";
import CreateEventPage from "./ScreenTypes/CreateEventPage.js/CreateEventPage";
import EventPreview from "./ScreenTypes/EventPreview/EventPreview";
import UserProfilePage from "./ScreenTypes/UserProfilePage/UserProfilePage";
import OrganizerRegisterScreen from "./ScreenTypes/RegisterScreen/OrganizerRegisterScreen";
import TransitionPage from "./ScreenTypes/RegisterScreen/TransitionPage";
import StartPage from "./ScreenTypes/UserPage/StartPage";
import UserPage from "./ScreenTypes/UserPage/UserPage";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          {/* 
        Create a route in this syntax. When user navigates through pages, the urls and pages will be 
        rendered based on the input.
      */}
          <Route path="/" element={<StartPage />} />

          <Route path="/landing" element={<LandingPage />} />

          <Route path="/login" element={<LoginScreen />} />

          <Route
            path="/register/userRegister"
            element={<UserRegisterScreen />}
          />

          <Route path="/event-preview/:id" element={<EventPreview />} />

          <Route path="/profile" element={<UserProfilePage />} />

          <Route path="/create-event" element={<CreateEventPage />} />

          <Route path="/events" element={<MyEventsAdmin />} />
          <Route path="/user-events" element={<UserPage />} />
          <Route
            path="/register/organizerRegister"
            element={<OrganizerRegisterScreen />}
          />
          <Route path="/register" element={<TransitionPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
