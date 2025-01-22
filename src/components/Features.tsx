import { DollarSign, BarChart2, Globe2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-12">Why Choose Our Currency Converter</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Real-time Conversion */}
          <Link to="/real-time-conversion" className="block">
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="Real-time conversion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center mb-4">
                <DollarSign className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold">Real-time Conversion</h3>
              </div>
              <p className="text-gray-600">
                Get instant currency conversions with up-to-date exchange rates from reliable sources.
              </p>
            </div>
          </Link>

          {/* Market Analysis */}
          <Link to="/market-analysis" className="block">
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                  alt="Market analysis"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center mb-4">
                <BarChart2 className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold">Market Analysis</h3>
              </div>
              <p className="text-gray-600">
                Track historical exchange rates with interactive charts and detailed market insights.
              </p>
            </div>
          </Link>

          {/* Global Coverage */}
          <Link to="/global-coverage" className="block">
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
                  alt="Global coverage"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center mb-4">
                <Globe2 className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold">Global Coverage</h3>
              </div>
              <p className="text-gray-600">
                Support for 20+ major currencies worldwide, enabling international transactions with ease.
              </p>
            </div>
          </Link>

          {/* Fast Performance */}
          <Link to="/fast-performance" className="block">
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                  alt="Fast performance"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold">Fast Performance</h3>
              </div>
              <p className="text-gray-600">
                Lightning-fast calculations and seamless user experience for efficient currency conversion.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;