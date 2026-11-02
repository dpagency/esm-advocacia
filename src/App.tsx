import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import PracticeAreas from "@/pages/PracticeAreas";
import Schedule from "@/pages/Schedule";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import Resources from "@/pages/Resources";
import Contact from "@/pages/Contact";
import ImobiliarioAtrasoEntrega from "@/pages/articles/ImobiliarioAtrasoEntrega";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isHome = location.pathname === "/";
  const isServices = location.pathname === "/practice-areas";

  return (
    <div className={`flex flex-col min-h-screen antialiased text-[#091f1a] bg-[#ffffff]${isServices ? " esm-services-layout" : ""}`}>
      {!isDashboard && <Navbar />}
      <main className={isDashboard || isHome ? "flex-grow" : isServices ? "flex-grow pt-20 md:pt-16" : "flex-grow pt-24 md:pt-28"}>{children}</main>
      {!isDashboard && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice-areas" element={<PracticeAreas />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/imobiliario-atraso-entrega-imovel" element={<ImobiliarioAtrasoEntrega />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}
