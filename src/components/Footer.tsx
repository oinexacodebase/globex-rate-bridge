
const Footer = () => {
  return (
    <footer className="bg-primary mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-4">
            <a href="#" className="text-white hover:text-gray-200">Privacy Policy</a>
            <a href="#" className="text-white hover:text-gray-200">Terms of Service</a>
            <a href="#" className="text-white hover:text-gray-200">Contact</a>
          </div>
          <div className="text-white">
            © {new Date().getFullYear()} CurrencyConverter. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
