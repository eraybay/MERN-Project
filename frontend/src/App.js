import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./ScreenTypes/LandingPage/LandingPage";
import MyEventsAdmin from "./ScreenTypes/MyEventsAdmin/MyEventsAdmin";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<MyEventsAdmin />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
