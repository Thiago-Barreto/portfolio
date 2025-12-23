import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/page";
import About from "./pages/about/page";

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/início" element={<Navigate to="/" replace />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/starting" element={<Navigate to="/" replace />} />
        <Route path="/start" element={<Navigate to="/" replace />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/about" element={<Navigate to="/sobre" replace />} />
        <Route path="/info" element={<Navigate to="/sobre" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
