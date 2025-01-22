import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ArrowRight, RefreshCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const RealTimeConversion = () => {
  const { data: rates, isLoading } = useQuery({
    queryKey: ["latest-rates"],
    queryFn: async () => {
      // Simulated API response
      return {
        EUR: 0.92,
        GBP: 0.79,
        JPY: 150.45,
        AUD: 1.53,
      };
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Real-Time Currency Conversion</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get instant access to live exchange rates with our powerful real-time conversion engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center">
                <RefreshCcw className="animate-spin h-8 w-8 text-primary mx-auto" />
              </div>
            ) : (
              Object.entries(rates || {}).map(([currency, rate]) => (
                <Card key={currency} className="transition-transform hover:scale-105">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">USD to {currency}</CardTitle>
                    <DollarSign className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">1.00</span>
                      <ArrowRight className="h-4 w-4 text-gray-500" />
                      <span className="text-2xl font-bold">{rate.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Features</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <DollarSign className="h-6 w-6 text-primary mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">Live Exchange Rates</h3>
                  <p className="text-gray-600">Continuously updated rates from reliable sources</p>
                </div>
              </li>
              <li className="flex items-start">
                <RefreshCcw className="h-6 w-6 text-primary mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">Automatic Updates</h3>
                  <p className="text-gray-600">Rates refresh automatically every minute</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RealTimeConversion;