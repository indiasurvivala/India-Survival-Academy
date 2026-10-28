import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, ChevronRight, Mail, Phone } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { mainNavLinks } from '../../data/navigation';
import { siteConfig } from '../../data/siteConfig';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isScrolled } = useScrollPosition();
  const location = useLocation();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-forest-950 border-b border-olive-800/80 py-2.5 sm:py-3 shadow-lg shadow-black/50'
          : 'bg-forest-950 border-b border-olive-800/50 py-3 sm:py-4 shadow-md shadow-black/30'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Academy Logo */}
          <Link
            to="/"
            className="group flex items-center shrink-0 focus-visible:ring-2 focus-visible:ring-gold-500 rounded drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mr-3 2xl:mr-6"
            aria-label="India Survival Academy Home"
          >
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5" aria-label="Main Navigation">
            {mainNavLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-2.5 2xl:px-3 py-1.5 text-xs 2xl:text-sm font-semibold tracking-wide rounded-md transition-all duration-200 uppercase whitespace-nowrap ${
                    isActive
                      ? 'text-gold-400 font-bold bg-forest-900 border border-gold-500/30'
                      : 'text-earth-200 hover:text-gold-400 hover:bg-forest-900/60'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              to="/enroll"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              icon={<Compass className="w-4 h-4" />}
            >
              Enroll Now
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-md text-earth-100 hover:text-gold-400 hover:bg-white/5 border border-olive-700/50 transition-colors focus:ring-2 focus:ring-gold-500"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-forest-950 z-50 flex flex-col justify-between overflow-y-auto animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between p-4 border-b border-olive-800/60 bg-forest-950">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
            >
              <Logo size="sm" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-earth-200 hover:text-gold-300 bg-forest-900 border border-olive-700/60 transition-colors"
              aria-label="Close Navigation Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-1 flex-1 overflow-y-auto">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500 mb-3 px-3">
              Academy Directory
            </div>

            {mainNavLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-xl transition-all ${
                    isActive
                      ? 'bg-gold-500/15 text-gold-300 border border-gold-500/30'
                      : 'text-earth-200 hover:text-white hover:bg-forest-900/60'
                  }`
                }
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-earth-400" />
              </NavLink>
            ))}
          </div>

          <div className="p-4 sm:p-6 border-t border-olive-800/60 bg-forest-950 space-y-3 shrink-0">
            <Button
              to="/enroll"
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
              icon={<Compass className="w-5 h-5" />}
            >
              Enroll in a Challenge
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={`mailto:${siteConfig.officialEmail}`}
                className="flex items-center justify-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 transition-colors py-1.5 font-medium border border-olive-800/80 rounded-lg bg-forest-900/60"
                aria-label={`Email India Survival Academy at ${siteConfig.officialEmail}`}
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{siteConfig.officialEmail}</span>
              </a>
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="flex items-center justify-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 transition-colors py-1.5 font-medium border border-olive-800/80 rounded-lg bg-forest-900/60"
                aria-label={`Call India Survival Academy at ${siteConfig.officialPhone}`}
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>{siteConfig.officialPhone}</span>
              </a>
            </div>

            <p className="text-[11px] text-center text-earth-400">
              Suggested Venues in Rajasthan • Official Batches Announcing Soon
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
