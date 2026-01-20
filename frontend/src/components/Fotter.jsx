import { Link } from 'react-router-dom';
import { Upload, Github, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-12 sm:mt-16 lg:mt-20">
      <div className="container py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
                <Upload className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AirForShare
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
              Share files and text instantly across devices. Fast, secure, and beautiful.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/files" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Share Files
                </Link>
              </li>
              <li>
                <Link to="/text" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Share Text
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Connect</h3>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AirForShare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
