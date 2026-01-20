import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Code } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
            <Code className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <span className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            OpenCodeShare
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link
            to="/"
            className={`text-xs lg:text-sm font-medium transition-colors hover:text-primary ${
              isActive('/') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link
            to="/how-it-works"
            className={`text-xs lg:text-sm font-medium transition-colors hover:text-primary ${
              isActive('/how-it-works') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            How It Works
          </Link>
          <Link
            to="/files"
            className={`text-xs lg:text-sm font-medium transition-colors hover:text-primary ${
              isActive('/files') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            Files
          </Link>
          <Link
            to="/text"
            className={`text-xs lg:text-sm font-medium transition-colors hover:text-primary ${
              isActive('/text') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            Text
          </Link>
          <Button asChild size="sm" className="text-xs lg:text-sm">
            <Link to="/files">Share Now</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container flex flex-col space-y-3 py-4 px-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/how-it-works') ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              How It Works
            </Link>
            <Link
              to="/files"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/files') ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              Files
            </Link>
            <Link
              to="/text"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/text') ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              Text
            </Link>
            <Button asChild className="w-full" size="sm">
              <Link to="/files" onClick={() => setMobileMenuOpen(false)}>
                Share Now
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
