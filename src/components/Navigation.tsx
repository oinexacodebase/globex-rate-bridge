
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'About Us', path: '/about-us' },
    { text: 'Contact', path: '/contact' },
    { text: 'Report', path: '/report' },
  ];

  return (
    <nav className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/globex-logo.ico" 
                alt="Globex Logo" 
                className="h-8 w-8"
              />
              <span className="ml-2 text-white text-xl font-bold">Globex</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className="text-white hover:text-gray-200"
              >
                {item.text}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="text-white p-2 rounded-md hover:bg-primary-light focus:outline-none"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-primary w-[250px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex flex-col space-y-4 p-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.text}
                        to={item.path}
                        className="text-white hover:text-gray-200 p-2 rounded-md hover:bg-primary-light"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.text}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
