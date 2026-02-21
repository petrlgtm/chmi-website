import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingGive from "./components/FloatingGive";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import PrayerRequestModal from "./components/PrayerRequestModal";
import EventPromoPopup from "./components/EventPromoPopup";
import NearbyBranchPrompt from "./components/NearbyBranchPrompt";
import Home from "./pages/Home";
import Branches from "./pages/Branches";
import BranchDetail from "./pages/BranchDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Sermons from "./pages/Sermons";
import Give from "./pages/Give";
import ServiceDetail from "./pages/ServiceDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Resources from "./pages/Resources";
import ScrollToTop from "./components/ScrollToTop";
import { SiteImagesProvider } from "./context/SiteImagesContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/chmi-website">
      <SiteImagesProvider>
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/branches/:id" element={<BranchDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/give" element={<Give />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <FloatingGive />
      <BackToTop />
      <PrayerRequestModal />
      <NearbyBranchPrompt onDismiss={() => {}} />
      <EventPromoPopup />
      </SiteImagesProvider>
    </BrowserRouter>
  );
}

export default App;
