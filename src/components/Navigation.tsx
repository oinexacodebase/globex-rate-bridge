import { DollarSign, User, Mail, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <DollarSign className="h-8 w-8 text-white" />
              <span className="ml-2 text-white text-xl font-bold">CurrencyConverter</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-gray-200 flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>About Us</span>
            </Link>
            <Link to="/" className="text-white hover:text-gray-200 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            <Link to="/" className="text-white hover:text-gray-200 flex items-center gap-2">
              <Flag className="h-4 w-4" />
              <span>Report</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;