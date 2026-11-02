import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandLogo } from "@/assets/brand";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isServices = location.pathname === "/practice-areas";
  const solidHeader = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Áreas de Atuação", path: "/practice-areas" },
    { name: "Sobre", path: "/about" },
    { name: "Conteúdos", path: "/resources" },
    { name: "Contato", path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isServices && "services-navbar",
        solidHeader
          ? "bg-[#ffffff]/95 backdrop-blur-md border-b border-[#091f1a]/20 py-3 shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={brandLogo} alt="Logo ESM Advocacia Especializada" className={cn("h-10 w-10 rounded-md object-cover logo-transparent-border", solidHeader ? "border border-[#091f1a]/20" : "border border-[#ffffff]/30")} />
            <span className={cn("navbar-brand text-xl font-bold tracking-tight font-brand", solidHeader ? "text-[#091f1a]" : "text-[#ffffff]")}>
              ESM Advocacia Especializada
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="navbar-links hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={location.pathname === link.path ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#f5af00]",
                  location.pathname === link.path
                    ? "text-[#f5af00]"
                    : solidHeader
                      ? "text-[#091f1a]/75"
                      : "text-[#ffffff]"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className={cn(solidHeader ? "text-[#091f1a]" : "text-[#ffffff] hover:text-[#f5af00]")}>
                Portal do Cliente
              </Button>
            </Link>
            <Link to="/contact" className={cn("inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-[#f5af00] hover:bg-[#d99a00] text-[#091f1a]", isServices && "services-header-contact")}>Entrar em contato</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn("navbar-menu-toggle md:hidden p-2", solidHeader ? "text-[#091f1a]" : "text-[#ffffff]")}
            aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={isOpen}
            aria-controls="main-mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="main-mobile-menu" className="navbar-mobile-menu md:hidden absolute top-full left-0 right-0 bg-[#ffffff] border-b border-[#091f1a]/20 shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-base font-medium py-2 border-b border-[#091f1a]/10 last:border-0",
                location.pathname === link.path
                  ? "text-[#f5af00]"
                  : "text-[#091f1a]/75"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-2">
            <Link to="/dashboard" className="w-full">
              <Button variant="outline" className="w-full justify-center">
                Portal do Cliente
              </Button>
            </Link>
            {!isServices && <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#f5af00] px-4 py-2 text-sm font-medium text-[#091f1a] hover:bg-[#d99a00]">Entrar em contato</Link>}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
