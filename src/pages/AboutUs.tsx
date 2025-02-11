
import BackButton from "@/components/BackButton";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <BackButton />
          <h1 className="text-3xl font-bold text-gray-900 mb-8">About Us</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Welcome to Globex Currency Converter, your trusted partner in global currency exchange. 
              We provide real-time currency conversion services to help individuals and businesses 
              make informed decisions about their international transactions.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  To provide accurate, real-time currency conversion tools that empower users 
                  to make confident financial decisions in the global marketplace.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Our Values</h2>
                <p className="text-gray-600">
                  Accuracy, transparency, and reliability are at the core of our service. 
                  We believe in providing up-to-the-minute exchange rates you can trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
