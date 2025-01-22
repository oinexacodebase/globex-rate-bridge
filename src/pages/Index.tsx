import CurrencyConverter from "@/components/CurrencyConverter";
import Navigation from "@/components/Navigation";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <CurrencyConverter />
        <Features />
      </div>
      <Footer />
    </div>
  );
};

export default Index;