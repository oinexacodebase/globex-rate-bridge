import { DollarSign } from 'lucide-react';
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
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;